import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { runQuery } from "../api/fetch";
import { useLoad } from "../utils";
import { TaskList } from "./TaskList";

const getAllProjects = async () => {
  const { folders, projects } = await runQuery("GetTopLevelProjects", {}).then((r) => r.application.defaultDocument);

  const fs = folders.edges.map((e) => e.node).concat({ name: "Top Level Projects", projects, id: "Manual" });
  return fs
    .map((f) => {
      return { ...f, projects: f.projects.edges.map((e) => e.node).filter((p) => !p.completed) };
    })
    .filter((f) => f.projects.length > 0);
};

export const ProjectList = () => {
  const folders = useLoad(getAllProjects, "ProjectListView:All");
  const { push } = useNavigation();

  return (
    <List isLoading={folders.isLoading}>
      {folders.value?.map((f) => (
        <List.Section title={f.name} key={f.id}>
          {f.projects?.map((p) => {
            return (
              <List.Item
                keywords={[f.name]}
                title={p.name}
                subtitle={`${p.numberOfAvailableTasks} available`}
                key={p.id}
                icon={Icon.List}
                actions={
                  <ActionPanel>
                    <ActionPanel.Item
                      title="Show Detail"
                      onAction={() =>
                        push(
                          <TaskList
                            title={"Tasks in Project"}
                            getter={() =>
                              runQuery("GetTasksInProject", { projectId: p.id }).then(
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                (t) => t.application.defaultDocument.projects.byId!.rootTask.tasks.edges.map((e) => e.node)
                              )
                            }
                            cacheKey={`TaskInProject:${p.id}`}
                            disableShowInProjects={true}
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
