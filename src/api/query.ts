import {
  FieldNode,
  FragmentSpreadNode,
  GraphQLNamedType,
  GraphQLResolveInfo,
  Kind,
  NamedTypeNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  SelectionNode,
  StringValueNode,
  TypeNode,
} from "graphql";
import { OnlyDirectiveArgs } from "./generated/graphql";

interface CurrentContext {
  rootName: string;
  fragments: GraphQLResolveInfo["fragments"];
  schema: GraphQLResolveInfo["schema"];
}

const genFilter = ({ field, op = "===", value = "true" }: OnlyDirectiveArgs) => {
  return `.filter((e) => e.${field}() ${op} ${value})`;
};

const convertFragSpread = (ctx: CurrentContext, f: FragmentSpreadNode): string => {
  const name = f.name.value;
  const fs = ctx.fragments[name];
  const astNode = ctx.schema.getType(fs.typeCondition.name.value)?.astNode;

  return convertFields(ctx, fs.selectionSet.selections, astNode);
};

const convertField = ({ rootName, fragments, schema }: CurrentContext, f: FieldNode, typeNode: TypeNode): string => {
  const name = f.name.value;
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
    return `${name}: ${convertObject({ rootName: child, fragments, schema }, f.selectionSet.selections, typeNode, {
      arrayTap,
    })},`;
  }
  return `${name}: ${rootName}.${name}(),`;
};

const unwrapType = (typeNode: TypeNode): NamedTypeNode => {
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return typeNode;
  }
  return unwrapType(typeNode.type);
};

const mustFindTypeDefinition = (ctx: CurrentContext, typeNode: TypeNode): ObjectTypeDefinitionNode => {
  const typeName = unwrapType(typeNode).name.value;
  const typeDef = ctx.schema.getType(typeName)?.astNode;
  if (!typeDef) {
    throw new Error("type def undefined");
  }
  if (typeDef.kind !== Kind.OBJECT_TYPE_DEFINITION) {
    throw new Error("unsupported type definition kind");
  }
  return typeDef;
};

const convertObject = (
  ctx: CurrentContext,
  fs: readonly SelectionNode[],
  typeNode: TypeNode,
  opts: Partial<{ arrayTap: string }> = {}
) => {
  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    return convertNonNullFields(ctx, fs, typeNode.type, opts);
  }

  return `${ctx.rootName} ? ${convertNonNullFields(ctx, fs, typeNode, opts)}: undefined`;
};

const convertNonNullFields = (
  ctx: CurrentContext,
  fs: readonly SelectionNode[],
  typeNode: NonNullTypeNode["type"],
  opts: Partial<{ arrayTap: string }> = {}
) => {
  const typeDef = mustFindTypeDefinition(ctx, typeNode);

  if (typeNode.kind === Kind.LIST_TYPE) {
    return `${ctx.rootName}${opts.arrayTap ?? ""}.map((elm) => {
      return { ${convertFields({ ...ctx, rootName: "elm" }, fs, typeDef)} };
     })`;
  }

  return `{ ${convertFields(ctx, fs, typeDef)} }`;
};

const convertFields = (ctx: CurrentContext, fs: readonly SelectionNode[], typeDef: GraphQLNamedType["astNode"]) => {
  if (!typeDef) {
    throw new Error("type def undefined");
  }
  if (typeDef.kind !== Kind.OBJECT_TYPE_DEFINITION) {
    throw new Error("unsupported type definition kind");
  }

  return fs
    .map((f) => {
      if (f.kind === Kind.INLINE_FRAGMENT) {
        throw new Error(`unsupported node type: ${f.kind}"`);
      }
      if (f.kind === Kind.FRAGMENT_SPREAD) {
        return convertFragSpread(ctx, f);
      }
      const name = f.name.value;
      const found = typeDef.fields?.find((def) => def.name.value === name);
      return convertField(ctx, f, found!.type);
    })
    .join("");
};

export const genQuery = (
  rootName: string,
  info: Pick<GraphQLResolveInfo, "operation" | "fragments" | "variableValues" | "schema">
) => {
  const vars = Object.entries(info.variableValues)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n");

  const field = info.operation.selectionSet.selections[0];
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const fdef = info.schema.getQueryType()?.getFields()[field.name.value].astNode?.type;
  if (fdef === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const fs = field.selectionSet.selections;
  return `${vars}(${convertObject({ ...info, rootName }, fs, fdef)})`;
};
