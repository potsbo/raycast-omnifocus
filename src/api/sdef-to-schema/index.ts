import { exec } from "child_process";
import { promisify } from "util";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import {
  print,
  FieldDefinitionNode,
  lexicographicSortSchema,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  printSchema,
  buildASTSchema,
} from "graphql";
import { join } from "path";
import { pruneSchema } from "@graphql-tools/utils";
import { unwrapType } from "../graphql-utils";
import { Suite } from "./sdef";
import { ConnectionInterface, EdgeInterface, NodeInterface } from "./constants";
import { ClassRenderer } from "./class";
import { ExtensionRenderer } from "./extension";
import { RecordTypeRenderer } from "./recordType";
import { EnumRenderer } from "./enumeration";
import prettier from "prettier";
import gql from "graphql-tag";
import { prune } from "./prune";

const reduceArgs = (def: FieldDefinitionNode): FieldDefinitionNode => {
  return {
    ...def,
    arguments: def.arguments?.filter((a) => {
      // TODO: not to hard code
      if (a.name.value === "id" && def.name.value !== "byId") {
        return false;
      }
      if (
        ["completedByChildren", "creationDate", "flagged", "sequential", "shouldUseFloatingTimeZone"].includes(
          a.name.value
        )
      ) {
        return false;
      }
      const denyList = ["RichText"];
      const typename = unwrapType(a.type).name.value;
      if (denyList.includes(typename)) {
        return false;
      }
      return true;
    }),
  };
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
    .map(reduceArgs);
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
  enumRenderers: EnumRenderer[];
} => {
  const extensionRenderers = (s["class-extension"] ?? []).map((c) => new ExtensionRenderer(c));
  const classRenderers = (s.class ?? []).map((c) => new ClassRenderer(c));
  const recordTypeRenderers = (s["record-type"] ?? []).map((c) => new RecordTypeRenderer(c));
  const enumRenderers = (s.enumeration ?? []).map((e) => new EnumRenderer(e));
  return { classRenderers, extensionRenderers, recordTypeRenderers, enumRenderers };
};

const interfaces: InterfaceTypeDefinitionNode[] = [ConnectionInterface, EdgeInterface, NodeInterface];

(async () => {
  const sdef = await promisify(exec)("sdef /Applications/OmniFocus.app");
  const parsed = (await parseStringPromise(sdef.stdout)) as {
    dictionary: { suite: Suite[] };
  };

  const { extensionRenderers, classRenderers, recordTypeRenderers, enumRenderers } = parsed.dictionary.suite
    .map(renderSuite)
    .reduce(
      (
        acum: {
          classRenderers: ClassRenderer[];
          extensionRenderers: ExtensionRenderer[];
          recordTypeRenderers: RecordTypeRenderer[];
          enumRenderers: EnumRenderer[];
        },
        cur
      ) => {
        return {
          classRenderers: acum.classRenderers.concat(cur.classRenderers),
          extensionRenderers: acum.extensionRenderers.concat(cur.extensionRenderers),
          recordTypeRenderers: acum.recordTypeRenderers.concat(cur.recordTypeRenderers),
          enumRenderers: acum.enumRenderers.concat(cur.enumRenderers),
        };
      },
      { classRenderers: [], extensionRenderers: [], recordTypeRenderers: [], enumRenderers: [] }
    );

  const extensions = extensionRenderers.map((e) => e.getType());
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
        extensions: extensionRenderers.filter((e) => e.extends === cdef.getClassName()),
      })
    );

    if (cdef.getClassName() === "inbox task") {
      const m = cdef.getMutationExtension("push", parent);
      if (m === null) {
        return;
      }
      extensions.push(m);
    }
  });

  const enums = enumRenderers.map((e) => e.getType());
  const recordTypes = recordTypeRenderers.map((e) => e.getType());

  const render = (ns: (ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InterfaceTypeDefinitionNode)[]) => {
    return ns
      .map((n) => reduceFieldDefinition(n))
      .map(print)
      .join("\n");
  };

  const schema = gql`
    type Mutation

    ${render(definitions)}
    ${render(extensions)}
    ${render(interfaces)}
    ${render(recordTypes)}
    ${enums.map(print)}

    # https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
    type PageInfo {
      hasPreviousPage: Boolean!
      hasNextPage: Boolean!
      startCursor: String!
      endCursor: String!
    }

    type Query {
      application: Application!
    }

    directive @whose(condition: [Condition!]!) on FIELD
    directive @recordType on OBJECT

    input Condition {
      enabled: Boolean! = true
      field: String
      operands: [Condition!]
      operator: String! = "="
      value: String! = "true"
    }
  `;

  const path = join(__dirname, "..", "..", "..", "assets", "schema.graphql");

  // const sorted = prune(schema)
  // const sortedSchema = print(sorted);

  // const sortedSchema = schema

  const sorted = lexicographicSortSchema(pruneSchema(buildASTSchema(prune(schema))));
  const sortedSchema = printSchema(sorted);
  const comment = `# Code generated by "sdef-to-schema"; DO NOT EDIT.\n`;

  fs.writeFile(path, prettier.format(comment + sortedSchema, { parser: "graphql" }), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`✅ Schemad generated`);
  });
})();
