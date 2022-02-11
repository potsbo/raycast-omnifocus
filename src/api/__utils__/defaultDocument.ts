const projects = () => {
  return Array.from({ length: 10 }).map((i) => {
    const projecId = `project-id-${i}`
    const projectName = `project-name-${i}`
    return {
      name: () => projectName,
      id: () => projecId,
      rootTask: () => {
        return {
          name: () => `rootTask-for-${projectName}`,
          id: () => `rootTask-for-${projecId}`,
          effectiveDueDate: () => null,
          completed: () => false,
          effectivelyCompleted: () => null,
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

projects.byId = () => {
  return {
    rootTask: (pid: string) => {
      return {
        tasks: () => [
          {
            name: () => "foo",
            id: () => "bar",
            effectiveDueDate: () => null,
            completed: () => false,
            effectivelyCompleted: () => null,
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
