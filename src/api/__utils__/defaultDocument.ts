const projects = () => {
  return [...Array(10).keys()].map((i) => {
    const projecId = `project-id-${i}`;
    const projectName = `project-name-${i}`;
    return {
      properties: () => ({ pcls: "Project" }),
      name: () => projectName,
      getDisplayString: () => `Application("OmniFocus").defaultDocument.projects.byId("${projecId}")`,
      rootTask: () => {
        return {
          name: () => `rootTask-for-${projectName}`,
          getDisplayString: () => `Application("OmniFocus").defaultDocument.tasks.byId("rootTask-for-${projecId}")`,
          effectiveDueDate: () => null,
          completed: () => false,
          effectivelyCompleted: () => false,
          containingProject: () => {
            return {
              getDisplayString: () => `Application("OmniFocus").defaultDocument.projects.byId("${projecId}")`,
              name: () => projectName,
            };
          },
          flagged: () => false,
          effectiveDeferDate: () => null,
        };
      },
    };
  });
};

projects.byId = (pid: string) => {
  return {
    properties: () => ({
      pcls: "Project",
    }),
    rootTask: () => {
      return {
        tasks: () => [
          {
            properties: () => ({ pcls: "Task" }),
            name: () => "foo",
            getDisplayString: () => `Application("OmniFocus").defaultDocument.tasks.byId("bar")`,
            effectiveDueDate: () => null,
            completed: () => false,
            effectivelyCompleted: () => false,
            containingProject: () => {
              return {
                getDisplayString: () => `Application("OmniFocus").defaultDocument.projects.byId("${pid}")`,
                name: () => "projectName",
                properties: () => ({
                  pcls: "Project",
                }),
              };
            },
            flagged: () => false,
            effectiveDeferDate: () => null,
          },
        ],
      };
    },
  };
};

export const defaultDocument = {
  projects,
  inboxTasks: [],
};
