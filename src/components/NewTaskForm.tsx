import { ActionPanel, Form, SubmitFormAction, Icon } from "@raycast/api";
import { useMemo } from "react";
import { getNestedProjects, getNestedTags } from "../api";
import { useLoad } from "../utils";

const getProjectsAndTags = async () => {
  const tags = await getNestedTags();
  const projects = await getNestedProjects();
  return { tags, projects };
};

interface Props {
  defaultProject: string;
  defaultTags: string[];
}

export const NewTaskForm = ({ defaultProject, defaultTags }: Props) => {
  const tp = useLoad(getProjectsAndTags, "NewTask:TagsAndProjects");
  const tags = tp.value?.tags;
  const projects = tp.value?.projects;

  const tagOptions = useMemo<JSX.Element[]>(() => {
    if (tags === undefined) {
      return [];
    }
    const opts: JSX.Element[] = [];
    tags.forEach((f) => {
      f.tags.forEach((t) => {
        opts.push(<Form.TagPicker.Item key={t.id} value={t.id} title={`${f.tagName}: ${t.name}`} icon={Icon.Pin} />);
      });
    });
    return opts;
  }, [tags]);

  const projectsOptions = useMemo<JSX.Element[]>(() => {
    const opts: JSX.Element[] = [<Form.Dropdown.Item value="inbox" key="inbox" title={`Inbox`} icon={Icon.Envelope} />];

    if (projects === undefined) {
      return opts;
    }
    projects.forEach((f) => {
      f.projects.forEach((t) => {
        opts.push(<Form.Dropdown.Item key={t.id} value={t.id} title={`${f.folderName}: ${t.name}`} icon={Icon.List} />);
      });
    });
    return opts;
  }, [projects]);

  console.log(projectsOptions.length);

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction title="Submit Description" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="name" title="Task" />
      <Form.TextArea id="note" title="Note" />

      <Form.TagPicker id="tags" title="Tags" defaultValue={defaultTags}>
        {tagOptions}
      </Form.TagPicker>
      <Form.Dropdown id="project" title="Project" defaultValue={defaultProject}>
        {projectsOptions}
      </Form.Dropdown>
    </Form>
  );
};
