import { DefinitionNode, DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode, TypeNode } from "graphql";
import { unwrapType } from "../../graphql-utils";

const SCALARS = ["Int", "Float", "String", "Boolean", "ID"];

class Pruner {
  private readonly doc: DocumentNode;
  constructor(doc: DocumentNode) {
    this.doc = doc;
  }

  prune = (): DocumentNode => {
    return { ...this.doc, definitions: this.doc.definitions.map(this.pruneDefinition) };
  };

  private pruneDefinition = (def: DefinitionNode): DefinitionNode => {
    switch (def.kind) {
      case Kind.OBJECT_TYPE_DEFINITION:
        return this.pruneObjectTypeDefinition(def);
      default:
        throw new Error(`Unsupported definition kind ${def.kind}`);
    }
  };

  private pruneObjectTypeDefinition = (def: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode => {
    return { ...def, fields: def.fields?.filter(this.definedType) };
  };

  private definedType = (field: FieldDefinitionNode): boolean => {
    const typeName = unwrapType(field.type).name.value;
    if (SCALARS.includes(typeName)) {
      return true;
    }
    return this.doc.definitions.some((def) => def.kind === Kind.OBJECT_TYPE_DEFINITION && def.name.value === typeName);
  };
}

export const prune = (doc: DocumentNode): DocumentNode => {
  const p = new Pruner(doc);
  return p.prune();
};
