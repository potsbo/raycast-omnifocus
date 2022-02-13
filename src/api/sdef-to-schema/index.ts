import { exec } from "child_process";
import { promisify } from "util";
import { parseStringPromise } from "xml2js";
import camelCase from "camelcase";
import prettier from "prettier";
import fs from "fs";
import {
  TypeNode,
  Kind,
  print,
  FieldDefinitionNode,
  lexicographicSortSchema,
  buildSchema,
  printSchema,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
} from "graphql";
import { join } from "path";
import { pruneSchema } from "@graphql-tools/utils";
import { unwrapType } from "../graphql-utils";
import { ListType, NameType, NonNullType } from "./types";
import { ClassDefinition, Suite } from "./sdef";
import { collectFieldsDefinitions, FieldDefinition } from "./field";

const AllowedTypes = [
  "Task",
  "InboxTask",
  "FlattenedTask",
  "Project",
  "Section",
  "Folder",
  "Tag",
  // "Application",
  "Document",
  "PageInfo",
  "Int",
  "String",
  "Boolean",
];

const CONNECTION_TYPE_NAME = "Connection";
const EDGE_TYPE_NAME = "Edge";

const isAllowedType = (type: TypeNode | string): boolean => {
  const typeName = typeof type === "string" ? type : unwrapType(type).name.value;
  if (AllowedTypes.includes(typeName)) {
    return true;
  }

  if (typeName.endsWith(CONNECTION_TYPE_NAME)) {
    return isAllowedType(typeName.slice(0, -CONNECTION_TYPE_NAME.length));
  }
  if (typeName.endsWith(EDGE_TYPE_NAME)) {
    return isAllowedType(typeName.slice(0, -EDGE_TYPE_NAME.length));
  }

  return false;
};

type Extensions = Record<string, FieldDefinitionNode[]>;

const reduceFieldDefinition = (fs: readonly FieldDefinitionNode[]): FieldDefinitionNode[] => {
  return fs.reduce((acum: FieldDefinitionNode[], cur: FieldDefinitionNode) => {
    if (acum.some((a) => a.name.value === cur.name.value)) {
      return acum;
    }
    acum.push(cur);
    return acum;
  }, []);
};
const renderClass = (c: ClassDefinition) => {
  const className = camelCase(c.$.name, { pascalCase: true });
  const fields = collectFieldsDefinitions(c);

  const toObjectDef = (name: string, interfaces: string[], fields: FieldDefinitionNode[]): ObjectTypeDefinitionNode => {
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      name: {
        kind: Kind.NAME,
        value: name,
      },
      interfaces: interfaces.map((n) => NameType(n)),
      fields,
    };
  };

  const classDef = toObjectDef(className, ["Node"], fields);
  const edgeDef = toObjectDef(
    `${className}${EDGE_TYPE_NAME}`,
    [EDGE_TYPE_NAME],
    [
      FieldDefinition("cursor", NonNullType(NameType("String"))),
      FieldDefinition("node", NonNullType(NameType(className))),
    ]
  );
  const connectionDef = toObjectDef(
    `${className}${CONNECTION_TYPE_NAME}`,
    [CONNECTION_TYPE_NAME],
    [
      {
        kind: Kind.FIELD_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: "byId",
        },
        arguments: [
          {
            kind: Kind.INPUT_VALUE_DEFINITION,
            name: {
              kind: Kind.NAME,
              value: "id",
            },
            type: NonNullType(NameType("String")),
          },
        ],
        type: NameType(className),
      },
      FieldDefinition("edges", NonNullType(ListType(NonNullType(NameType(`${className}${EDGE_TYPE_NAME}`))))),
      FieldDefinition("pageInfo", NonNullType(NameType("PageInfo"))),
    ]
  );
  return { types: [connectionDef, edgeDef, classDef], inherits: c.$.inherits, className };
};

const renderSuite = (
  s: Suite
): {
  classDefinition: {
    types: ObjectTypeDefinitionNode[];
    inherits: string | undefined;
    className: string;
  }[];
  extensions: Extensions;
} => {
  const extensions = s["class-extension"]
    ?.map((ce) => {
      const ret: Extensions = {};
      ret[camelCase(ce.$.extends, { pascalCase: true })] = collectFieldsDefinitions(ce);
      return ret;
    })
    .reduce((acum, cur) => {
      return { ...acum, ...cur };
    });

  const typeDefs = (s.class ?? []).map(renderClass);
  return { classDefinition: typeDefs, extensions };
};

