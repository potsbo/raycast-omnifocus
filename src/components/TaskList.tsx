import { Icon, List, ActionPanel, useNavigation } from "@raycast/api";
import { getTasksInProject } from "../api";
import { useLoad, onlyAvailable } from "../utils";

interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
  containingProjectId: string | undefined;
}

interface Props {
  getter: () => Promise<TaskViewModel[]>;
  cacheKey: string;
  disableShowInProjects?: boolean;
}

export const TaskList = ({ getter, cacheKey, disableShowInProjects }: Props) => {
  const { push } = useNavigation();
  const { value: items, isLoading } = useLoad(onlyAvailable(getter), cacheKey);

  return (
    <List isLoading={isLoading}>
      {items?.map((t) => (
        <List.Item
          title={t.name}
          key={t.id}
          icon={t.completed ? Icon.Checkmark : Icon.Circle}
          actions={
            <ActionPanel>
              {!disableShowInProjects && t.containingProjectId !== undefined && (
                <ActionPanel.Item
                  title="View in Project"
                  onAction={() =>
                    push(
                      <TaskList
                        getter={getTasksInProject(t.containingProjectId!)}
                        cacheKey={`${cacheKey}:InProject:`}
                      />
                    )
                  }
                />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};
