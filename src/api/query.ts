import {
  FieldNode,
  GraphQLResolveInfo,
  Kind,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  SelectionNode,
  TypeNode,
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
} from "graphql";
import { unwrapType } from "./graphql-utils";
import { compileWhoseParam, extractCondition } from "./whose";

type CurrentContext = {
  rootName: string;
} & Pick<GraphQLResolveInfo, "fragments" | "schema" | "variableValues">;

type RenderableObject<T extends TypeNode = TypeNode> = {
  selectedFields: readonly SelectionNode[];
  typeNode: T;
};

type RenderableField = {
  field: FieldNode;
  definition: FieldDefinitionNode;
};

const renderField = (
  ctx: CurrentContext,
  f: RenderableField,
  opts: Partial<{ isRecordType: boolean; isEnum: boolean }> = {}
): string => {
  // TODO: handle in connection renderer
  if (f.field.name.value === "pageInfo") {
    return "";
  }
  if (f.field.name.value === "edges") {
    return "";
  }

  const name = f.field.name.value;

  if (f.field.selectionSet) {
    const args: string[] = [];
    f.field.arguments?.forEach((a) => {
      if (a.value.kind === Kind.VARIABLE) {
        args.push(a.value.name.value);
        return;
      }
      if (a.value.kind === Kind.STRING) {
        args.push(`"${a.value.value}"`);
        return;
      }
      throw `Non variable argument found ${JSON.stringify(a)}`;
    });

    const noCall = mustFindTypeDefinition(ctx, f.definition.type).interfaces?.some(
      (i) => i.name.value === "Connection"
    );

    const whose = compileWhoseParam(extractCondition(ctx, f.field));
    const suffix = noCall ? "" : `(${args.join(",")})`;
    const child = `${ctx.rootName}.${name}${suffix}`;
    return `${name}: ${renderObject(
      { ...ctx, rootName: child },
      { selectedFields: f.field.selectionSet.selections, typeNode: f.definition.type },
      { whose }
    )},`;
  }

  const isEnum = isEnumValue(ctx, f.definition);
  const suffix = isEnum ? `?.toUpperCase().replaceAll(" ", "_")` : opts.isRecordType ? "" : "()";
  return `${name}: ${ctx.rootName}.${name}${suffix},`;
};

const isEnumValue = (ctx: CurrentContext, f: FieldDefinitionNode): boolean => {
  const typeName = unwrapType(f.type).name.value;
  const typeDef = ctx.schema.getType(typeName)?.astNode;
  return typeDef?.kind === Kind.ENUM_TYPE_DEFINITION;
};

const mustFindTypeDefinition = (
  ctx: CurrentContext,
  typeNode: TypeNode
): ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode => {
  const typeName = unwrapType(typeNode).name.value;
  const typeDef = ctx.schema.getType(typeName)?.astNode;
  if (!typeDef) {
    throw new Error(`type def for ${typeName} undefined`);
  }
  if (typeDef.kind === Kind.OBJECT_TYPE_DEFINITION) {
    return typeDef;
  }
  if (typeDef.kind === Kind.INTERFACE_TYPE_DEFINITION) {
    return typeDef;
  }

  throw new Error("unsupported type definition kind");
};

const dig = (ctx: CurrentContext, object: RenderableObject, ...fieldNames: string[]): RenderableObject | null => {
  if (fieldNames.length === 0) {
    return object;
  }
  const fieldName = fieldNames[0];
  const typeDef = mustFindTypeDefinition(ctx, object.typeNode);
  const typeNode = typeDef.fields?.find((f) => f.name.value === fieldName)?.type;
  if (!typeNode) {
    throw new Error(`Type definition not found for ${fieldName}`);
  }

  const selectedFields = object.selectedFields.filter(isField).find((f) => f.name.value === fieldName)
    ?.selectionSet?.selections;

  if (!selectedFields) {
    return null;
  }

  return dig(ctx, { selectedFields, typeNode }, ...fieldNames.slice(1));
};

const renderObject = (ctx: CurrentContext, object: RenderableObject, opts: Partial<{ whose: string }> = {}): string => {
  if (object.typeNode.kind === Kind.NON_NULL_TYPE) {
    return renderNonNullObject(ctx, { ...object, typeNode: object.typeNode.type }, opts);
  }

  return `${ctx.rootName} ? ${renderNonNullObject(ctx, { ...object, typeNode: object.typeNode }, opts)}: undefined`;
};

