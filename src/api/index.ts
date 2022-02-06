import { run } from "@jxa/run";

const wrap = <T>(fn: () => T) => {
  return async () => {
    return await run<T>(fn);
  };
};

declare const Application: (_: "OmniFocus") => OmniFocus;

interface DefaultDocument {
  perspectiveNames: () => string[];
  inboxTasks: {
    (): Task[];
    push: (_: Task) => number;
  };
  projects: {
    (): Project[];
    byId: (id: string) => Project | undefined;
  };
  folders: {
    (): Folder[];
  };
  tags: {
    (): Tag[];
    byId: (id: string) => Tag | undefined;
  };
  flattenedTasks: {
    (): Task[];
  };
}

interface TagProperties {
  id: string;
  name: string;
  note: string;
}

type Tag = AppleScriptClass<TagProperties> & {
  tags: {
    (): Tag[];
  };
  tasks: () => Task[];
};

interface FolderProperties {
  name: string;
  id: string;
}

type Folder = AppleScriptClass<FolderProperties> & {
  projects: {
    (): Project[];
    byId: (id: string) => Project;
  };
};

interface OmniFocus {
  defaultDocument: DefaultDocument;
  Task: (_: Partial<TaskProperties>) => Task;
}

type Status = "active status" | "on hold status" | "done status" | "dropped status";

interface ProjectProperties {
  effectiveStatus: Status;
  completedByChildren: boolean;
  lastReviewDate: string;
  id: string;
  nextReviewDate: string;
  shouldUseFloatingTimeZone: boolean;
  effectiveDeferDate: string | null;
  repetition: unknown;
  blocked: boolean;
  defaultSingletonActionHolder: boolean;
  primaryTag: unknown;
  modificationDate: string;
  numberOfCompletedTasks: 0;
  effectiveDueDate: string | null;
  effectivelyDropped: boolean;
  repetitionRule: unknown;
  effectivelyCompleted: boolean;
  completionDate: unknown;
  folder: unknown;
  pcls: "project";
  completed: boolean;
  reviewInterval: { unit: string; steps: number; fixed: boolean };
  dueDate: unknown;
  deferDate: unknown;
  name: string;
  sequential: boolean;
  flagged: boolean;
  singletonActionHolder: boolean;
  nextDueDate: unknown;
  note: string;
  creationDate: string;
  nextDeferDate: unknown;
  numberOfTasks: number;
  numberOfAvailableTasks: number;
  estimatedMinutes: unknown;
  dropped: boolean;
  droppedDate: unknown;
  status: Status;
}

type Functionalized<Type> = {
  properties: () => Type;
};

type AppleScriptClass<Type> = {
  [Property in keyof Type]: () => Type[Property];
} & Functionalized<Type>;

type Project = AppleScriptClass<ProjectProperties> & {
  rootTask: () => Task;
};

interface TaskProperties {
  nextDeferDate: unknown;
  flagged: boolean;
  shouldUseFloatingTimeZone: boolean;
  nextDueDate: unknown;
  effectivelyDropped: boolean;
  modificationDate: string;
  completionDate: string;
  sequential: boolean;
  completed: boolean;
  repetitionRule: unknown;
  numberOfCompletedTasks: 0;
  estimatedMinutes: unknown;
  numberOfTasks: 0;
  repetition: unknown;
  note: string;
  creationDate: string;
  dropped: boolean;
  blocked: boolean;
  inInbox: boolean;
  pcls: "inboxTask";
  next: boolean;
  numberOfAvailableTasks: 0;
  primaryTag: unknown;
  name: string;
  containingProject: Project;
  effectiveDueDate: string | null;
  parentTask: unknown;
  completedByChildren: boolean;
  effectiveDeferDate: unknown;
  deferDate: unknown;
  id: string;
  droppedDate: unknown;
  dueDate: unknown;
  effectivelyCompleted: boolean;
}

type Task = AppleScriptClass<TaskProperties> & { tasks: () => Task[] };

