import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getNestedProjects, getTasksInProject } from "../api";
import { useLoad } from "../utils";
import { TaskList } from "./TaskList";

export const ProjectList = () => {
  const { value: folders, isLoading } = useLoad(getNestedProjects, "ProjectListView");
  const { push } = useNavigation();

  return (
    <List isLoading={isLoading}>
      {folders?.map((f) => (
        <List.Section title={f.folderName}>
          {f.projects?.map((p) => {
            return (
              <List.Item
                title={p.name}
                key={p.id}
                icon={p.completed ? Icon.Checkmark : Icon.Circle}
                actions={
                  <ActionPanel>
                    <ActionPanel.Item
                      title="Push"
                      onAction={() =>
                        push(<TaskList getter={getTasksInProject(p.id)} cacheKey={`TaskInProject:${p.id}`} />)
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
