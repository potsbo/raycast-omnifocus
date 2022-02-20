import {
  DocumentNode,
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
  StringValueNode,
} from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions, FieldDefinition } from "./field";
import { ClassDefinition } from "./sdef";
import { named as named, nonNull, list } from "./types";
import { EDGE_TYPE_NAME, CONNECTION_TYPE_NAME, NodeInterface } from "./constants";
import { ExtensionRenderer } from "./extension";
import { collectMutationArgs } from "./mutation";

export class ClassRenderer {
  private c: ClassDefinition;
  fields: FieldDefinitionNode[];
  constructor(c: ClassDefinition) {
    this.c = c;
    this.fields = collectFieldsDefinitions(this.c);
  }
  getBaseTypeName = () => camelCase(this.c.$.name, { pascalCase: true });
  getClassName = () => this.c.$.name;
  getInherits = () => this.c.$.inherits;
  getInterfaceName = () => `${this.getBaseTypeName()}Interface`;
  getInterfaced = (): InterfaceTypeDefinitionNode => {
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      fields: this.fields,
      name: {
        kind: Kind.NAME,
        value: this.getInterfaceName(),
      },
      interfaces: [named(NodeInterface.name.value)],
    };
  };
  getMutationExtension = (verb: string, inherits: ClassRenderer | undefined): ObjectTypeExtensionNode | null => {
    const mutableFields = collectMutationArgs(this.c).concat(inherits ? collectMutationArgs(inherits.c) : []);

    if (mutableFields.length === 0) {
      return null;
    }
    const typeName = camelCase(this.c.$.name, { pascalCase: true });
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name: {
        kind: Kind.NAME,
        value: "Mutation",
      },
      fields: [
        {
          ...FieldDefinition(`${verb}${typeName}`, nonNull(named(typeName))),
          arguments: mutableFields,
        },
      ],
    };
  };
  getTypes = ({
    inherits,
    inherited,
    override,
  }: {
    inherits: ClassRenderer | undefined;
    inherited: boolean;
    extensions: ExtensionRenderer[];
    override?: DocumentNode;
  }) => {
    const typeName = camelCase(this.c.$.name, { pascalCase: true });

    // TODO: if compatible override given, try to merge 
    if (override?.definitions.some((d) => "name" in d && d.name?.value === typeName)) {
      return [];
    }

    const toObjectDef = (
      name: string,
      interfaces: string[],
      fields: FieldDefinitionNode[],
      description?: string
    ): ObjectTypeDefinitionNode => {
      const desc: StringValueNode | undefined = description
        ? {
            kind: Kind.STRING,
            value: description,
            block: true,
          }
        : undefined;

      return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: name,
        },
        interfaces: interfaces.map((n) => named(n)),
        fields,
        description: desc,
      };
    };

    const fields = [...(this.fields ?? []), ...(inherits?.fields ?? [])];

    const interfaces: string[] = [NodeInterface.name.value];
    if (inherits) {
      interfaces.push(inherits.getInterfaceName());
    }
    if (inherited) {
      interfaces.push(this.getInterfaceName());
    }

    const classDef = toObjectDef(typeName, interfaces, fields, this.c.$.description);
    const edgeDef = toObjectDef(
      `${typeName}${EDGE_TYPE_NAME}`,
      [EDGE_TYPE_NAME],
      [
        FieldDefinition("cursor", nonNull(named("String"))),
        FieldDefinition("node", nonNull(named(inherited ? this.getInterfaceName() : typeName))),
      ]
    );
    const connectionDef = toObjectDef(
      `${typeName}${CONNECTION_TYPE_NAME}`,
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
              type: nonNull(named("String")),
            },
          ],
          type: named(inherited ? this.getInterfaceName() : typeName),
        },
        FieldDefinition("edges", nonNull(list(nonNull(named(`${typeName}${EDGE_TYPE_NAME}`))))),
        FieldDefinition("pageInfo", nonNull(named("PageInfo"))),
      ]
    );
    return [connectionDef, edgeDef, classDef];
  };
}
