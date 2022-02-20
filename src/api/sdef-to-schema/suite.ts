import { ClassBuilder } from "./class";
import { EnumBuilder } from "./enumeration";
import { ExtensionBuilder } from "./extension";
import { RecordTypeBuilder } from "./recordType";
import { Sdef, Suite } from "./sdef";

const parseSuite = (
  s: Suite
): {
  classBuilders: ClassBuilder[];
  extensionBuilders: ExtensionBuilder[];
  recordTypeBuilders: RecordTypeBuilder[];
  enumBuilders: EnumBuilder[];
} => {
  const extensionBuilders = (s["class-extension"] ?? []).map((c) => new ExtensionBuilder(c));
  const classBuilders = (s.class ?? []).map((c) => new ClassBuilder(c));
  const recordTypeBuilders = (s["record-type"] ?? []).map((c) => new RecordTypeBuilder(c));
  const enumBuilders = (s.enumeration ?? []).map((e) => new EnumBuilder(e));
  return { classBuilders, extensionBuilders, recordTypeBuilders, enumBuilders };
};

export const parseSuites = (
  sdef: Sdef
): Readonly<{
  classBuilders: ClassBuilder[];
  extensionBuilders: ExtensionBuilder[];
  recordTypeBuilders: RecordTypeBuilder[];
  enumBuilders: EnumBuilder[];
}> => {
  const ss = sdef.dictionary.suite;
  return ss.map(parseSuite).reduce(
    (
      acum: {
        classBuilders: ClassBuilder[];
        extensionBuilders: ExtensionBuilder[];
        recordTypeBuilders: RecordTypeBuilder[];
        enumBuilders: EnumBuilder[];
      },
      cur
    ) => {
      return {
        classBuilders: acum.classBuilders.concat(cur.classBuilders),
        extensionBuilders: acum.extensionBuilders.concat(cur.extensionBuilders),
        recordTypeBuilders: acum.recordTypeBuilders.concat(cur.recordTypeBuilders),
        enumBuilders: acum.enumBuilders.concat(cur.enumBuilders),
      };
    },
    { classBuilders: [], extensionBuilders: [], recordTypeBuilders: [], enumBuilders: [] }
  );
};
