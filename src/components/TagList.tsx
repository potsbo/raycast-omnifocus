import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getNestedTags } from "../api";
import { get } from "../api/fetch";
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
                        push(
                          <TaskList
                            getter={() =>
                              get("GetTasksWithTag", { tagId: p.id }).then((r) =>
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                r.defaultDocument.tags.byId!.tasks.edges.map((e) => e.node)
                              )
                            }
                            cacheKey={`TasksWithTag:${p.id}`}
                            title={`Tasks tagged "${p.name}"`}
                          />
                        )
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
