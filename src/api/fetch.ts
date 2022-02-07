import { graphql, buildSchema, ExecutionResult } from "graphql";
import { GraphQLClient, Variables, RequestDocument } from "graphql-request";
import { print } from "graphql/language/printer";
import { resolver } from ".";
import { useLoad } from "../utils";
import { getSdk } from "./generated/graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

// TODO load from files
const schema = loadSchemaSync(join(__dirname, "assets", "schema.graphql"), {
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
