import { FieldDefinitionNode, InterfaceTypeDefinitionNode, Kind, NamedTypeNode, TypeNode } from "graphql";

export const unwrapType = (typeNode: TypeNode): NamedTypeNode => {
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return typeNode;
  }
  return unwrapType(typeNode.type);
};

const identicalType = (a: TypeNode, b: TypeNode): boolean => {
  if (a.kind === Kind.NAMED_TYPE && b.kind === Kind.NAMED_TYPE) {
    return a.name.value === b.name.value;
  }
  if (a.kind === Kind.LIST_TYPE && b.kind === Kind.LIST_TYPE) {
    return identicalType(a.type, b.type);
  }
  if (a.kind === Kind.NON_NULL_TYPE && b.kind === Kind.NON_NULL_TYPE) {
    return identicalType(a.type, b.type);
  }
  return false;
};

export const implementsInterface = (
  objectLike: { fields?: FieldDefinitionNode[] },
  itfc: InterfaceTypeDefinitionNode
): boolean => {
  if (itfc.fields === undefined) {
    return true;
  }
  return itfc.fields.every((required) => {
    return objectLike.fields?.some(
      (actual) => actual.name.value === required.name.value && identicalType(required.type, actual.type)
    );
  });
};
