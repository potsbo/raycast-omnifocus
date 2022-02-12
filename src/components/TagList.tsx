import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { runQuery, useQuery } from "../api/fetch";
import { TaskList } from "./TaskList";

export const TagList = () => {
  const folders = useQuery("GetNestedTags");
  const { push } = useNavigation();

  return (
    <List isLoading={folders.isLoading}>
      {folders.value?.defaultDocument.tags.edges.map(({ node: f }) => (
        <List.Section title={f.name} key={f.id}>
          {f.tags.edges.map(({ node: p }) => {
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
                              runQuery("GetTasksWithTag", { tagId: p.id }).then((r) =>
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
