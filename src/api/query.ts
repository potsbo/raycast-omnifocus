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
import { internalFieldName } from "./internalField";
import { library } from "./jxalib";
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
  const name = f.field.name.value;
  if (f.field.selectionSet) {
    if (f.field.name.value === "pageInfo") {
      // TODO: not to hard code
      return `pageInfo: {
        hasPreviousPage: false,
        hasNextPage: false,
        startCursor: "",
        endCursor: "",
      },`;
    }
    if (f.field.name.value === "edges") {
      const renderNodeField = () => {
        const typeNode = f.definition.type;
        const node = dig(ctx, { selectedFields: f.field.selectionSet?.selections ?? [], typeNode }, "node");
        if (node === null) {
          return "";
        }

        return `node: ${renderObject({ ...ctx, rootName: "elm" }, node)},`;
      };
      const renderCursor = () => {
        const cursor = f.field.selectionSet?.selections.find((f) => f.kind === Kind.FIELD && f.name.value === "cursor");
        if (cursor === undefined) {
          return "";
        }
        const nodeType = mustFindTypeDefinition(ctx, f.definition.type).fields?.find((f) => f.name.value === "node");
        if (nodeType === undefined) {
          throw new Error("an edge type doesn't have node field");
        }
        const idField = mustFindTypeDefinition(ctx, nodeType.type).fields?.find((f) => f.name.value === "id");
        if (idField === undefined) {
          throw new Error("a node type doesn't have id field");
        }
        const fieldName = internalFieldName(idField);
        return `cursor: elm.${fieldName}(),`;
      };
      return `
        edges: nodes.map((elm) => {
          return {
            ${renderCursor()}
            ${renderNodeField()}
          }
        }),
      `;
    }

    const args: string[] = [];
    f.field.arguments?.forEach((a) => {
      // TODO: not to hard code
      if (a.name.value === "whose") {
        return;
      }
      if (a.value.kind === Kind.VARIABLE) {
        args.push(a.value.name.value);
        return;
      }
      if (a.value.kind === Kind.STRING) {
        args.push(`"${a.value.value}"`);
        return;
      }
      throw `Non variable argument found ${a.kind}`;
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

  const fieldName = internalFieldName(f.definition);
  const isEnum = isEnumValue(ctx, f.definition);
  const suffix = isEnum ? `()?.toUpperCase().replaceAll(" ", "_")` : opts.isRecordType ? "" : "()";
  return `${name}: ${ctx.rootName}.${fieldName}${suffix},`;
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
    return `
      (() => {
        const nodes = ${ctx.rootName}${opts.whose ?? ""}();
        return {
          ${renderFields(ctx, object)}
        }
      })()
    `;
  }

  return `{ ${renderFields(ctx, object)} }`;
};

const renderFields = (ctx: CurrentContext, object: RenderableObject, withReflection?: boolean): string => {
  const objectDef = mustFindTypeDefinition(ctx, object.typeNode);
  const isRecordType = objectDef.directives?.some((d) => d.name.value === "recordType") ?? false;

  const reflectionRequired =
    withReflection !== undefined
      ? withReflection
      : objectDef.kind === Kind.INTERFACE_TYPE_DEFINITION &&
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
              ${renderFields(ctx, { selectedFields: field.selectionSet.selections, typeNode }, false)}
               __typename: "${typeNode.name.value}",
            }
            : {}
        })(),`;
      }
      if (field.kind === Kind.FRAGMENT_SPREAD) {
        const fs = ctx.fragments[field.name.value];
        return renderFields(ctx, { selectedFields: fs.selectionSet.selections, typeNode: fs.typeCondition }, false);
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

export const genQuery = (
  appName: string,
  info: Pick<GraphQLResolveInfo, "operation" | "fragments" | "variableValues" | "schema">,
  rootObjName?: string
) => {
  const vars = Object.entries(info.variableValues)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n");

  const field = info.operation.selectionSet.selections[0];
  if (field.kind !== Kind.FIELD || field.selectionSet === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const fieldGeter = info.operation.operation === "query" ? info.schema.getQueryType() : info.schema.getMutationType();

  const fdef = fieldGeter?.getFields()[field.name.value].astNode?.type;
  if (fdef === undefined) {
    throw new Error(`unsupported node type or undefined selectionSet`);
  }

  const primarySelection = info.operation.selectionSet.selections[0];
  if (primarySelection.kind !== Kind.FIELD) {
    throw new Error("Field is expected at top level selection set");
  }

  if (rootObjName === undefined) {
    const fs = field.selectionSet.selections;
    const parent = `_parent`;
    const convert = `const ${parent} = Application("${appName}");`;
    return `${library};${vars};${convert};JSON.stringify({ result: ${renderObject(
      { ...info, rootName: parent },
      { selectedFields: fs, typeNode: fdef }
    )}})`;
  }

  const fs = field.selectionSet.selections;
  return `${library};${vars};JSON.stringify({ result: ${renderObject(
    { ...info, rootName: rootObjName },
    { selectedFields: fs, typeNode: fdef }
  )}})`;
};
