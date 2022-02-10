import { FragmentSpreadNode, GraphQLField, GraphQLResolveInfo, Kind, SelectionNode, StringValueNode } from "graphql";
import { OnlyDirectiveArgs } from "./generated/graphql";

interface CurrentContext {
  rootName: string;
  fragments: GraphQLResolveInfo["fragments"];
  graphField: GraphQLField<unknown, unknown, unknown>;
}

const genFilter = ({ field, op = "===", value = "true" }: OnlyDirectiveArgs) => {
  return `.filter((e) => e.${field}() ${op} ${value})`;
};

const convertFragSpread = ({ rootName, fragments, graphField }: CurrentContext, f: FragmentSpreadNode): string => {
  const name = f.name.value;
  const fs = fragments[name];
  return convertFields({ rootName, fragments, graphField }, fs.selectionSet.selections, { fieldsOnly: true });
};

const convertField = ({ rootName, fragments, graphField }: CurrentContext, f: SelectionNode): string => {
  if (f.kind === Kind.INLINE_FRAGMENT) {
    throw new Error(`unsupported node type: ${f.kind}"`);
  }
  const name = f.name.value;
  if (f.kind === Kind.FRAGMENT_SPREAD) {
    return convertFragSpread({ rootName, fragments, graphField }, f);
  }
  const noFunc = (f.directives ?? []).some((d) => d.name.value === "noFunc");

  const onlyDirectives = (f.directives ?? [])
    .filter((t) => t.name.value == "only")
    .map(
      (t) =>
        Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          t.arguments!.map((a) => [a.name.value, (a.value as StringValueNode).value])
        ) as OnlyDirectiveArgs
    );
  const arrayTap = onlyDirectives.map(genFilter).join("");

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
    return `${name}: ${convertFields({ rootName: child, fragments, graphField }, f.selectionSet.selections, {
      arrayTap,
    })},`;
  }
  return `${name}: ${rootName}.${name}(),`;
};

const arrayCare = (ctx: CurrentContext, body: string, arrayBody: string, arrayTap: string) => {
  return `
  Array.isArray(${ctx.rootName}) ?
  ${ctx.rootName}${arrayTap}.map((elm) => {
   return { ${arrayBody} };
  }) : { ${body} }
  `;
};

const convertFields = (
  ctx: CurrentContext,
  fs: readonly SelectionNode[],
  opts: Partial<{ fieldsOnly: boolean; arrayTap: string }> = {}
) => {
  const converted = fs
    .map((f) => {
      return convertField(ctx, f);
    })
    .join("");

  if (opts.fieldsOnly) {
    return converted;
  }

  const convertedForArray = fs
    .map((f) => {
      return convertField({ ...ctx, rootName: "elm" }, f);
    })
    .join("");

  return `${ctx.rootName} ? ${arrayCare(ctx, converted, convertedForArray, opts.arrayTap ?? "")}: undefined`;
};

export const genQuery = (
  rootName: string,
  info: Pick<GraphQLResolveInfo, "operation" | "fragments" | "variableValues" | "schema">
) => {
  const vars = Object.entries(info.variableValues)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n");
  const field = info.operation.selectionSet.selections[0];
  if (field.kind !== Kind.FIELD) {
    throw new Error(`unsupported node type: ${field.kind}"`);
  }
  const queryName = field.name.value;
  const graphField = info.schema.getQueryType()?.getFields()[queryName];
  if (graphField === undefined) {
    throw new Error(`graph field undefiend`);
  }

  const { fragments } = info;
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }
  const fs = field.selectionSet.selections;
  return `${vars}(${convertFields({ rootName, fragments, graphField }, fs)})`;
};