const interfaces = new Map<string, InterfaceTypeDefinitionNode>();

(async () => {
  const sdef = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(sdef.stdout)) as {
    dictionary: { suite: Suite[] };
  };

  const suites = parsed.dictionary.suite.map(renderSuite);
  const extensions = suites
    .map((s) => s.extensions)
    .reduce((acum, cur) => {
      return { ...acum, ...cur };
    }, {});

  const definitions: ObjectTypeDefinitionNode[] = [];
  const allTypes = suites
    .map(({ classDefinition }) => classDefinition.map(({ types }) => types))
    .reduce((acum, cur) => {
      return acum.concat(cur);
    }, [])
    .reduce((acum, cur) => {
      return acum.concat(cur);
    }, []);

  suites.forEach(({ classDefinition }) => {
    classDefinition.forEach((cdef) => {
      const { inherits } = cdef;
      if (inherits !== undefined) {
        const parent = allTypes.find((t) => t.name.value === camelCase(inherits, { pascalCase: true }));
        if (parent === undefined) {
          throw new Error("parent not found");
        }

        const parentInterface = `${parent.name.value}Interface`;

        interfaces.set(parent.name.value, {
          ...parent,
          kind: Kind.INTERFACE_TYPE_DEFINITION,
          fields: reduceFieldDefinition(parent.fields ?? []).filter((f) => isAllowedType(f.type)),
          name: {
            kind: Kind.NAME,
            value: parentInterface,
          },
          interfaces: [],
        });

        // TODO: not to depend on array order
        definitions.push(cdef.types[0]);
        definitions.push(cdef.types[1]);
        const d = cdef.types[2];

        const fields = [...(extensions[d.name.value] ?? []), ...(d.fields ?? []), ...(parent.fields ?? [])];
        definitions.push({
          ...d,
          fields: reduceFieldDefinition(fields).filter((f) => isAllowedType(f.type)),
          interfaces: d.interfaces?.concat(NameType(parentInterface)),
        });

        return;
      }
      definitions.push(
        ...cdef.types.map((d) => {
          const fields = extensions[d.name.value] ?? [];
          return {
            ...d,
            fields: d.fields?.concat(fields).filter((f) => isAllowedType(f.type)),
          };
        })
      );
    });
  });

  const reduced = definitions
    .map((d) => {
      if (interfaces.has(d.name.value)) {
        return { ...d, interfaces: [NameType(`${d.name.value}Interface`)].concat(d.interfaces ?? []) };
      }
      return d;
    })
    .filter((d) => isAllowedType(d.name.value));
  const schema = `
  # https://relay.dev/graphql/connections.htm#sec-Connection-Types
interface ${CONNECTION_TYPE_NAME} {
  edges: [Edge!]!
  pageInfo: PageInfo!

  # https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html
  byId(id: String!): Node
}

# https://relay.dev/graphql/connections.htm#sec-Edge-Types
interface Edge {
  node: Node!
  cursor: String!
}
# https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
  startCursor: String!
  endCursor: String!
}

interface Node {
  id: String!
}

type Query {
  defaultDocument: Document!
}
  
  directive @whose(condition: [Condition!]!) on FIELD

input Condition {
  enabled: Boolean! = true
  field: String
  operands: [Condition!]
  operator: String! = "="
  value: String! = "true"
}

  ${reduced.map(print)}
  ${[...interfaces.values()].map((i) => print(i))}
  `;
  const content = prettier.format(schema, { parser: "graphql" });
  const path = join(__dirname, "..", "..", "..", "assets", "schema.graphql");

  const oldSchema = buildSchema(content);
  const sorted = lexicographicSortSchema(pruneSchema(oldSchema));
  const sortedSchema = printSchema(sorted);

  const comment = `# Code generated by "sdef-to-schema"; DO NOT EDIT.\n`;

  fs.writeFile(path, comment + sortedSchema, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`✅ Schemad generated`);
  });
})();
