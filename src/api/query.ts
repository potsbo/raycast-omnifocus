import { GraphQLResolveInfo, Kind, SelectionNode } from "graphql";

const convertField = (rootName: string, f: SelectionNode): string => {
  if (f.kind !== Kind.FIELD) {
    throw new Error(`unsupported node type: ${f.kind}"`);
  }
  const name = f.name.value;
  if (f.selectionSet) {
    const child = `${rootName}.${name}()`;
    return `${name}: ${convertFields(child, f.selectionSet.selections)},`;
  }
  return `${name}: ${rootName}.${name}(),`;
};

const convertFields = (rootName: string, fs: readonly SelectionNode[]) => {
  const converted = fs
    .map((f) => {
      return convertField(rootName, f);
    })
    .join("");

  const body = `{${converted}}`;
  return `${rootName} ? ${body} : undefined`;
};

export const genQuery = (rootName: string, info: Pick<GraphQLResolveInfo, "operation">) => {
  const field = info.operation.selectionSet.selections[0];
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }
  const fs = field.selectionSet.selections;
  return `(${convertFields(rootName, fs)})`;
};
