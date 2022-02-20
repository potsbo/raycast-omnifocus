import camelCase from "camelcase";
import { Kind, ListTypeNode, NamedTypeNode, NonNullTypeNode, TypeNode } from "graphql";
import { PropertyDefinition } from "./sdef";

export const typeNameMap = (sdefName: string): string | null => {
  switch (sdefName) {
    case "text":
      return "String";
    case "boolean":
      return "Boolean";
    case "date":
      return "String";
    case "integer":
      return "Int";
    case "real":
      return "Float";
  }
  return null;
};

export const named = (name: string, suffix = ""): NamedTypeNode => {
  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: typeNameMap(name) ?? camelCase(name, { pascalCase: true }) + suffix,
    },
  };
};

export const list = (type: NonNullTypeNode | NamedTypeNode): ListTypeNode => {
  return { kind: Kind.LIST_TYPE, type };
};

export const nonNull = (type: ListTypeNode | NamedTypeNode): NonNullTypeNode => {
  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  };
};

export const nullable = (type: TypeNode): ListTypeNode | NamedTypeNode => {
  if (type.kind === Kind.NON_NULL_TYPE) {
    return type.type;
  }
  return type;
};

export const getGraphQLType = (t: PropertyDefinition): TypeNode => {
  if ("type" in t) {
    const types = t.type.map((t) => t.$);
    if (types.length === 2 && types[1].type === "missing value") {
      return named(types[0].type);
    }

    if (types.length === 1) {
      const type = types[0];
      const converted = typeNameMap(type.type);
      if (converted !== null) {
        if (type.list === "yes") {
          return nonNull(list(nonNull(named(converted))));
        }
        return nonNull(named(converted));
      }
    }

    return named("TODO__" + types.map((t) => camelCase(t.type, { pascalCase: true })).join("_OR_"));
  }

  if ("type" in t.$) {
    const res = typeNameMap(t.$.type);
    if (res) {
      return nonNull(named(res));
    }
    return nonNull(named(t.$.type));
  }

  throw new Error("Type definition not found");
};
