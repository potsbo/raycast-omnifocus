import { ActionPanel, Form, SubmitFormAction, Icon, showToast, ToastStyle } from "@raycast/api";
import { useMemo } from "react";
import { useQuery } from "../api/fetch";

interface Props {
  defaultProject: string;
  defaultTags: string[];
}

interface FormFields {
  name: string;
  note: string;
  tags: string[];
  project: string;
}

export const NewTaskForm = ({ defaultProject, defaultTags }: Props) => {
  const tp = useQuery("GetTaskCreationSupportInfo");
  const tags = tp.value?.application.defaultDocument.tags.edges.map((e) => e.node);
  const folders = tp.value?.application.defaultDocument.folders.edges.map((e) => e.node);

  const tagOptions = useMemo<JSX.Element[]>(() => {
    if (tags === undefined) {
      return [];
    }
    const opts: JSX.Element[] = [];
    tags.forEach((f) => {
      f.tags.edges
        .map((e) => e.node)
        .forEach((t) => {
          opts.push(<Form.TagPicker.Item key={t.id} value={t.id} title={`${f.name}: ${t.name}`} icon={Icon.Pin} />);
        });
    });
    return opts;
  }, [tags]);

  const projectsOptions = useMemo<JSX.Element[]>(() => {
    const opts: JSX.Element[] = [<Form.Dropdown.Item value="inbox" key="inbox" title={`Inbox`} icon={Icon.Envelope} />];

    if (folders === undefined) {
      return opts;
    }
    folders.forEach((f) => {
      f.projects.edges
        .map((e) => e.node)
        .forEach((t) => {
          opts.push(<Form.Dropdown.Item key={t.id} value={t.id} title={`${f.name}: ${t.name}`} icon={Icon.List} />);
        });
    });
    return opts;
  }, [folders]);

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction
            title="Submit Description"
            onSubmit={async (values: FormFields) => {
              showToast(ToastStyle.Animated, "Creating");
              console.log(values);
              showToast(ToastStyle.Success, "Created");
            }}
          />
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
