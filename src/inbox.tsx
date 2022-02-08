import { List } from "@raycast/api";
import { useQuery } from "./api/fetch";
import { TaskView } from "./components/TaskView";

export const Inbox = () => {
  const res = useQuery("GetInboxTasks");

  return (
    <List isLoading={res.isLoading} navigationTitle={"Inbox"}>
      {res.value?.inboxTasks.map((t) => {
        return <TaskView task={t} key={t.id} />;
      })}
    </List>
  );
};

export default function Command() {
  return <Inbox />;
}
