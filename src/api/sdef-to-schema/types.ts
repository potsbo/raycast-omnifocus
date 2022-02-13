import camelCase from "camelcase";
import { Kind, ListTypeNode, NamedTypeNode, NonNullTypeNode } from "graphql";

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
