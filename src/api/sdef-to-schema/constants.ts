import { InterfaceTypeDefinitionNode, Kind } from "graphql";
import { FieldDefinition } from "./field";
import { ListType, NameType, NonNullType } from "./types";

export const CONNECTION_TYPE_NAME = "Connection";
export const EDGE_TYPE_NAME = "Edge";
export const INTERFACE_SUFFIX = "Interface";

export const NodeInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: "Node",
  },
  fields: [FieldDefinition("id", NonNullType(NameType("String")))],
};

export const EdgeInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: "Edge",
  },
  fields: [
    FieldDefinition("node", NonNullType(NameType("Node"))),
    FieldDefinition("cursor", NonNullType(NameType("String"))),
  ],
};
export const ConnectionInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: EDGE_TYPE_NAME,
  },
  fields: [
    FieldDefinition("edges", NonNullType(ListType(NonNullType(NameType(EDGE_TYPE_NAME))))),
    FieldDefinition("pageInfo", NonNullType(NameType("PageInfo"))),
    {
      ...FieldDefinition("byId", NameType("Node")),
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
    },
  ],
};
