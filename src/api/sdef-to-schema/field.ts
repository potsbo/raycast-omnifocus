import { FieldDefinitionNode, Kind, TypeNode } from "graphql";
import camelCase from "camelcase";
import { ContentDefinition, ElementDefinition, PropertyDefinition } from "./sdef";
import { getGraphQLType, NameType, NonNullType } from "./types";

const CONNECTION_TYPE_NAME = "Connection";

export const collectFieldsDefinitions = (c: {
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}) => {
  const properties: FieldDefinitionNode[] = (c.property ?? []).map((t) => {
    return FieldDefinition(t.$.name, getGraphQLType(t));
  });

  const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
    return FieldDefinition(`${e.$.type}s`, NonNullType(NameType(e.$.type, CONNECTION_TYPE_NAME)));
  });

  const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
    return FieldDefinition(ctnt.$.name, NonNullType(NameType(ctnt.$.type)));
  });
  // TODO: respond-to
  return properties.concat(elements).concat(contents);
};

export const FieldDefinition = (name: string, type: TypeNode): FieldDefinitionNode => {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: camelCase(name),
    },
    type,
  };
};
