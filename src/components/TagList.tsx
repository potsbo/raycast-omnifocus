import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useMemo } from "react";
import { runQuery, useQuery } from "../api/fetch";
import { GetNestedTagsQuery } from "../api/generated/graphql";
import { TaskList } from "./TaskList";

interface Props {
  tagId?: string;
}

interface NestedTagsViewModel {
  id?: string;
  name?: string; // Title
  tags: {
    edges: {
      node: {
        name: string; // Folder
        id: string;
        availableTaskCount: number;
        tags: {
          edges: {
            node: {
              name: string; // ITem
              id: string;
              availableTaskCount: number;
              tags: {
                edges: {
                  node: {
                    id: string; // children count
                  };
                }[];
              };
            };
          }[];
        };
      };
    }[];
  };
}
export const TagList = ({ tagId }: Props) => {
  // TODO: untagged
  // TODO: show folder level tagged tasks

  const queryName = tagId ? "GetNestedTagsFrom" : "GetNestedTags";
  // TODO not to use non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const folders = useQuery(queryName, { tagId: tagId! });
  const { push } = useNavigation();

  const root = useMemo((): NestedTagsViewModel | undefined => {
    if (folders.value === undefined) {
      return undefined;
    }
    const { tags } = folders.value.defaultDocument;
    if ("byId" in tags) {
      return tags.byId ?? undefined;
    }

    return { tags: tags as GetNestedTagsQuery["defaultDocument"]["tags"] };
  }, [folders.value]);

  return (
    <List isLoading={folders.isLoading} navigationTitle={root?.name}>
      {root?.tags.edges.map(({ node: f }) => (
        <List.Section title={f.name} key={f.id} subtitle={`${f.availableTaskCount} available`}>
          {f.tags.edges.map(({ node: p }) => {
            return (
              <List.Item
                keywords={[f.name]}
                title={p.name}
                key={p.id}
                icon={p.tags.edges.length > 0 ? Icon.List : Icon.Pin}
                subtitle={`${p.availableTaskCount} available`}
                actions={
                  <ActionPanel>
                    {p.tags.edges.length > 0 ? (
                      <ActionPanel.Item title="Show Detail" onAction={() => push(<TagList tagId={f.id} />)} />
                    ) : (
                      <ActionPanel.Item
                        title="Show Tasks"
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
                    )}
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
