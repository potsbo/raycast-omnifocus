import { GraphQLResolveInfo } from "graphql";

interface SelectionNode {
  name: { value: string };
  selectionSet?: { selections: SelectionNode[] };
}

const convertField = (rootName: string, f: SelectionNode): string => {
  if (f.selectionSet) {
    return `  ${f.name.value}: ${convertFields(`${rootName}.${f.name.value}()`, f.selectionSet.selections, 2)},`;
  }
  return `  ${f.name.value}: ${rootName}.${f.name.value}(),`;
};

const convertFields = (rootName: string, fs: SelectionNode[], indentSize = 0) => {
  const prefix = " ".repeat(indentSize);
  const converted = fs
    .map((f) => {
      return convertField(rootName, f);
    })
    .map((s) => prefix + s);

  const body = ["{", ...converted, `${prefix}}`].join("\n");
  return `${rootName} ? ${body} : undefined`;
};

export const genQuery = (rootName: string, info: Pick<GraphQLResolveInfo, "operation">) => {
  const field = info.operation.selectionSet.selections[0] as any;
  const fs = field.selectionSet.selections;
  return ["(", convertFields(rootName, fs), ")"].join("");
};
