import { graphql, buildSchema, ExecutionResult } from "graphql";
import { rootValue } from ".";

// TODO load from files
export const schema = buildSchema(`
type Project {
  name: String!
  id: String!
}

type Task {
  name: String!
  id: String!
  effectiveDueDate: String
  completed: Boolean!
  effectivelyCompleted: Boolean!
  containingProject: Project
  flagged: Boolean!
}

  type Query {
    flattenedTasks(available: Boolean, flagged: Boolean, limit: Int): [Task]!
  }
`);

export const fetch = async <TData, TVariables extends { readonly [variable: string]: unknown }>(
  query: string,
  variableValues?: TVariables
) => {
  console.log("running...");
  const { data, errors } = (await graphql({
    schema,
    source: query,
    rootValue,
    variableValues,
  })) as any as ExecutionResult<TData>;
  if (data === null || data === undefined) {
    throw errors;
  }
  return data;
};
