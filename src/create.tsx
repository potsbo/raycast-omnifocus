import { NewTaskForm } from "./components/NewTaskForm";

export default function Command() {
  return <NewTaskForm defaultProject={"inbox"} defaultTags={[]} />;
}
