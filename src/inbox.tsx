import { List } from "@raycast/api";
import { useQuery } from "./api/fetch";
import { TaskView } from "./components/TaskView";

export const Inbox = () => {
  const res = useQuery("GetInboxTasks");

  return (
    <List isLoading={res.isLoading} navigationTitle={"Inbox"}>
      {res.value?.defaultDocument.inboxTasks.edges.map((t) => {
        const task = t.node;
        return <TaskView task={task} key={task.id} />;
      })}
    </List>
  );
};

export default function Command() {
  return <Inbox />;
}
