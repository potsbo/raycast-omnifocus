import { FieldDefinitionNode, InputValueDefinitionNode, Kind, StringValueNode, TypeNode } from "graphql";
import { ContentDefinition, ElementDefinition, PropertyDefinition } from "./sdef";
import { getGraphQLType, named, nonNull } from "./types";
import { name } from "./name";

const CONNECTION_TYPE_NAME = "Connection";

export const collectFieldsDefinitions = (c: {
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}) => {
  const properties: FieldDefinitionNode[] = (c.property ?? []).map((t) => {
    return field(t.$.name, getGraphQLType(t), { description: t.$.description });
  });

  const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
    return field(`${e.$.type}s`, nonNull(named(e.$.type, CONNECTION_TYPE_NAME)), {
      description: e.$.description,
      arguments: [
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          name: name("whose"),
          type: named("Condition"),
        },
      ],
    });
  });

  const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
    return field(ctnt.$.name, nonNull(ctnt.$.type), { description: ctnt.$.description });
  });
  // TODO: respond-to
  return properties.concat(elements).concat(contents);
};

export const field = (
  fieldName: string,
  type: TypeNode,
  opts?: { description?: string; arguments?: InputValueDefinitionNode[] }
): FieldDefinitionNode => {
  const desc: StringValueNode | undefined = opts?.description
    ? {
        kind: Kind.STRING,
        value: opts?.description,
        block: true,
      }
    : undefined;
  return {
    kind: Kind.FIELD_DEFINITION,
    name: name(fieldName),
    type,
    description: desc,
    arguments: opts?.arguments,
  };
};
