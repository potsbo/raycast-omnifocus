import { Kind, StringValueNode } from "graphql";

export const stringValue = (value: string | undefined): StringValueNode | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return {
    kind: Kind.STRING,
    value: value,
    block: true,
  };
};
