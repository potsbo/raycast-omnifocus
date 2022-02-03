import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { omniFunc, getTasksForPerspective, completeTaskById, Task } from "@jacobx1/of-sdk";

interface Perspective {
  title: string;
  tasksPromise: Promise<Task[]>;
}

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList = (props: TaskListProps) => {
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

export const getPerspectives = omniFunc(function () {
  return this.Perspective.all;
}, {});

const getIconForPerspective = (name: string) => {
  switch (name) {
    case "Inbox": {
      return Icon.Envelope;
    }
    case "Projects": {
      return Icon.Desktop;
    }
    case "Tags": {
      return Icon.Pin;
    }
    case "Forecast": {
      return Icon.Calendar;
    }
    case "Flagged": {
      return Icon.Star;
    }
    case "Review": {
      return Icon.Hammer;
    }
    default: {
      return Icon.Document;
    }
  }
};

const defaultPerspectives = ["Inbox", "Projects", "Tags", "Forecast", "Flagged", "Review"];

const fromName = (name: string) => {
  return { title: name, tasksPromise: getTasksForPerspective(name) };
};

export default function Command() {
  const { push } = useNavigation();
  const [perspectives, setPerspectives] = useState<Perspective[]>(defaultPerspectives.map((n) => fromName(n)));
  useEffect(() => {
    const loadPerspectives = async () => {
      const perspectives: ({ name: string } | null)[] = await getPerspectives();

      const items: Perspective[] = [];
      perspectives.forEach((p) => {
        if (p === null) {
          return;
        }
        // TODO: prefetch tasks
        items.push({ title: p.name, tasksPromise: getTasksForPerspective(p.name) });
      });
      setPerspectives(items);
    };
    loadPerspectives();
  }, []);

  return (
    <List>
      {perspectives.map((p) => (
        <List.Item
          title={p.title}
          key={p.title}
          icon={getIconForPerspective(p.title)}
          actions={
            <ActionPanel>
              <ActionPanel.Item title="Push" onAction={() => push(<TaskList tasks={p.tasksPromise} />)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
