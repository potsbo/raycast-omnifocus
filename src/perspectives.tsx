import { ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { ProjectList } from "./components/ProjectList";
import { TagList } from "./components/TagList";
import { Forecast } from "./components/Forecast";
import { Inbox } from "./inbox";
import { useQuery } from "./api/fetch";

const getIconForPerspective = (name: string) => {
  switch (name) {
    case "Inbox": {
      return Icon.Envelope;
    }
    case "Projects": {
      return Icon.List;
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

export default function Command() {
  const { push } = useNavigation();
  const { value, isLoading } = useQuery("GetPerspectiveNames");

  return (
    <List isLoading={isLoading}>
      {value?.defaultDocument.perspectiveNames
        .filter((p) => p !== "")
        .map((p) => (
          <List.Item
            title={p}
            key={p}
            icon={getIconForPerspective(p)}
            actions={
              <ActionPanel>
                <ActionPanel.Item
                  title="Show Detail"
                  onAction={() =>
                    push(
                      p === "Projects" ? (
                        <ProjectList />
                      ) : p === "Inbox" ? (
                        <Inbox />
                      ) : p === "Tags" ? (
                        <TagList />
                      ) : p === "Forecast" ? (
                        <Forecast />
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
