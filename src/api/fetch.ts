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

export function fetch<TData, TVariables>(
  _endpoint: string,
  _requestInit: unknown,
  query: string,
  _variables?: TVariables
) {
  return async (): Promise<TData> => {
    const json = (await graphql({ schema, source: query, rootValue })) as any as ExecutionResult<TData>;

    return json.data!;
  };
}
