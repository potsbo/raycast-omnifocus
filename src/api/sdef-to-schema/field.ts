import { FieldDefinitionNode, Kind, StringValueNode, TypeNode } from "graphql";
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
    return FieldDefinition(t.$.name, getGraphQLType(t), t.$.description);
  });

  const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
    return FieldDefinition(`${e.$.type}s`, NonNullType(NameType(e.$.type, CONNECTION_TYPE_NAME)), e.$.description);
  });

  const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
    return FieldDefinition(ctnt.$.name, NonNullType(NameType(ctnt.$.type)), ctnt.$.description);
  });
  // TODO: respond-to
  return properties.concat(elements).concat(contents);
};

export const FieldDefinition = (name: string, type: TypeNode, description?: string): FieldDefinitionNode => {
  const desc: StringValueNode | undefined = description
    ? {
        kind: Kind.STRING,
        value: description,
      }
    : undefined;
  return {
    kind: Kind.FIELD_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: camelCase(name),
    },
    type,
    description: desc,
  };
};
