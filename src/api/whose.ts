import { FieldNode, Kind, ObjectValueNode } from "graphql";

const MATCH_OPERATORS = [
  "_equals",
  "_contains",
  "_beginsWith",
  "_endsWith",
  "_greaterThan",
  "_greaterThanEquals",
  "_lessThan",
  "_lessThanEquals",
  "_match",
] as const;

const LOGICAL_OPERATORS = [
  "_equals",
  "_contains",
  "_beginsWith",
  "_endsWith",
  "_greaterThan",
  "_greaterThanEquals",
  "_lessThan",
  "_lessThanEquals",
  "_match",
] as const;

type MatchOperator = typeof MATCH_OPERATORS[number];
type LogicalOperator = typeof LOGICAL_OPERATORS[number];

type Condition =
  | {
      kind: "MATCH";
      field: string;
      operator: MatchOperator;
      value: string;
    }
  | {
      kind: "LOGICAL";
      operator: LogicalOperator;
      children: Condition[];
    };

const getMatchOperator = (op: string): MatchOperator | null => {
  if (MATCH_OPERATORS.indexOf(op as MatchOperator) > -1) {
    return op as MatchOperator;
  }
  if (MATCH_OPERATORS.indexOf(`_${op}` as MatchOperator) > -1) {
    return `_${op}` as MatchOperator;
  }
  switch (op) {
    case "=":
      return "_equals";
    case ">":
      return "_greaterThan";
    case ">=":
      return "_greaterThanEquals";
    case "<":
      return "_lessThan";
    case "<=":
      return "_lessThanEquals";
  }
  return null;
};

const mustExtractBoolArg = (c: ObjectValueNode, key: string, defaultValue?: boolean): boolean => {
  const node = c.fields.find((d) => d.name.value === key)?.value;
  if (!node) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`argument ${key} not found`);
  }
  if (node.kind !== Kind.BOOLEAN) {
    throw new Error();
  }

  return node.value;
};

const mustExtractStringArg = (c: ObjectValueNode, key: string, defaultValue?: string): string => {
  const node = c.fields.find((d) => d.name.value === key)?.value;
  if (!node) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`argument ${key} not found`);
  }
  if (node.kind !== Kind.STRING) {
    throw new Error();
  }

  return node.value;
};

export const extractCondition = (f: FieldNode): Condition | null => {
  const d = f.directives?.find((d) => d.name.value === "whose");
  if (!d) {
    return null;
  }
  const condition = d.arguments?.find((a) => a.name.value === "condition")?.value;
  if (!condition || condition.kind !== Kind.OBJECT) {
    throw new Error("malformed conditions");
  }

  const enabled = mustExtractBoolArg(condition, "enabled", true);
  if (!enabled) {
    return null;
  }

  const operator = mustExtractStringArg(condition, "operation", "=");
  const matchOp = getMatchOperator(operator);
  if (matchOp) {
    const field = mustExtractStringArg(condition, "field");
    const value = mustExtractStringArg(condition, "value");
    return {
      kind: "MATCH",
      field,
      operator: matchOp,
      value,
    };
  }

  // TODO: logical filter
  return null;
};

export const compileWhoseParam = (whose: Condition | null): string => {
  if (whose === null) {
    return "";
  }
  if (whose.kind === "LOGICAL") {
    throw new Error("Not supported");
  }
  return `.whose({ ${whose.field}: { ${whose.operator}: ${JSON.stringify(whose.value)}}})`;
};
