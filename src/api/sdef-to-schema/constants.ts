import { InterfaceTypeDefinitionNode, Kind } from "graphql";
import { FieldDefinition } from "./field";
import { list, named, nonNull } from "./types";

export const CONNECTION_TYPE_NAME = "Connection";
export const EDGE_TYPE_NAME = "Edge";
export const NODE_TYPE_NAME = "Node";
export const INTERFACE_SUFFIX = "Interface";

export const NodeInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: NODE_TYPE_NAME,
  },
  fields: [FieldDefinition("id", nonNull(named("String")))],
};

// https://relay.dev/graphql/connections.htm#sec-Edge-Types
export const EdgeInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: EDGE_TYPE_NAME,
  },
  fields: [
    FieldDefinition("node", nonNull(named("Node"))),
    FieldDefinition("cursor", nonNull(named("String"))),
  ],
};

// https://relay.dev/graphql/connections.htm#sec-Connection-Types
export const ConnectionInterface: InterfaceTypeDefinitionNode = {
  kind: Kind.INTERFACE_TYPE_DEFINITION,
  name: {
    kind: Kind.NAME,
    value: CONNECTION_TYPE_NAME,
  },
  fields: [
    FieldDefinition("edges", nonNull(list(nonNull(named(EDGE_TYPE_NAME))))),
    FieldDefinition("pageInfo", nonNull(named("PageInfo"))),
    // https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html
    {
      ...FieldDefinition("byId", named("Node")),
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
    },
  ],
};
