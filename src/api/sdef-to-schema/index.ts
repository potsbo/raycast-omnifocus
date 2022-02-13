import { exec } from "child_process";
import { promisify } from "util";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import {
  TypeNode,
  print,
  FieldDefinitionNode,
  lexicographicSortSchema,
  buildSchema,
  printSchema,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from "graphql";
import { join } from "path";
import { pruneSchema } from "@graphql-tools/utils";
import { unwrapType } from "../graphql-utils";
import { Suite } from "./sdef";
import { CONNECTION_TYPE_NAME, EDGE_TYPE_NAME, INTERFACE_SUFFIX } from "./constants";
import { ClassRenderer } from "./class";
import { ExtensionRenderer } from "./extension";
import { RecordTypeRenderer } from "./recordType";

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
  "Float",
  "RepetitionInterval",
  "LocationInformation",
];

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
  if (typeName.endsWith(INTERFACE_SUFFIX)) {
    return isAllowedType(typeName.slice(0, -INTERFACE_SUFFIX.length));
  }

  return false
};

const reduceFieldDefinition = <T extends { fields?: readonly FieldDefinitionNode[] }>(obj: T): T => {
  const fields = obj.fields
    ?.reduce((acum: FieldDefinitionNode[], cur: FieldDefinitionNode) => {
      if (acum.some((a) => a.name.value === cur.name.value)) {
        return acum;
      }
      acum.push(cur);
      return acum;
    }, [])
    .filter((f) => isAllowedType(f.type));
  return {
    ...obj,
    fields,
  };
};

const renderSuite = (
  s: Suite
): {
  classRenderers: ClassRenderer[];
  extensionRenderers: ExtensionRenderer[];
  recordTypeRenderers: RecordTypeRenderer[];
} => {
  const extensionRenderers = (s["class-extension"] ?? []).map((c) => new ExtensionRenderer(c));
  const classRenderers = (s.class ?? []).map((c) => new ClassRenderer(c));
  const recordTypeRenderers = (s["record-type"] ?? []).map((c) => new RecordTypeRenderer(c));
  return { classRenderers, extensionRenderers, recordTypeRenderers };
};

const interfaces: InterfaceTypeDefinitionNode[] = [];

(async () => {
  const sdef = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(sdef.stdout)) as {
    dictionary: { suite: Suite[] };
  };

  const { extensionRenderers, classRenderers, recordTypeRenderers } = parsed.dictionary.suite.map(renderSuite).reduce(
    (
      acum: {
        classRenderers: ClassRenderer[];
        extensionRenderers: ExtensionRenderer[];
        recordTypeRenderers: RecordTypeRenderer[];
      },
      cur
    ) => {
      return {
        classRenderers: acum.classRenderers.concat(cur.classRenderers),
        extensionRenderers: acum.extensionRenderers.concat(cur.extensionRenderers),
        recordTypeRenderers: acum.recordTypeRenderers.concat(cur.recordTypeRenderers),
      };
    },
    { classRenderers: [], extensionRenderers: [], recordTypeRenderers: [] }
  );

  const inheritedClasses = new Set(
    classRenderers.map((c) => c.getInherits()).filter((c): c is string => typeof c === "string")
  );

  const definitions: ObjectTypeDefinitionNode[] = [];
  classRenderers.forEach((cdef) => {
    const inherits = cdef.getInherits();
    const parent = classRenderers.find((t) => t.getClassName() === inherits);
    if (inherits !== undefined && parent === undefined) {
      throw new Error("parent not found");
    }
    interfaces.push(cdef.getInterfaced());
    definitions.push(
      ...cdef.getTypes({
        inherits: parent,
        inherited: inheritedClasses.has(cdef.getClassName()),
      })
    );
  });

  const extensions = extensionRenderers.map((e) => e.getType());
  const recordTypes = recordTypeRenderers.map((e) => e.getType());

  const render = (ns: (ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InterfaceTypeDefinitionNode)[]) => {
    return ns
      .map(reduceFieldDefinition)
      .filter((n) => isAllowedType(n.name.value))
      .map(print)
      .join("\n");
  };

  const schema = `
  ${render(definitions)}
  ${render(extensions)}
  ${render(interfaces)}
  ${render(recordTypes)}

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
  `;

  const path = join(__dirname, "..", "..", "..", "assets", "schema.graphql");

  const sorted = lexicographicSortSchema(pruneSchema(buildSchema(schema)));
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
