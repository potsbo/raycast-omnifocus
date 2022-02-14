import { EnumTypeDefinitionNode, EnumValueDefinitionNode, Kind, StringValueNode } from "graphql";
import camelCase from "camelCase";
import { EnumDefinition } from "./sdef";

export class EnumRenderer {
  private e: EnumDefinition;
  constructor(e: EnumDefinition) {
    this.e = e;
  }

  getType = (): EnumTypeDefinitionNode => {
    const values: EnumValueDefinitionNode[] = this.e.enumerator.map((e) => {
      const desc: StringValueNode | undefined = e.$.description
        ? {
            kind: Kind.STRING,
            value: e.$.description,
            block: true,
          }
        : undefined;
      return {
        kind: Kind.ENUM_VALUE_DEFINITION,
        description: desc,
        name: {
          kind: Kind.NAME,
          value: e.$.name.replaceAll(" ", "_").toUpperCase(),
        },
      };
    });
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      name: {
        kind: Kind.NAME,
        value: camelCase(this.e.$.name, { pascalCase: true }),
      },
      values,
    };
  };
}
