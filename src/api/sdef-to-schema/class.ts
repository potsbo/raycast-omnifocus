import {
  DefinitionNode,
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions, field } from "./field";
import { ClassDefinition, Environment } from "./sdef";
import { named as named, nonNull, list } from "./types";
import { EDGE_TYPE_NAME, CONNECTION_TYPE_NAME, NodeInterface } from "./constants";

import { collectMutationArgs } from "./mutation";
import { name } from "./name";
import { stringValue } from "./string";

export class ClassRenderer {
  private c: ClassDefinition;
  fields: FieldDefinitionNode[];
  constructor(c: ClassDefinition) {
    this.c = c;
    this.fields = collectFieldsDefinitions(this.c);
  }
  private getBaseTypeName = () => camelCase(this.c.$.name, { pascalCase: true });
  private getClassName = () => this.c.$.name;
  private getInherits = () => this.c.$.inherits;
  private getInterfaceName = () => `${this.getBaseTypeName()}Interface`;
  private getInterfaced = (): InterfaceTypeDefinitionNode => {
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      fields: this.fields,
      name: name(this.getInterfaceName(), { pascalCase: true }),
      interfaces: [named(NodeInterface.name.value)],
    };
  };
  private getMutationExtension = (
    verb: string,
    inherits: ClassRenderer | undefined
  ): ObjectTypeExtensionNode | null => {
    const mutableFields = collectMutationArgs(this.c).concat(inherits ? collectMutationArgs(inherits.c) : []);
    if (mutableFields.length === 0) {
      return null;
    }

    const typeName = camelCase(this.c.$.name, { pascalCase: true });
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name: name("Mutation", { pascalCase: true }),
      fields: [
        {
          ...field(`${verb}${typeName}`, nonNull(typeName)),
          arguments: mutableFields,
        },
      ],
    };
  };
  build = ({ override, classRenderers }: Environment) => {
    const typeName = camelCase(this.c.$.name, { pascalCase: true });

    // TODO: if compatible override given, try to merge
    if (override?.definitions.some((d) => "name" in d && d.name?.value === typeName)) {
      return [];
    }
    const inherits = this.getInherits();
    const parent = classRenderers.find((t) => t.getClassName() === inherits);
    if (inherits !== undefined && parent === undefined) {
      throw new Error("parent not found");
    }
    const inherited = classRenderers.map((c) => c.getInherits()).some((c): c is string => c === this.getClassName());

    const toObjectDef = (
      typeName: string,
      interfaces: string[],
      fields: FieldDefinitionNode[],
      description?: string
    ): ObjectTypeDefinitionNode => {
      return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        name: name(typeName, { pascalCase: true }),
        interfaces: interfaces.map((n) => named(n)),
        fields,
        description: stringValue(description),
      };
    };

    const fields = [...(this.fields ?? []), ...(parent?.fields ?? [])];

    const interfaces: string[] = [NodeInterface.name.value];
    if (parent) {
      interfaces.push(parent.getInterfaceName());
    }
    if (inherited) {
      interfaces.push(this.getInterfaceName());
    }

    const classDef = toObjectDef(typeName, interfaces, fields, this.c.$.description);
    const edgeDef = toObjectDef(
      `${typeName}${EDGE_TYPE_NAME}`,
      [EDGE_TYPE_NAME],
      [field("cursor", nonNull("String")), field("node", nonNull(inherited ? this.getInterfaceName() : typeName))]
    );
    const connectionDef = toObjectDef(
      `${typeName}${CONNECTION_TYPE_NAME}`,
      [CONNECTION_TYPE_NAME],
      [
        {
          kind: Kind.FIELD_DEFINITION,
          name: name("byId"),
          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: name("id"),
              type: nonNull("String"),
            },
          ],
          type: named(inherited ? this.getInterfaceName() : typeName),
        },
        field("edges", nonNull(list(nonNull(`${typeName}${EDGE_TYPE_NAME}`)))),
        field("pageInfo", nonNull("PageInfo")),
      ]
    );
    const def: DefinitionNode[] = [connectionDef, edgeDef, classDef, this.getInterfaced()];

    const m = this.getMutationExtension("push", parent);
    if (m !== null) {
      def.push(m);
    }
    return def;
  };
}
