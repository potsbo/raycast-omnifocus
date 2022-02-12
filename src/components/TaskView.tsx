import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useMemo } from "react";
import { runQuery } from "../api/fetch";
import { TaskList } from "./TaskList";

export interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
  containingProject?: {
    id: string;
    name: string;
  } | null;
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
              getter={() =>
                runQuery("GetTasksInProject", { projectId: p.id }).then((r) =>
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  r.defaultDocument.projects.byId!.rootTask.tasks.edges.map((e) => e.node)
                )
              }
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
