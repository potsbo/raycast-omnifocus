import { DefinitionNode, DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode } from "graphql";
import { validateSDL } from "graphql/validation/validate";
import { unwrapType } from "../../graphql-utils";

const SCALARS = ["Int", "Float", "String", "Boolean", "ID"];

const isNonNull = <T>(t: T | null): t is T => {
  return t !== null;
};

class Pruner {
  private readonly doc: DocumentNode;
  constructor(doc: DocumentNode) {
    this.doc = doc;
  }

  prune = (): DocumentNode => {
    const doc = { ...this.doc, definitions: this.doc.definitions.map(this.pruneDefinition).filter(isNonNull) };
    const errors = validateSDL(doc);
    if (errors.length === 0) {
      return doc;
    }
    // TODO: may need to introduce max depth
    return new Pruner(doc).prune();
  };

  private pruneDefinition = (def: DefinitionNode): DefinitionNode | null => {
    switch (def.kind) {
      case Kind.OBJECT_TYPE_DEFINITION:
        return this.pruneObjectTypeDefinition(def);
      default:
        throw new Error(`Unsupported definition kind ${def.kind}`);
    }
  };

  private pruneObjectTypeDefinition = (def: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode | null => {
    const fields = def.fields?.filter(this.definedType);
    if ((fields?.length ?? 0) === 0) {
      return null;
    }
    return { ...def, fields };
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
