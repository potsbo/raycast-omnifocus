import { FieldDefinitionNode, InputValueDefinitionNode, Kind, StringValueNode, TypeNode } from "graphql";
import camelCase from "camelcase";
import { ContentDefinition, ElementDefinition, PropertyDefinition } from "./sdef";
import { getGraphQLType, named, nonNull } from "./types";

const CONNECTION_TYPE_NAME = "Connection";

export const collectFieldsDefinitions = (c: {
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}) => {
  const properties: FieldDefinitionNode[] = (c.property ?? []).map((t) => {
    return FieldDefinition(t.$.name, getGraphQLType(t), { description: t.$.description });
  });

  const elements: FieldDefinitionNode[] = (c.element ?? []).map((e) => {
    return FieldDefinition(`${e.$.type}s`, nonNull(named(e.$.type, CONNECTION_TYPE_NAME)), {
      description: e.$.description,
      arguments: [
        {
          kind: Kind.INPUT_VALUE_DEFINITION,
          name: {
            kind: Kind.NAME,
            value: "whose",
          },
          type: named("Condition"),
        },
      ],
    });
  });

  const contents = (c.contents ?? []).map((ctnt): FieldDefinitionNode => {
    return FieldDefinition(ctnt.$.name, nonNull(ctnt.$.type), { description: ctnt.$.description });
  });
  // TODO: respond-to
  return properties.concat(elements).concat(contents);
};

export const FieldDefinition = (
  name: string,
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
    name: {
      kind: Kind.NAME,
      value: camelCase(name),
    },
    type,
    description: desc,
    arguments: opts?.arguments,
  };
};
