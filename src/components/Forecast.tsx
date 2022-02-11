import { List } from "@raycast/api";
import { useMemo } from "react";
import { useQuery } from "../api/fetch";
import { TaskView, TaskViewModel } from "./TaskView";

type ForecastableTask = TaskViewModel & { effectiveDueDate?: string | null };

export const Forecast = () => {
  const tasks = useQuery("GetTasks", { withEffectiveDueDate: true, available: true });
  const dates: { date: string; tasks: TaskViewModel[] }[] = useMemo(() => {
    if (tasks.value === undefined) {
      return [];
    }

    const groups: Record<string, ForecastableTask[]> = {};
    tasks.value.defaultDocument.flattenedTasks.edges.forEach(({ node: t }) => {
      if (t.effectiveDueDate === null || t.effectiveDueDate === undefined || t.effectivelyCompleted) {
        return;
      }
      const d = new Date(t.effectiveDueDate);
      d.setHours(0, 0, 0, 0);
      const key = d.toDateString();

      if (groups[key] === undefined) {
        groups[key] = [];
      }
      groups[key].push(t);
    });

    return Object.keys(groups)
      .sort()
      .map((date) => {
        return { date, tasks: groups[date] };
      });
  }, [tasks]);

  return (
    <List isLoading={tasks.isLoading}>
      {dates.map((f) => (
        <List.Section title={f.date} key={f.date}>
          {f.tasks.map((t) => {
            return <TaskView task={t} key={t.id} />;
          })}
        </List.Section>
      ))}
    </List>
  );
};
