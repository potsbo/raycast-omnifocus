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
} from "graphql";
import { join } from "path";
import { unwrapType } from "../query";

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
  "class-extension": unknown[];
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
      type: { $: { type: string } }[];
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
  "Project",
  "Section",
  "Folder",
  "Tag",
  // "Application",
  // "Document",
  "Int",
  "String",
  "Boolean",
];

const CONNECTION_TYPE_NAME = "Connection";

const isAllowedType = (type: TypeNode | string): boolean => {
  const typeName = typeof type === "string" ? type : unwrapType(type).name.value;

  if (AllowedTypes.includes(typeName)) {
    return true;
  }

  if (typeName.endsWith(CONNECTION_TYPE_NAME)) {
    return isAllowedType(typeName.slice(0, -CONNECTION_TYPE_NAME.length));
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

const renderSuite = (s: Suite): ObjectTypeDefinitionNode[] => {
  const typeDefs = (s.class ?? []).map((c) => {
    const className = camelCase(c.$.name, { pascalCase: true });
    if (!AllowedTypes.includes(className)) {
      return [];
    }

    const taskProperties: FieldDefinitionNode[] = (c.property ?? []).map((t) => {
      return toFieldDefinition(t.$.name, getGraphQLType(t));
    });

    const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
      return toFieldDefinition(`${e.$.type}s`, nonNull(toNamedType(e.$.type, CONNECTION_TYPE_NAME)));
    });

    const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
      const type = nonNull(toNamedType(ctnt.$.type));
      return toFieldDefinition(ctnt.$.name, type);
    });

    const fields = taskProperties
      .concat(elements)
      .concat(contents)
      .filter((f) => isAllowedType(f.type))
      .reduce((acum: FieldDefinitionNode[], cur: FieldDefinitionNode) => {
        if (acum.some((a) => a.name.value === cur.name.value)) {
          return acum;
        }
        acum.push(cur);
        return acum;
      }, []);

    if (fields.length === 0) {
      return [];
    }

    const toObjectDef = (
      name: string,
      interfaces: string[],
      fields: FieldDefinitionNode[]
    ): ObjectTypeDefinitionNode => {
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
        toFieldDefinition("edges", nonNull(toListType(nonNull(toNamedType(`${className}Edge`))))),
        toFieldDefinition("pageInfo", nonNull(toNamedType("PageInfo"))),
      ]
    );
    return [connectionDef, edgeDef, classDef];
  });
  return typeDefs.reduce((acum, cur) => acum.concat(cur), []);
};

(async () => {
  const res = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(res.stdout)) as {
    dictionary: { suite: Suite[] };
  };
  const definitions = parsed.dictionary.suite.map(renderSuite).reduce((acum, cur) => acum.concat(cur), []);

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
    defaultDocument: DefaultDocument!
  }

  type DefaultDocument {
    flattenedTasks: TaskConnection!
    folders: FolderConnection!
    inboxTasks: TaskConnection!
    perspectiveNames: [String!]!
    projects: ProjectConnection!
    tags: TagConnection!
  }
  
  directive @whose(condition: [Condition!]!) on FIELD

input Condition {
  enabled: Boolean! = true
  field: String
  operands: [Condition!]
  operator: String! = "="
  value: String! = "true"
}

  ${definitions.map(print)}
  `;
  const content = prettier.format(schema, { parser: "graphql" });
  const path = join(__dirname, "..", "..", "..", "assets", "schema.graphql");

  const oldSchema = buildSchema(content);
  const sorted = lexicographicSortSchema(oldSchema);
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
