import { Kind, ObjectTypeDefinitionNode } from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions } from "./field";
import { Environment, RecordTypeDefinition } from "./sdef";

export class RecordTypeRenderer {
  private e: RecordTypeDefinition;
  constructor(e: RecordTypeDefinition) {
    this.e = e;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build = (_: Environment): ObjectTypeDefinitionNode[] => {
    const fields = collectFieldsDefinitions(this.e);
    return [
      {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: camelCase(this.e.$.name, { pascalCase: true }),
        },
        fields,
        directives: [
          {
            kind: Kind.DIRECTIVE,
            name: {
              kind: Kind.NAME,
              value: "recordType",
            },
          },
        ],
      },
    ];
  };
}
