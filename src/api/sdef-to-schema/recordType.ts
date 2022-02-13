import { Kind, ObjectTypeDefinitionNode } from "graphql";
import camelCase from "camelCase";
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
    };
  };
}
