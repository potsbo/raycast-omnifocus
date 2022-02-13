const projects = () => {
  return [...Array(10).keys()].map((i) => {
    const projecId = `project-id-${i}`;
    const projectName = `project-name-${i}`;
    return {
      name: () => projectName,
      id: () => projecId,
      rootTask: () => {
        return {
          name: () => `rootTask-for-${projectName}`,
          id: () => `rootTask-for-${projecId}`,
          effectiveDueDate: () => null,
          completed: () => false,
          effectivelyCompleted: () => false,
          containingProject: () => {
            return {
              id: () => projecId,
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
    rootTask: () => {
      return {
        tasks: () => [
          {
            name: () => "foo",
            id: () => "bar",
            effectiveDueDate: () => null,
            completed: () => false,
            effectivelyCompleted: () => false,
            containingProject: () => {
              return {
                id: () => pid,
                name: () => "projectName",
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
};
