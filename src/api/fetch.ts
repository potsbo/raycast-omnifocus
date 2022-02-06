import { graphql, buildSchema, ExecutionResult } from "graphql";
import { GraphQLClient, Variables, RequestDocument } from "graphql-request";
import { print } from "graphql/language/printer";
import { rootValue } from ".";
import { useLoad } from "../utils";
import { getSdk } from "./generated/graphql";

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

function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === "string") return document;
  return print(document);
}

class MyClient extends GraphQLClient {
  async request<T, V = Variables>(document: RequestDocument, variables?: V): Promise<T> {
    const query = resolveRequestDocument(document);
    const res = fetch<T, Readonly<V>>(query, variables);
    return res;
  }
}

const client = new MyClient("");

export const useQuery = <Q extends keyof ReturnType<typeof getSdk>>(
  queryName: Q,
  variables?: Parameters<ReturnType<typeof getSdk>[Q]>[0]
) => {
  const getter = () => getSdk(client)[queryName](variables);
  return useLoad(getter, `${queryName}:${JSON.stringify(variables)}`);
};
