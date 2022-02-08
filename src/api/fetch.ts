import { graphql, ExecutionResult } from "graphql";
import { GraphQLClient, Variables, RequestDocument } from "graphql-request";
import { print } from "graphql/language/printer";
import { resolver } from ".";
import { useLoad } from "../utils";
import { getSdk } from "./generated/graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

export const schema = loadSchemaSync(join(__dirname, "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

export const fetch = async <TData, TVariables extends { readonly [variable: string]: unknown }>(
  query: string,
  variableValues?: TVariables
) => {
  const { data, errors } = (await graphql({
    schema,
    source: query,
    rootValue: resolver.Query,
    variableValues,
  })) as any as ExecutionResult<TData>;
  if (data === null || data === undefined) {
    console.error(errors);
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
  args: Parameters<ReturnType<typeof getSdk>[Q]>[0] = {}
) => {
  type Result = ReturnType<ReturnType<typeof getSdk>[Q]>;
  const fn = getSdk(client)[queryName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getter: () => any = () => fn(args);
  return useLoad<Awaited<Result>>(getter, `${queryName}:${JSON.stringify(args)}`);
};

