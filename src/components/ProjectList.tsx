import { Icon, List } from "@raycast/api";
import { getProjects } from "../api";
import { useLoad } from "../utils";

export const ProjectList = () => {
  const projects = useLoad(getProjects);

  return (
    <List isLoading={projects === undefined}>
      {projects?.map((p) => (
        <List.Item title={p.name} key={p.id} icon={p.completed ? Icon.Checkmark : Icon.Circle} />
      ))}
    </List>
  );
};
