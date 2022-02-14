import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  StringValueNode,
} from "graphql";
import camelCase from "camelcase";
import { collectFieldsDefinitions, FieldDefinition } from "./field";
import { ClassDefinition } from "./sdef";
import { NameType, NonNullType, ListType } from "./types";
import { EDGE_TYPE_NAME, CONNECTION_TYPE_NAME, NodeInterface } from "./constants";
import { implementsInterface } from "../graphql-utils";

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
      interfaces: [],
    };
  };
  getTypes = ({ inherits, inherited }: { inherits: ClassRenderer | undefined; inherited: boolean }) => {
    const className = camelCase(this.c.$.name, { pascalCase: true });

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
        interfaces: interfaces.map((n) => NameType(n)),
        fields,
        description: desc,
      };
    };

    const fields = [...(this.fields ?? []), ...(inherits?.fields ?? [])];

    const interfaces: string[] = [];
    if (inherits) {
      interfaces.push(inherits.getInterfaceName());
    }
    if (inherited) {
      interfaces.push(this.getInterfaceName());
    }
    const isNode = implementsInterface({ fields }, NodeInterface);
    if (isNode) {
      interfaces.push(NodeInterface.name.value);
    }

    if (className === "RichText") {
      console.log({
        fields: fields.map((f) => f.name.value),
        interfaceFields: NodeInterface.fields?.map((f) => f.name.value),
        isNode,
      });
    }

    const classDef = toObjectDef(className, interfaces, fields, this.c.$.description);
    if (!isNode) {
      return [classDef];
    }
    const edgeDef = toObjectDef(
      `${className}${EDGE_TYPE_NAME}`,
      [EDGE_TYPE_NAME],
      [
        FieldDefinition("cursor", NonNullType(NameType("String"))),
        FieldDefinition("node", NonNullType(NameType(className))),
      ]
    );
    const connectionDef = toObjectDef(
      `${className}${CONNECTION_TYPE_NAME}`,
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
              type: NonNullType(NameType("String")),
            },
          ],
          type: NameType(className),
        },
        FieldDefinition("edges", NonNullType(ListType(NonNullType(NameType(`${className}${EDGE_TYPE_NAME}`))))),
        FieldDefinition("pageInfo", NonNullType(NameType("PageInfo"))),
      ]
    );
    return [connectionDef, edgeDef, classDef];
  };
}
