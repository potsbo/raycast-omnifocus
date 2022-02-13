import { exec } from "child_process";
import { promisify } from "util";
import { parseStringPromise } from "xml2js";
import camelCase from "camelcase";
import prettier from "prettier";
import fs from "fs";
import {
  TypeNode,
  Kind,
  NamedTypeNode,
  print,
  FieldDefinitionNode,
  lexicographicSortSchema,
  buildSchema,
  printSchema,
  NonNullTypeNode,
  ListTypeNode,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
} from "graphql";
import { join } from "path";
import { unwrapType } from "../query";
import { pruneSchema } from "@graphql-tools/utils";

interface Suite {
  $: {
    code: string;
    description: string;
    name: string;
  };
  command: unknown[];
  enumeration: unknown[];
  class?: ClassDefinition[];
  "record-type": unknown[];
  "value-type": unknown[];
  "class-extension": ClassExtensionDefinition[];
}

interface ClassDefinition {
  $: {
    code: string;
    description: string;
    name: string;
    inherits?: string;
  };
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}

interface ClassExtensionDefinition {
  $: {
    code: string;
    description: string;
    extends: string;
    inherits?: string;
  };
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}

type PropertyDefinition =
  | {
      $: {
        code: string;
        description: string;
        name: string;
        type: string;
      };
    }
  | {
      $: {
        code: string;
        description: string;
        name: string;
      };
      type: { $: { list?: "yes"; type: string } }[];
    };

type ElementDefinition = {
  $: {
    description: string;
    type: string;
  };
  cocoa: [{ $: { key: string } }];
};

type ContentDefinition = {
  $: {
    access: string;
    code: string;
    description: string;
    name: string;
    type: string;
  };
  cocoa: [{ $: unknown[] }];
};

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

const typeNameMap = (sdefName: string): string | null => {
  switch (sdefName) {
    case "text":
      return "String";
    case "boolean":
      return "Boolean";
    case "date":
      return "String";
    case "integer":
      return "Int";
  }
  return null;
};

const toNamedType = (name: string, suffix = ""): NamedTypeNode => {
  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: typeNameMap(name) ?? camelCase(name, { pascalCase: true }) + suffix,
    },
  };
};

const toListType = (type: NonNullTypeNode | NamedTypeNode): ListTypeNode => {
  return { kind: Kind.LIST_TYPE, type };
};

const toFieldDefinition = (name: string, type: TypeNode): FieldDefinitionNode => {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: camelCase(name),
    },
    type,
  };
};

const nonNull = (type: ListTypeNode | NamedTypeNode): NonNullTypeNode => {
  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  };
};

const getGraphQLType = (t: PropertyDefinition): TypeNode => {
  if ("type" in t) {
    const types = t.type.map((t) => t.$);
    if (types.length === 2 && types[1].type === "missing value") {
      return toNamedType(types[0].type);
    }

    if (types.length === 1) {
      const type = types[0];
      const converted = typeNameMap(type.type);
      if (converted !== null) {
        if (type.list === "yes") {
          return nonNull(toListType(nonNull(toNamedType(converted))));
        }
        return nonNull(toNamedType(converted));
      }
    }

    return toNamedType("TODO__" + types.map((t) => camelCase(t.type, { pascalCase: true })).join("_OR_"));
  }

  if ("type" in t.$) {
    const res = typeNameMap(t.$.type);
    if (res) {
      return nonNull(toNamedType(res));
    }
    return nonNull(toNamedType(t.$.name));
  }

  throw new Error("Type definition not found");
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

const collectFieldsDefinitions = (c: {
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}) => {
  const properties: FieldDefinitionNode[] = (c.property ?? []).map((t) => {
    return toFieldDefinition(t.$.name, getGraphQLType(t));
  });

  const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
    return toFieldDefinition(`${e.$.type}s`, nonNull(toNamedType(e.$.type, CONNECTION_TYPE_NAME)));
  });

  const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
    const type = nonNull(toNamedType(ctnt.$.type));
    return toFieldDefinition(ctnt.$.name, type);
  });
  // TODO: respond-to
  const fields = properties.concat(elements).concat(contents);
  return reduceFieldDefinition(fields);
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
      interfaces: interfaces.map((n) => toNamedType(n)),
      fields,
    };
  };

  const classDef = toObjectDef(className, ["Node"], fields);
  const edgeDef = toObjectDef(
    `${className}Edge`,
    ["Edge"],
    [
      toFieldDefinition("cursor", nonNull(toNamedType("String"))),
      toFieldDefinition("node", nonNull(toNamedType(className))),
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
            type: nonNull(toNamedType("String")),
          },
        ],
        type: toNamedType(className),
      },
      toFieldDefinition("edges", nonNull(toListType(nonNull(toNamedType(`${className}${EDGE_TYPE_NAME}`))))),
      toFieldDefinition("pageInfo", nonNull(toNamedType("PageInfo"))),
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
  const res = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(res.stdout)) as {
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
      if (cdef.inherits !== undefined) {
        const parent = allTypes.find((t) => t.name.value === camelCase(cdef.inherits!, { pascalCase: true }));
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
          interfaces: d.interfaces?.concat(toNamedType(parentInterface)),
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

  const reduced = definitions.filter((d) => isAllowedType(d.name.value));
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
