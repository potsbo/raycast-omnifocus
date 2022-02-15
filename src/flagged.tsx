import { List } from "@raycast/api";
import { TaskView } from "./components/TaskView";
import { useQuery } from "./api/fetch";

export default function Command() {
  const res = useQuery("GetTasks", { onlyFlagged: true, onlyAvailable: true });

  return (
    <List isLoading={res.isLoading}>
      {res.value?.application.defaultDocument?.flattenedTasks?.edges.map(({ node: t }) => {
        return <TaskView task={t} key={t.id} />;
      })}
    </List>
  );
}
