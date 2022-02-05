import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getProjects, getTasksInProject } from "../api";
import { useLoad, onlyAvailable } from "../utils";
import { TaskList } from "./TaskList";

export const ProjectList = () => {
  const { value: projects, isLoading } = useLoad(onlyAvailable(getProjects));
  const { push } = useNavigation();

  return (
    <List isLoading={isLoading}>
      {projects?.map((p) => (
        <List.Item
          title={p.name}
          key={p.id}
          icon={p.completed ? Icon.Checkmark : Icon.Circle}
          actions={
            <ActionPanel>
              <ActionPanel.Item title="Push" onAction={() => push(<TaskList getter={getTasksInProject(p.id)} />)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};