const isField = (n: SelectionNode): n is FieldNode => {
  return n.kind === Kind.FIELD;
};

const renderNonNullObject = (
  ctx: CurrentContext,
  object: RenderableObject<NonNullTypeNode["type"]>,
  opts: Partial<{ whose: string }> = {}
) => {
  if (object.typeNode.kind === Kind.LIST_TYPE) {
    return `${ctx.rootName}.map((elm) => {
      return { ${renderFields({ ...ctx, rootName: "elm" }, object)} };
     })`;
  }

  const isConnection = mustFindTypeDefinition(ctx, object.typeNode).interfaces?.some(
    (i) => i.name.value === "Connection"
  );

  if (isConnection) {
    // TODO: consider cursor
    const renderNodeField = () => {
      const node = dig(ctx, object, "edges", "node");
      if (node === null) {
        return "";
      }
      return `node: ${renderObject({ ...ctx, rootName: "elm" }, node)},`;
    };

    return `
    (() => {
      const nodes = ${ctx.rootName}${opts.whose ?? ""}();
      return {
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          startCursor: "",
          endCursor: "",
        },
        edges: nodes.map((elm) => {
          return {
            cursor: elm.id(),
            ${renderNodeField()}
          }
        }),
        ${renderFields(ctx, object)}
      }
    })()
    `;
  }

  return `{ ${renderFields(ctx, object)} }`;
};

const renderFields = (ctx: CurrentContext, object: RenderableObject): string => {
  const objectDef = mustFindTypeDefinition(ctx, object.typeNode);
  const isRecordType = objectDef.directives?.some((d) => d.name.value === "recordType") ?? false;

  const reflectionRequired =
    objectDef.kind === Kind.INTERFACE_TYPE_DEFINITION &&
    !object.selectedFields.some((f) => "name" in f && f.name.value === "__typename");
  const reflection = `__typename:  pascalCase(${ctx.rootName}.properties().pcls),`;

  return object.selectedFields
    .map((field) => {
      if (field.kind === Kind.INLINE_FRAGMENT) {
        const typeNode = field.typeCondition;
        if (typeNode === undefined) {
          throw new Error(`Type Condition for InlineFragment not found`);
        }
        // TODO: calling `properties` can be expensive
        return `...(() => {
          return ${ctx.rootName}.properties().pcls.toLowerCase() === "${typeNode.name.value}".toLowerCase()
            ? {
              ${renderFields(ctx, { selectedFields: field.selectionSet.selections, typeNode })}
               __typename: "${typeNode.name.value}",
            }
            : {}
        })(),`;
      }
      if (field.kind === Kind.FRAGMENT_SPREAD) {
        const fs = ctx.fragments[field.name.value];
        return renderFields(ctx, { selectedFields: fs.selectionSet.selections, typeNode: fs.typeCondition });
      }
      if (field.name.value === "__typename") {
        return reflection;
      }
      const definition = mustFindTypeDefinition(ctx, object.typeNode).fields?.find(
        (def) => def.name.value === field.name.value
      );
      if (!definition) {
        throw new Error(`Field definition for "${field.name.value}" not found`);
      }
      return renderField(ctx, { field, definition }, { isRecordType });
    })
    .concat(reflectionRequired ? reflection : "")
    .sort()
    .join("");
};

function pascalCase(s: string) {
  return (s.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w[0].toUpperCase()}${w.slice(1)}`).join("");
}

export const genQuery = (
  rootName: string,
  info: Pick<GraphQLResolveInfo, "operation" | "fragments" | "variableValues" | "schema">
) => {
  const vars = Object.entries(info.variableValues)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n");
  const lib = pascalCase.toString();

  const field = info.operation.selectionSet.selections[0];
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const fdef = info.schema.getQueryType()?.getFields()[field.name.value].astNode?.type;
  if (fdef === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const primarySelection = info.operation.selectionSet.selections[0];
  if (primarySelection.kind !== Kind.FIELD) {
    throw new Error("Field is expected at top level selection set");
  }

  const fs = field.selectionSet.selections;
  const parent = `_${rootName}`;
  const convert = `const ${parent} = ${rootName}.${primarySelection.name.value};`;
  return `${lib};${vars};${convert};(${renderObject(
    { ...info, rootName: parent },
    { selectedFields: fs, typeNode: fdef }
  )})`;
};
