import { InputValueDefinitionNode, Kind } from "graphql";
import { ContentDefinition, ElementDefinition, PropertyDefinition } from "./sdef";
import { getGraphQLType, Nullable } from "./types";
import camelCase from "camelcase";

export const collectMutationArgs = (c: {
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}) => {
  const properties: InputValueDefinitionNode[] = (c.property ?? [])
    .filter((f) => !("access" in f.$ && f.$.access === "r"))
    .map((t) => {
      return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: camelCase(t.$.name),
        },
        type: Nullable(getGraphQLType(t)),
      };
    });

  return properties;
};
