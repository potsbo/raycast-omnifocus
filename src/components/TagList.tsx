import { Icon, List, ActionPanel } from "@raycast/api";
import { getNestedTags } from "../api";
import { useLoad } from "../utils";

export const TagList = () => {
  const folders = useLoad(getNestedTags, "TagListView");

  return (
    <List isLoading={folders.isLoading}>
      {folders.value?.map((f) => (
        <List.Section title={f.tagName} key={f.id}>
          {f.tags?.map((p) => {
            return <List.Item title={p.name} key={p.id} icon={Icon.List} />;
          })}
        </List.Section>
      ))}
    </List>
  );
};
