import { runJXACode } from "@jxa/run";
import { graphql, ExecutionResult } from "graphql";
import { GraphQLClient, Variables, RequestDocument } from "graphql-request";
import { print } from "graphql/language/printer";
import { useLoad } from "../utils";
import { getSdk } from "./generated/graphql";
import { buildRootValue } from "./rootValue";
import { schema } from "./schema";

const rootValue = buildRootValue("OmniFocus", runJXACode);
class MyClient extends GraphQLClient {
  async request<T, V = Variables>(document: RequestDocument, variables?: Readonly<V>): Promise<T> {
    const source = typeof document === "string" ? document : print(document);

    const { data, errors } = (await graphql({
      schema,
      source,
      rootValue,
      variableValues: variables,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any as ExecutionResult<T>;
    if (data === null || data === undefined || errors !== undefined) {
      console.error(errors);
      throw errors;
    }
    return data;
  }
}

const client = new MyClient("");

export const runQuery = <Q extends keyof ReturnType<typeof getSdk>, Result = ReturnType<ReturnType<typeof getSdk>[Q]>>(
  queryName: Q,
  args: Parameters<ReturnType<typeof getSdk>[Q]>[0] = {}
): Result => {
  const fn = getSdk(client)[queryName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return fn(args as any) as any;
};

export const useQuery = <Q extends keyof ReturnType<typeof getSdk>>(
  queryName: Q,
  args: Parameters<ReturnType<typeof getSdk>[Q]>[0] = {}
) => {
  type Result = ReturnType<ReturnType<typeof getSdk>[Q]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getter: () => any = () => runQuery(queryName, args);
  return useLoad<Awaited<Result>>(getter, `${queryName}:${JSON.stringify(args)}`);
};
