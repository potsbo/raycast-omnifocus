import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getNestedTags, getTasksWithTag } from "../api";
import { useLoad } from "../utils";
import { TaskList } from "./TaskList";

export const TagList = () => {
  const folders = useLoad(getNestedTags, "TagListView");
  const { push } = useNavigation();

  return (
    <List isLoading={folders.isLoading}>
      {folders.value?.map((f) => (
        <List.Section title={f.tagName} key={f.id}>
          {f.tags?.map((p) => {
            return (
              <List.Item
                title={p.name}
                key={p.id}
                icon={Icon.Pin}
                actions={
                  <ActionPanel>
                    <ActionPanel.Item
                      title="Show Detail"
                      onAction={() =>
                        push(<TaskList getter={getTasksWithTag(p.id)} cacheKey={`TasksWithTag:${p.id}`} />)
                      }
                    />
                  </ActionPanel>
                }
              />
            );
          })}
        </List.Section>
      ))}
    </List>
  );
};
