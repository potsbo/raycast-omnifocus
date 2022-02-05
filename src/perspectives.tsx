import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { ProjectList } from "./components/ProjectList";
import { getInboxTasks, getPerspectivesNames } from "./api";
import { useLoad } from "./utils";
import { TaskList } from "./components/TaskList";

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

const getPerspectives = async () => {
  const names = await getPerspectivesNames();
  return names
    .filter((n) => n)
    .map((n) => {
      return { title: n };
    });
};

export default function Command() {
  const { push } = useNavigation();

  const { value: perspectives, isLoading } = useLoad(getPerspectives, "PerspectiveListView");

  return (
    <List isLoading={isLoading}>
      {perspectives?.map((p) => (
        <List.Item
          title={p.title}
          key={p.title}
          icon={getIconForPerspective(p.title)}
          actions={
            <ActionPanel>
              <ActionPanel.Item
                title="Push"
                onAction={() =>
                  push(
                    p.title === "Projects" ? (
                      <ProjectList />
                    ) : p.title === "Inbox" ? (
                      <TaskList getter={getInboxTasks} cacheKey={"InboxView"} />
                    ) : (
                      <ProjectList />
                    )
                  )
                }
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
