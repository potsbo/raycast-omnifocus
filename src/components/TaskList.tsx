import { Icon, List } from "@raycast/api";
import { useLoad, onlyAvailable } from "../utils";

interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
}

interface Props {
  getter: () => Promise<TaskViewModel[]>;
}


export const TaskList = ({ getter }: Props) => {
  const { value: items, isLoading } = useLoad(onlyAvailable(getter));

  return (
    <List isLoading={isLoading}>
      {items?.map((t) => (
        <List.Item title={t.name} key={t.id} icon={t.completed ? Icon.Checkmark : Icon.Circle} />
      ))}
    </List>
  );
};