export const getPerspectivesNames = wrap(() => {
  const app = Application("OmniFocus");
  return app.defaultDocument.perspectiveNames();
});

export const getInboxTasks = wrap(() => {
  const app = Application("OmniFocus");
  return app.defaultDocument.inboxTasks().map((t) => {
    return {
      id: t.id(),
      name: t.name(),
      completed: t.completed(),
      containingProjectId: t.containingProject()?.id(),
      flagged: t.flagged(),
    };
  });
});

export const getTasksInProject = (projectId: string) => {
  const fn = (pid: string) => {
    const project = Application("OmniFocus").defaultDocument.projects.byId(pid);
    if (project === undefined) {
      return [];
    }
    return project
      .rootTask()
      .tasks()
      .map((t) => {
        return {
          id: t.id(),
          name: t.name(),
          completed: t.completed(),
          containingProjectId: t.containingProject()?.id(),
          flagged: t.flagged(),
        };
      });
  };
  return () => {
    return run<ReturnType<typeof fn>>(fn, projectId);
  };
};

export const getTasksWithTag = (tagId: string) => {
  const fn = (pid: string) => {
    const tag = Application("OmniFocus").defaultDocument.tags.byId(pid);
    if (tag === undefined) {
      return [];
    }
    return tag.tasks().map((t) => {
      return {
        id: t.id(),
        name: t.name(),
        completed: t.completed(),
        containingProjectId: t.containingProject()?.id(),
        flagged: t.flagged(),
      };
    });
  };
  return () => {
    return run<ReturnType<typeof fn>>(fn, tagId);
  };
};

export const getProjects = wrap(() => {
  const app = Application("OmniFocus");
  const ps = app.defaultDocument.projects();
  const ret = ps.map((t) => {
    return { id: t.id(), name: t.name(), completed: t.completed(), availableTaskCount: t.numberOfAvailableTasks() };
  });
  return ret;
});

export const getNestedTags = wrap(() => {
  return Application("OmniFocus")
    .defaultDocument.tags()
    .map((f) => {
      return {
        tagName: f.name(),
        id: f.id(),
        tags: f.tags().map((t) => {
          return {
            name: t.name(),
            id: t.id(),
          };
        }),
      };
    });
});

export const getNestedProjects = wrap(() => {
  return Application("OmniFocus")
    .defaultDocument.folders()
    .map((f) => {
      return {
        folderName: f.name(),
        folderId: f.id(),
        projects: f.projects().map((p) => {
          return {
            name: p.name(),
            completed: p.completed(),
            id: p.id(),
            availableTaskCount: p.numberOfAvailableTasks(),
          };
        }),
      };
    });
});

export const createNewTask = (task: { name: string }) => {
  const fn = (param: { name: string }) => {
    const app = Application("OmniFocus");
    const doc = app.defaultDocument;
    const taskObject = app.Task(param);
    doc.inboxTasks.push(taskObject);
    return;
  };
  return run<ReturnType<typeof fn>>(fn, task);
};

export const getForecast = wrap(() => {
  const app = Application("OmniFocus");
  const doc = app.defaultDocument;

  return doc
    .flattenedTasks()
    .filter((t) => !t.completed() && t.effectiveDueDate() !== null)
    .map((t) => {
      return {
        id: t.id(),
        name: t.name(),
        effectiveDueDate: t.effectiveDueDate(),
        completed: t.completed(),
        effectivelyCompleted: t.effectivelyCompleted(),
        containingProjectId: t.containingProject()?.id(),
        flagged: t.flagged(),
      };
    });
});

// TODO: merge with getForecast
export const getAllTasks = wrap(() => {
  const app = Application("OmniFocus");
  const doc = app.defaultDocument;

  return doc.flattenedTasks().map((t) => {
    return {
      id: t.id(),
      name: t.name(),
      effectiveDueDate: t.effectiveDueDate(),
      completed: t.completed(),
      effectivelyCompleted: t.effectivelyCompleted(),
      containingProjectId: t.containingProject()?.id(),
      flagged: t.flagged(),
    };
  });
});
