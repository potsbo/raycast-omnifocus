import { Icon, List, useNavigation } from "@raycast/api";
import { useMemo } from "react";
import { getForecast, getNestedProjects } from "../api";
import { useLoad } from "../utils";

interface TaskViewModel {
  name: string;
  id: string;
  completed: boolean;
  effectivelyCompleted: boolean;
  containingProjectId: string | undefined;
}

type ForecastableTask = TaskViewModel & { effectiveDueDate: string | null };

export const Forecast = () => {
  const tasks = useLoad(getForecast, "ForecastView");
  const dates: { date: string; tasks: { id: string; name: string }[] }[] = useMemo(() => {
    if (tasks.value === undefined) {
      return [];
    }

    const groups: Record<string, ForecastableTask[]> = {};
    tasks.value.forEach((t) => {
      if (t.effectiveDueDate === null || t.effectivelyCompleted) {
        return;
      }
      const d = new Date(t.effectiveDueDate!);
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
            return <List.Item title={t.name} key={t.id} icon={Icon.List} />;
          })}
        </List.Section>
      ))}
    </List>
  );
};
