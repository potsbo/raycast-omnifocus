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
    const fs = fragments[name];
    return convertFields({ rootName, fragments }, fs.selectionSet.selections, true);
  }
  const noFunc = (f.directives ?? []).some((d) => d.name.value === "noFunc");

  if (f.selectionSet) {
    const args: string[] = [];
    f.arguments?.forEach((a) => {
      if (a.value.kind !== Kind.VARIABLE) {
        throw "Non variable argument found";
      }
      args.push(a.value.name.value);
    });

    const suffix = noFunc ? "" : `(${args.join(",")})`;

    const child = `${rootName}.${name}${suffix}`;
    return `${name}: ${convertFields({ rootName: child, fragments }, f.selectionSet.selections)},`;
  }
  return `${name}: ${rootName}.${name}(),`;
};

const arrayCare = (ctx: CurrentContext, body: string, arrayBody: string) => {
  return `
  Array.isArray(${ctx.rootName}) ?
  ${ctx.rootName}.map((elm) => {
   return { ${arrayBody} };
  }) : { ${body} }
  `;
};

const convertFields = (ctx: CurrentContext, fs: readonly SelectionNode[], fieldsOnly = false) => {
  const converted = fs
    .map((f) => {
      return convertField(ctx, f);
    })
    .join("");

  if (fieldsOnly) {
    return converted;
  }

  const convertedForArray = fs
    .map((f) => {
      return convertField({ ...ctx, rootName: "elm" }, f);
    })
    .join("");

  return `${ctx.rootName} ? ${arrayCare(ctx, converted, convertedForArray)}: undefined`;
};

export const genQuery = (
  rootName: string,
  info: Pick<GraphQLResolveInfo, "operation" | "fragments" | "variableValues">
) => {
  const vars = Object.entries(info.variableValues)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n");
  const field = info.operation.selectionSet.selections[0];
  const { fragments } = info;
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }
  const fs = field.selectionSet.selections;
  return `${vars}(${convertFields({ rootName, fragments }, fs)})`;
};
