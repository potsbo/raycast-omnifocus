import { Kind, ObjectTypeDefinitionNode } from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions } from "./field";
import { RecordTypeDefinition } from "./sdef";

export class RecordTypeRenderer {
  private e: RecordTypeDefinition;
  constructor(e: RecordTypeDefinition) {
    this.e = e;
  }

  getType = (): ObjectTypeDefinitionNode => {
    const fields = collectFieldsDefinitions(this.e);
    return {
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
    };
  };
}
