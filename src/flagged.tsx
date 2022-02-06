import { List } from "@raycast/api";
import { TaskView } from "./components/TaskView";
import { useQuery } from "./api/fetch";

export default function Command() {
  const res = useQuery("GetFlaggedTasks", { flagged: true, available: true });

  return (
    <List isLoading={res.isLoading}>
      {res.value?.flattenedTasks.map((t) => {
        return <TaskView task={t} key={t.id} />;
      })}
    </List>
  );
}
