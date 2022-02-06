import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getNestedProjects, getProjects, getTasksInProject } from "../api";
import { useLoad } from "../utils";
import { TaskList } from "./TaskList";

const getAllProjects = async () => {
  const folders = await getNestedProjects();
  const projects = await getProjects();
  const fs = folders.concat({ folderName: "Top Level Projects", projects, folderId: "Manual" });
  return fs
    .map((f) => {
      return { ...f, projects: f.projects.filter((p) => !p.completed) };
    })
    .filter((f) => f.projects.length > 0);
};

export const ProjectList = () => {
  const folders = useLoad(getAllProjects, "ProjectListView:All");
  const { push } = useNavigation();

  return (
    <List isLoading={folders.isLoading}>
      {folders.value?.map((f) => (
        <List.Section title={f.folderName} key={f.folderId}>
          {f.projects?.map((p) => {
            return (
              <List.Item
                title={p.name}
                subtitle={`${p.availableTaskCount} available`}
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
                            getter={getTasksInProject(p.id)}
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
