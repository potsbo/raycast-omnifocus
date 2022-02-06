import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useMemo } from "react";
import { getTasksInProject } from "../api";
import { TaskList } from "./TaskList";

export interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
  containingProject?:
    | {
        id: string;
        name: string;
      }
    | null;
  flagged: boolean;
}

type Props = {
  task: TaskViewModel;
  disableShowInProjects?: boolean;
};

export const TaskView = ({ task, disableShowInProjects }: Props) => {
  const { push } = useNavigation();

  const viewInProject = useMemo(() => {
    if (disableShowInProjects) {
      return null;
    }
    const p = task.containingProject;
    if (typeof p === "undefined" || p === null) {
      return null;
    }
    return (
      <ActionPanel.Item
        title="View in Project"
        onAction={() =>
          push(
            <TaskList
              title={p.name}
              getter={getTasksInProject(p.id)}
              cacheKey={`ProjectTaskList:${p.id}`}
              disableShowInProjects={true}
            />
          )
        }
      />
    );
  }, [task]);

  return (
    <List.Item
      title={task.name}
      key={task.id}
      icon={task.completed ? Icon.Checkmark : Icon.Circle}
      accessoryTitle={task.flagged ? "Flagged" : undefined}
      accessoryIcon={task.flagged ? Icon.Star : undefined}
      actions={<ActionPanel>{viewInProject}</ActionPanel>}
    />
  );
};
