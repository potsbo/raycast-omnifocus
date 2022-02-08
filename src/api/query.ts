import { GraphQLResolveInfo, Kind, SelectionNode } from "graphql";

interface CurrentContext {
  rootName: string;
  fragments: GraphQLResolveInfo["fragments"];
}

const convertField = ({ rootName, fragments }: CurrentContext, f: SelectionNode): string => {
  if (f.kind === Kind.INLINE_FRAGMENT) {
    throw new Error(`unsupported node type: ${f.kind}"`);
  }
  const name = f.name.value;
  if (f.kind === Kind.FRAGMENT_SPREAD) {
    const fs = fragments[f.name.value];
    return "{" + convertFields({ rootName, fragments }, fs.selectionSet.selections) + "}";
  }
  if (f.selectionSet) {
    const child = `${rootName}.${name}()`;
    return `${name}: ${child} ? { ${convertFields({ rootName: child, fragments }, f.selectionSet.selections)}} : undefined,`;
  }
  return `${name}: ${rootName}.${name}(),`;
};

const convertFields = ({ rootName, fragments }: CurrentContext, fs: readonly SelectionNode[]) => {
  const converted = fs
    .map((f) => {
      return convertField({ rootName, fragments }, f);
    })
    .join("");

  return `${converted}`;
};

export const genQuery = (rootName: string, info: Pick<GraphQLResolveInfo, "operation" | "fragments">) => {
  const field = info.operation.selectionSet.selections[0];
  const { fragments } = info;
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }
  const fs = field.selectionSet.selections;
  return `(${rootName} ? ${convertFields({ rootName, fragments }, fs)} : undefined)`;
};
