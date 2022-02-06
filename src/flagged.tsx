import { List } from "@raycast/api";
import { getAllTasks } from "./api";
import { TaskView } from "./components/TaskView";
import { useLoad } from "./utils";

export default function Command() {
  const tasks = useLoad(getAllTasks, "AllTasks");

  return (
    <List isLoading={tasks.isLoading}>
      {tasks.value?.map((t) => {
        return <TaskView task={t} key={t.id} />;
      })}
    </List>
  );
}
