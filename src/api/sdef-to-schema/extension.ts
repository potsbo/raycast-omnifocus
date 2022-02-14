import { Kind, ObjectTypeExtensionNode } from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions } from "./field";
import { ClassExtensionDefinition } from "./sdef";

export class ExtensionRenderer {
  private e: ClassExtensionDefinition;
  constructor(e: ClassExtensionDefinition) {
    this.e = e;
  }

  getType = (): ObjectTypeExtensionNode => {
    const fields = collectFieldsDefinitions(this.e);
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name: {
        kind: Kind.NAME,
        value: camelCase(this.e.$.extends, { pascalCase: true }),
      },
      fields,
    };
  };
}
