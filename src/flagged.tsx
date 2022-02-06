import { List } from "@raycast/api";
import { GraphQLClient, Variables, RequestDocument } from "graphql-request";
import { getSdk } from "./api/generated/graphql";
import { TaskView } from "./components/TaskView";
import { useLoad } from "./utils";
import { fetch as runQuery } from "./api/fetch";
import { print } from "graphql/language/printer";

function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === "string") return document;
  return print(document);
}

class MyClient extends GraphQLClient {
  async request<T, V = Variables>(document: RequestDocument, variables?: V): Promise<T> {
    const query = resolveRequestDocument(document);
    const res = runQuery<T, Readonly<V>>(query, variables);
    return res;
  }
}

const client = new MyClient("");

const useFlagged = <Q extends keyof ReturnType<typeof getSdk>>(
  queryName: Q,
  variables?: Parameters<ReturnType<typeof getSdk>[Q]>[0]
) => {
  const getter = () => getSdk(client)[queryName](variables);
  return useLoad(getter, "GetFlaggedAvailableTasks");
};

export default function Command() {
  const res = useFlagged("GetFlaggedTasks", { flagged: true, available: true });

  return (
    <List isLoading={res.isLoading}>
      {res.value?.flattenedTasks.map((t) => {
        return <TaskView task={t} key={t.id} />;
      })}
    </List>
  );
}
