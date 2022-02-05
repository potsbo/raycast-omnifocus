import { Icon, List } from "@raycast/api";
import { useLoad, onlyAvailable } from "../utils";
import { TaskView, TaskViewModel } from "./TaskView";

interface Props {
  getter: () => Promise<TaskViewModel[]>;
  cacheKey: string;
  disableShowInProjects?: boolean;
}

export const TaskList = ({ getter, cacheKey, disableShowInProjects }: Props) => {
  const { value: items, isLoading } = useLoad(onlyAvailable(getter), cacheKey);

  return (
    <List isLoading={isLoading}>
      {items?.map((t) => (
        <TaskView task={t} disableShowInProjects={disableShowInProjects} />
      ))}
    </List>
  );
};
