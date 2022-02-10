import {
  FragmentSpreadNode,
  GraphQLField,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLResolveInfo,
  Kind,
  NamedTypeNode,
  SelectionNode,
  StringValueNode,
  TypeNode,
} from "graphql";
import { OnlyDirectiveArgs } from "./generated/graphql";

interface CurrentContext {
  rootName: string;
  fragments: GraphQLResolveInfo["fragments"];
  schema: GraphQLResolveInfo["schema"];
  graphField: GraphQLField<unknown, unknown, unknown>;
}

const genFilter = ({ field, op = "===", value = "true" }: OnlyDirectiveArgs) => {
  return `.filter((e) => e.${field}() ${op} ${value})`;
};

const convertFragSpread = (
  { rootName, fragments, graphField, schema }: CurrentContext,
  f: FragmentSpreadNode
): string => {
  const name = f.name.value;
  const fs = fragments[name];
  const astNode = schema.getType(fs.typeCondition.name.value)?.astNode;
  if (astNode === undefined || astNode === null) {
    throw new Error("Type Definition not found");
  }

  if (astNode.kind !== Kind.OBJECT_TYPE_DEFINITION) {
    throw new Error("Unsupporetd type def");
  }
  // TODO: pass to convertField
  const _ = astNode.fields?.map((f) => {
    return { name: f.name.value, type: f.type };
  });

  const converted = fs.selectionSet.selections
    .map((f) => {
      return convertField({ rootName, fragments, graphField, schema }, f);
    })
    .join("");

  return converted;
};

const convertField = (
  { rootName, fragments, graphField, schema }: CurrentContext,
  f: SelectionNode,
  typeNode?: TypeNode
): string => {
  if (f.kind === Kind.INLINE_FRAGMENT) {
    throw new Error(`unsupported node type: ${f.kind}"`);
  }
  const name = f.name.value;
  if (f.kind === Kind.FRAGMENT_SPREAD) {
    return convertFragSpread({ rootName, fragments, graphField, schema }, f);
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
    if (!typeNode) {
      console.log(f);
    }
    return `${name}: ${convertFields(
      { rootName: child, fragments, graphField, schema },
      f.selectionSet.selections,
      typeNode,
      {
        arrayTap,
      }
    )},`;
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

const unwrapType = (typeNode: TypeNode): NamedTypeNode => {
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return typeNode;
  }
  return unwrapType(typeNode.type);
};

const convertFields = (
  ctx: CurrentContext,
  fs: readonly SelectionNode[],
  typeNode?: TypeNode,
  opts: Partial<{ arrayTap: string }> = {}
) => {
  if (typeNode) {
    // TODO: pass to convertField
    // const fieldDefs = (typeNode as any).fields?.map((f: any) => {
    //   return { name: f.name.value, type: f.type };
    // });
    const typeName = unwrapType(typeNode).name.value;
    const typeDef = ctx.schema.getType(typeName)?.astNode;
    if (!typeDef) {
      throw new Error("type def undefined");
    }
    if (typeDef.kind !== Kind.OBJECT_TYPE_DEFINITION) {
      throw new Error("unsupported type definition kind");
    }

    const converted = fs
      .map((f) => {
        if (f.kind === Kind.INLINE_FRAGMENT) {
          throw new Error(`unsupported node type: ${f.kind}"`);
        }
        const name = f.name.value;
        if (f.kind === Kind.FRAGMENT_SPREAD) {
          return convertFragSpread(ctx, f);
        }
        const found = typeDef.fields?.find((def) => def.name.value === name);
        return convertField(ctx, f, found?.type);
      })
      .join("");

    const convertedForArray = fs
      .map((f) => {
        return convertField({ ...ctx, rootName: "elm" }, f);
      })
      .join("");

    return `${ctx.rootName} ? ${arrayCare(ctx, converted, convertedForArray, opts.arrayTap ?? "")}: undefined`;
  }
  const converted = fs
    .map((f) => {
      return convertField(ctx, f);
    })
    .join("");

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

  const def = info.schema.getQueryType()?.getFields()[field.name.value];
  const fs = field.selectionSet.selections;
  const fdef = def?.astNode?.type;
  if (fdef === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }
  return `${vars}(${convertFields({ rootName, fragments, graphField, schema: info.schema }, fs, fdef)})`;
};
