import { ActionPanel, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { completeTaskById, Task } from "@jacobx1/of-sdk";

interface TaskListProps {
  tasks: Promise<Task[]>;
}

export const TaskList = (props: TaskListProps) => {
  const { tasks } = props;
  const [loadedTasks, setTasks] = useState<Task[]>();
  useEffect(() => {
    const resolve = async () => {
      const resolved = await tasks;
      setTasks(resolved);
    };
    resolve();
  });
  return (
    <List isLoading={loadedTasks === undefined}>
      {loadedTasks?.map((t) => (
        <List.Item
          title={t.name}
          key={t.id}
          icon={t.completed ? Icon.Checkmark : Icon.Circle}
          accessoryIcon={Icon.ArrowClockwise}
          actions={
            <ActionPanel>
              <ActionPanel.Item
                title="Mark as Completed"
                onAction={() => {
                  setTasks((prev) => {
                    if (prev === undefined) {
                      return;
                    }
                    const updated = [...prev];
                    const idx = updated.findIndex((p) => t.id === p.id);
                    updated[idx].completed = !updated[idx].completed;
                    return updated;
                  });
                  completeTaskById(t.id);
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};
