export interface Suite {
  $: {
    code: string;
    description: string;
    name: string;
  };
  command: unknown[];
  enumeration: unknown[];
  class?: ClassDefinition[];
  "record-type": unknown[];
  "value-type": unknown[];
  "class-extension": ClassExtensionDefinition[];
}

export interface ClassDefinition {
  $: {
    code: string;
    description: string;
    name: string;
    inherits?: string;
  };
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}

export interface ClassExtensionDefinition {
  $: {
    code: string;
    description: string;
    extends: string;
    inherits?: string;
  };
  property?: PropertyDefinition[];
  element?: ElementDefinition[];
  contents?: ContentDefinition[];
}

export type PropertyDefinition =
  | {
      $: {
        code: string;
        description: string;
        name: string;
        type: string;
      };
    }
  | {
      $: {
        code: string;
        description: string;
        name: string;
      };
      type: { $: { list?: "yes"; type: string } }[];
    };

export type ElementDefinition = {
  $: {
    description: string;
    type: string;
  };
  cocoa: [{ $: { key: string } }];
};

export type ContentDefinition = {
  $: {
    access: string;
    code: string;
    description: string;
    name: string;
    type: string;
  };
  cocoa: [{ $: unknown[] }];
};
