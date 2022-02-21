import { FieldDefinitionNode, Kind } from "graphql";

export const internalFieldName = (fdef: FieldDefinitionNode): string => {
  const actual = fdef.directives
    ?.find((d) => d.name.value === "internalField")
    ?.arguments?.find((a) => a.name.value === "name")?.value;
  if (actual === undefined) {
    return fdef.name.value;
  }

  if (actual.kind !== Kind.STRING) {
    throw new Error("Field name must be a string");
  }
  return actual.value;
};
