import { List } from "@raycast/api";
import { useLoad, onlyAvailable } from "../utils";
import { TaskView, TaskViewModel } from "./TaskView";

interface Props {
  getter: () => Promise<TaskViewModel[]>;
  cacheKey: string;
  disableShowInProjects?: boolean;
  title: string;
}

export const TaskList = ({ getter, cacheKey, disableShowInProjects, title }: Props) => {
  const { value: items, isLoading } = useLoad(onlyAvailable(getter), cacheKey);

  return (
    <List isLoading={isLoading} navigationTitle={title}>
      {items?.map((t) => (
        <TaskView task={t} disableShowInProjects={disableShowInProjects} key={t.id} />
      ))}
    </List>
  );
};
