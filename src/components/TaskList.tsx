import { Icon, List } from "@raycast/api";
import { useLoad } from "../utils";

interface Props {
  getter: () => Promise<{ name: string; id: string; completed: boolean }[] | undefined>;
}

export const TaskList = ({ getter }: Props) => {
  const items = useLoad(getter);
  if (items) {
    console.log(JSON.stringify(items[0]))
  }

  return (
    <List isLoading={items === undefined}>
      {items?.map((t) => (
        <List.Item title={t.name} key={t.id} icon={t.completed ? Icon.Checkmark : Icon.Circle} />
      ))}
    </List>
  );
};
