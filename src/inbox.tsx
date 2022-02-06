import { getInboxTasks } from "./api";
import { TaskList } from "./components/TaskList";

export default function Command() {
  return <TaskList getter={getInboxTasks} cacheKey={"InboxView"} title={"Inbox"} />;
}
