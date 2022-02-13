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
} from "graphql";
import { join } from "path";

interface Suite {
  $: {
    code: string;
    description: string;
    name: string;
  };
  command: unknown[];
  enumeration: unknown[];
  class: ClassDefinition[];
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
  "Application",
  "Document",
  "Int",
  "String",
  "Boolean",
];

const unwrapType = (typeNode: TypeNode): NamedTypeNode => {
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return typeNode;
  }
  return unwrapType(typeNode.type);
};

const isAllowedType = (typeNode: TypeNode) => {
  const type = unwrapType(typeNode).name.value;

  if (AllowedTypes.includes(type)) {
    return true;
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

const getGraphQLType = (t: PropertyDefinition): TypeNode => {
  if ("type" in t) {
    const types = t.type.map((t) => t.$);
    if (types.length === 2 && types[1].type === "missing value") {
      return {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: typeNameMap(types[0].type) ?? camelCase(types[0].type, { pascalCase: true }),
        },
      };
    }

    return {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: "TODO__" + types.map((t) => camelCase(t.type, { pascalCase: true })).join("_OR_"),
      },
    };
  }

  if ("type" in t.$) {
    const res = typeNameMap(t.$.type);
    if (res) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: res,
          },
        },
      };
    }
    return {
      kind: Kind.NON_NULL_TYPE,
      type: {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: camelCase(t.$.name, { pascalCase: true }),
        },
      },
    };
  }

  throw new Error("Type definition not found");
};

(async () => {
  const res = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(res.stdout)) as {
    dictionary: { suite: Suite[] };
  };
  const s = parsed.dictionary.suite.find((s) => s.$.name === "OmniFocus suite");
  if (s === undefined) {
    throw new Error("target suite not found");
  }

  const typeDefs = s.class.map((c) => {
    const className = camelCase(c.$.name, { pascalCase: true });
    if (!AllowedTypes.includes(className)) {
      return "";
    }

    const taskProperties: (FieldDefinitionNode | null)[] = (c.property ?? []).map((t) => {
      const typeName = getGraphQLType(t);
      if (!isAllowedType(typeName)) {
        return null;
      }
      return {
        kind: Kind.FIELD_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: camelCase(t.$.name),
        },
        type: typeName,
      };
    });

    const elements: (FieldDefinitionNode | null)[] = (c.element ?? []).map((e): FieldDefinitionNode | null => {
      camelCase(e.$.type, { pascalCase: true });

      const elm: TypeNode = {
        kind: Kind.NON_NULL_TYPE,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: camelCase(e.$.type, { pascalCase: true }),
          },
        },
      };
      const type: TypeNode = {
        kind: Kind.NON_NULL_TYPE,
        type: {
          kind: Kind.LIST_TYPE,
          type: elm,
        },
      };
      if (!isAllowedType(type)) {
        return null;
      }
      return {
        kind: Kind.FIELD_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: `${camelCase(e.$.type)}s`,
        },
        type: {
          kind: Kind.NON_NULL_TYPE,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: `${camelCase(e.$.type, { pascalCase: true })}Connection`,
            },
          },
        },
      };
    });

    const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode | null => {
      const typeName: TypeNode = {
        kind: Kind.NON_NULL_TYPE,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: camelCase(ctnt.$.type, { pascalCase: true }),
          },
        },
      };

      if (!isAllowedType(typeName)) {
        return null;
      }
      return {
        kind: Kind.FIELD_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: camelCase(ctnt.$.name),
        },
        type: typeName,
      };
    });

    const fields = taskProperties
      .concat(elements)
      .concat(contents)
      .filter((f): f is FieldDefinitionNode => f !== null)
      .reduce((acum: FieldDefinitionNode[], cur: FieldDefinitionNode) => {
        if (acum.some((a) => a.name.value === cur.name.value)) {
          return acum;
        }
        acum.push(cur);
        return acum;
      }, []);

    if (fields.length === 0) {
      return "";
    }

    return `
    type ${className}Connection implements Connection {
        byId(id: String!): ${className}
        edges: [${className}Edge!]!
        pageInfo: PageInfo!
      }
      
      type ${className}Edge implements Edge {
        cursor: String!
        node: ${className}!
      }

      type ${className} implements Node {
          ${fields.map((f) => print(f))}
      }
      `;
  });

  const schema = `
  # https://relay.dev/graphql/connections.htm#sec-Connection-Types
interface Connection {
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

  ${typeDefs.sort().join("\n")}
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
  });
})();
