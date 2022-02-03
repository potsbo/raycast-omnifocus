import { ActionPanel, Detail, List, PushAction, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { omniFunc, getTasksForPerspective } from "@jacobx1/of-sdk";

interface Perspective {
  title: string;
  tasksPromise: Promise<Task[]>;
}

interface Task {
  id: string;
  name: string;
}

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList = (props: TaskListProps) => {
  const { tasks } = props;
  const [loadedTasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const resolve = async () => {
      const resolved = await tasks;
      setTasks(resolved);
    };
    resolve();
  });
  return (
    <List>
      {loadedTasks.map((t) => (
        <List.Item
          title={t.name}
          key={t.id}
          actions={
            <ActionPanel>
              <PushAction title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
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

export default function Command() {
  const { push } = useNavigation();
  const [perspectives, setPerspectives] = useState<Perspective[]>();
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
    <List isLoading={perspectives === undefined}>
      {perspectives?.map((p) => (
        <List.Item
          title={p.title}
          key={p.title}
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
