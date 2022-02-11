const projects = () => {
  return Array.from({ length: 10 }).map((i) => {
    return {
      name: () => `name-${i}`,
      id: () => `id-${i}`,
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
