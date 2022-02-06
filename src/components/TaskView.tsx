import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { getTasksInProject } from "../api";
import { TaskList } from "./TaskList";

export interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
  containingProjectId: string | undefined;
}

type Props = {
  task: TaskViewModel;
  disableShowInProjects?: boolean;
};

export const TaskView = ({ task, disableShowInProjects }: Props) => {
  const { push } = useNavigation();

  return (
    <List.Item
      title={task.name}
      key={task.id}
      icon={task.completed ? Icon.Checkmark : Icon.Circle}
      actions={
        <ActionPanel>
          {!disableShowInProjects && task.containingProjectId !== undefined && (
            <ActionPanel.Item
              title="View in Project"
              onAction={() =>
                push(
                  <TaskList
                    title={"Tasks in Project"} // TODO: show project name
                    getter={getTasksInProject(task.containingProjectId!)}
                    cacheKey={`ProjectTaskList:${task.containingProjectId!}`}
                    disableShowInProjects={true}
                  />
                )
              }
            />
          )}
        </ActionPanel>
      }
    />
  );
};
