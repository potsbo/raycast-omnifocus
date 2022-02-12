import { FieldNode, Kind, ObjectValueNode, ValueNode } from "graphql";

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

const LOGICAL_OPERATORS = ["_and", "_or", "_not"] as const;

type MatchOperator = typeof MATCH_OPERATORS[number];
type LogicalOperator = typeof LOGICAL_OPERATORS[number];

type Condition =
  | {
      kind: "MATCH";
      field: string;
      operator: MatchOperator;
      value: string;
      enabled: boolean;
    }
  | {
      kind: "LOGICAL";
      operator: LogicalOperator;
      children: Condition[];
      enabled: boolean;
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

const getLogicalOperator = (op: string): LogicalOperator | null => {
  if (LOGICAL_OPERATORS.indexOf(op as LogicalOperator) > -1) {
    return op as LogicalOperator;
  }
  if (LOGICAL_OPERATORS.indexOf(`_${op}` as LogicalOperator) > -1) {
    return `_${op}` as LogicalOperator;
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

const extractConditionFromValueNode = (condition: ValueNode): Condition => {
  if (condition.kind !== Kind.OBJECT) {
    throw new Error("malformed conditions");
  }

  const enabled = mustExtractBoolArg(condition, "enabled", true);
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
      enabled,
    };
  }

  const logicalOp = getLogicalOperator(operator);
  if (logicalOp) {
    const childrenNode = condition.fields.find((f) => f.name.value === "children")?.value;
    if (!childrenNode || childrenNode.kind !== Kind.LIST) {
      throw new Error("malformed conditions");
    }

    return {
      kind: "LOGICAL",
      operator: logicalOp,
      children: childrenNode.values.map((f) => {
        if (f.kind !== Kind.OBJECT) {
          throw new Error("malformed conditions");
        }
        return extractConditionFromValueNode(f);
      }),
      enabled,
    };
  }

  throw new Error(`Unknown operator ${operator}`);
};

export const extractCondition = (f: FieldNode): Condition | null => {
  const d = f.directives?.find((d) => d.name.value === "whose");
  if (!d) {
    return null;
  }
  const condition = d.arguments?.find((a) => a.name.value === "condition")?.value;
  if (!condition) {
    throw new Error("malformed conditions");
  }

  return extractConditionFromValueNode(condition);
};

const filterPresent = <T>(x: T | null): x is T => {
  return x !== null && x !== undefined;
};

const reduce = (c: Condition | null): Condition | null => {
  if (c === null) {
    return null;
  }
  if (!c.enabled) {
    return null;
  }
  if (c.kind === "MATCH") {
    return c;
  }

  const reducedChildren = c.children.map(reduce).filter(filterPresent);
  if (reducedChildren.length === 0) {
    return null;
  }
  switch (c.operator) {
    case "_not":
      return { ...c, children: reducedChildren };
    case "_and":
    case "_or":
      if (reducedChildren.length === 1) {
        return reducedChildren[0];
      }
      return { ...c, children: reducedChildren };
  }
};

const compileCondition = (whose: Condition): string => {
  if (whose.kind === "LOGICAL") {
    const children = `[${whose.children.map(compileCondition).join(",")}]`;
    return `{ ${whose.operator}: ${children}}`;
  }
  return `{ ${whose.field}: { ${whose.operator}: ${whose.value}}}`;
};

export const compileWhoseParam = (whose: Condition | null): string => {
  const reduced = reduce(whose);
  if (reduced === null) {
    return "";
  }

  return `.whose(${compileCondition(reduced)})`;
};
