import {
  DefinitionNode,
  DocumentNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  NameNode,
  TypeNode,
} from "graphql";
import { validateSDL } from "graphql/validation/validate";
import { unwrapType } from "../../graphql-utils";

const SCALARS = ["Int", "Float", "String", "Boolean", "ID"];

const isNonNull = <T>(t: T | null): t is T => {
  return t !== null;
};

type NamedWithFields = DefinitionNode & { fields?: any; name: NameNode };
class Pruner {
  private readonly doc: DocumentNode;
  constructor(doc: DocumentNode) {
    this.doc = doc;
  }

  prune = (depth = 100): DocumentNode => {
    const doc = { ...this.doc, definitions: this.doc.definitions.map(this.pruneDefinition).filter(isNonNull) };
    const errors = validateSDL(doc);
    if (errors.length === 0) {
      return doc;
    }
    if (depth === 0) {
      return doc;
    }
    // TODO: may need to introduce max depth
    return new Pruner(doc).prune(depth - 1);
  };

  private pruneInterfaces = <T extends DefinitionNode>(def: T | null): T | null => {
    if (def === null) {
      return null;
    }
    if ("interfaces" in def) {
      return { ...def, interfaces: def.interfaces?.filter(this.definedType) };
    }
    return def;
  };

  private pruneDefinition = (def: DefinitionNode): DefinitionNode | null => {
    const fs = [this.pruneInterfaces, this.pruneFields];

    let ret: DefinitionNode | null = def;
    fs.forEach((f) => {
      ret = f(ret);
    });
    return ret;
  };

  private collectExtendedFields = (def: NamedWithFields): readonly FieldDefinitionNode[] => {
    if (def.kind === Kind.OBJECT_TYPE_DEFINITION) {
      return this.doc.definitions
        .filter(
          (d): d is NamedWithFields =>
            (d.kind === Kind.OBJECT_TYPE_EXTENSION && d.name.value === def.name.value) ||
            (d.kind === Kind.OBJECT_TYPE_DEFINITION && d.name.value === def.name.value)
        )
        .map((d) => d.fields ?? [])
        .reduce((acum, cur) => [...acum, ...cur]);
    }

    if (def.kind === Kind.INTERFACE_TYPE_DEFINITION) {
      return this.doc.definitions
        .filter(
          (d): d is NamedWithFields =>
            (d.kind === Kind.INTERFACE_TYPE_DEFINITION && d.name.value === def.name.value) ||
            (d.kind === Kind.OBJECT_TYPE_EXTENSION && d.name.value === def.name.value)
        )
        .map((d) => d.fields ?? [])
        .reduce((acum, cur) => [...acum, ...cur]);
    }

    if (def.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION) {
      return this.doc.definitions
        .filter(
          (d): d is NamedWithFields =>
            (d.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION && d.name.value === def.name.value) ||
            (d.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION && d.name.value === def.name.value)
        )
        .map((d) => d.fields ?? [])
        .reduce((acum, cur) => [...acum, ...cur]);
    }
    return [];
  };

  private pruneFields = <T extends DefinitionNode>(def: T | null): T | null => {
    if (def === null) {
      return null;
    }
    if (!("name" in def)) {
      return def;
    }
    if (!("fields" in def)) {
      return def;
    }
    const fields = this.collectExtendedFields(def).filter(this.definedType).map(this.pruneArgs);
    if (fields.length === 0) {
      return null;
    }

    return { ...def, fields };
  };

  private pruneArgs = <T extends { arguments?: readonly InputValueDefinitionNode[] }>(def: T): T => {
    const args = def.arguments?.filter(this.definedType);
    return { ...def, arguments: args };
  };

  private definedType = (field: { type: TypeNode } | TypeNode): boolean => {
    const typeName = "type" in field ? unwrapType(field.type).name.value : field.name.value;
    if (SCALARS.includes(typeName)) {
      return true;
    }

    return this.doc.definitions.some(
      (def) =>
        (def.kind === Kind.OBJECT_TYPE_DEFINITION && def.name.value === typeName) ||
        (def.kind === Kind.INTERFACE_TYPE_DEFINITION && def.name.value === typeName) ||
        (def.kind === Kind.ENUM_TYPE_DEFINITION && def.name.value === typeName) ||
        (def.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION && def.name.value === typeName)
    );
  };
}

export const prune = (doc: DocumentNode): DocumentNode => {
  const p = new Pruner(doc);
  return p.prune();
};
