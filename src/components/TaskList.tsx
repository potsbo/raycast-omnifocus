import { Icon, List } from "@raycast/api";
import { useLoad, onlyAvailable } from "../utils";

interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
}

interface Props {
  getter: () => Promise<TaskViewModel[]>;
  cacheKey: string;
}

export const TaskList = ({ getter, cacheKey }: Props) => {
  const { value: items, isLoading } = useLoad(onlyAvailable(getter), cacheKey);

  return (
    <List isLoading={isLoading}>
      {items?.map((t) => (
        <List.Item title={t.name} key={t.id} icon={t.completed ? Icon.Checkmark : Icon.Circle} />
      ))}
    </List>
  );
};
