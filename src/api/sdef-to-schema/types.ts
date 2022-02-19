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

export const NameType = (name: string, suffix = ""): NamedTypeNode => {
  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: typeNameMap(name) ?? camelCase(name, { pascalCase: true }) + suffix,
    },
  };
};

export const ListType = (type: NonNullTypeNode | NamedTypeNode): ListTypeNode => {
  return { kind: Kind.LIST_TYPE, type };
};

export const NonNullType = (type: ListTypeNode | NamedTypeNode): NonNullTypeNode => {
  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  };
};

export const Nullable = (type: TypeNode): ListTypeNode | NamedTypeNode => {
  if (type.kind === Kind.NON_NULL_TYPE) {
    return type.type;
  }
  return type;
};

export const getGraphQLType = (t: PropertyDefinition): TypeNode => {
  if ("type" in t) {
    const types = t.type.map((t) => t.$);
    if (types.length === 2 && types[1].type === "missing value") {
      return NameType(types[0].type);
    }

    if (types.length === 1) {
      const type = types[0];
      const converted = typeNameMap(type.type);
      if (converted !== null) {
        if (type.list === "yes") {
          return NonNullType(ListType(NonNullType(NameType(converted))));
        }
        return NonNullType(NameType(converted));
      }
    }

    return NameType("TODO__" + types.map((t) => camelCase(t.type, { pascalCase: true })).join("_OR_"));
  }

  if ("type" in t.$) {
    const res = typeNameMap(t.$.type);
    if (res) {
      return NonNullType(NameType(res));
    }
    return NonNullType(NameType(t.$.type));
  }

  throw new Error("Type definition not found");
};
