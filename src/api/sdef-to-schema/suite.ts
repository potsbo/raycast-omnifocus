import { ClassRenderer } from "./class";
import { EnumRenderer } from "./enumeration";
import { ExtensionRenderer } from "./extension";
import { RecordTypeRenderer } from "./recordType";
import { Suite } from "./sdef";

const parseSuite = (
  s: Suite
): {
  classRenderers: ClassRenderer[];
  extensionRenderers: ExtensionRenderer[];
  recordTypeRenderers: RecordTypeRenderer[];
  enumRenderers: EnumRenderer[];
} => {
  const extensionRenderers = (s["class-extension"] ?? []).map((c) => new ExtensionRenderer(c));
  const classRenderers = (s.class ?? []).map((c) => new ClassRenderer(c));
  const recordTypeRenderers = (s["record-type"] ?? []).map((c) => new RecordTypeRenderer(c));
  const enumRenderers = (s.enumeration ?? []).map((e) => new EnumRenderer(e));
  return { classRenderers, extensionRenderers, recordTypeRenderers, enumRenderers };
};

export const parseSuites = (
  ss: Suite[]
): {
  classRenderers: ClassRenderer[];
  extensionRenderers: ExtensionRenderer[];
  recordTypeRenderers: RecordTypeRenderer[];
  enumRenderers: EnumRenderer[];
} => {
  return ss.map(parseSuite).reduce(
    (
      acum: {
        classRenderers: ClassRenderer[];
        extensionRenderers: ExtensionRenderer[];
        recordTypeRenderers: RecordTypeRenderer[];
        enumRenderers: EnumRenderer[];
      },
      cur
    ) => {
      return {
        classRenderers: acum.classRenderers.concat(cur.classRenderers),
        extensionRenderers: acum.extensionRenderers.concat(cur.extensionRenderers),
        recordTypeRenderers: acum.recordTypeRenderers.concat(cur.recordTypeRenderers),
        enumRenderers: acum.enumRenderers.concat(cur.enumRenderers),
      };
    },
    { classRenderers: [], extensionRenderers: [], recordTypeRenderers: [], enumRenderers: [] }
  );
};
