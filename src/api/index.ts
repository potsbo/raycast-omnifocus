import { run } from "@jxa/run";
import { GraphQLResolveInfo } from "graphql";
import { QueryFlattenedTasksArgs, QueryResolvers, Resolvers } from "./generated/graphql";
import { genQuery } from "./query";

const wrap = <T>(fn: () => T) => {
  return async () => {
    return await run<T>(fn);
  };
};

// The rootValue provides a resolver function for each API endpoint
const rootValue: QueryResolvers = {
  flattenedTasks: (args: QueryFlattenedTasksArgs, _: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);

    const fn = (arg: QueryFlattenedTasksArgs & { q: string }) => {
      const app = Application("OmniFocus");
      const doc = app.defaultDocument;

      const applyAvailableFilter = (t: Task) => {
        const a = arg.available;
        if (a === null || a === undefined) {
          return true;
        }

        return !t.completed() === a;
      };

      const applyFlaggedFilter = (t: Task) => {
        const a = arg.flagged;
        if (a === null || a === undefined) {
          return true;
        }

        return t.flagged() === a;
      };
      const applyWithEffectiveDueDate = (t: Task) => {
        const a = arg.withEffectiveDueDate;
        if (a === null || a === undefined) {
          return true;
        }

        return (t.effectiveDueDate() !== null) === a;
      };

      return (
        doc
          .flattenedTasks()
          .slice(0, arg.limit !== null && arg.limit !== undefined ? arg.limit : -1)
          .filter(applyAvailableFilter)
          .filter(applyFlaggedFilter)
          .filter(applyWithEffectiveDueDate)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((t) => {
            return eval(arg.q);
          })
      );
    };

    return run(fn, { ...args, q });
  },
  inboxTasks: (_1: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);

    const fn = (arg: { q: string }) => {
      const app = Application("OmniFocus");
      const doc = app.defaultDocument;

      return (
        doc
          .inboxTasks()
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((t) => {
            return eval(arg.q);
          })
      );
    };

    return run(fn, { q });
  },
  defaultDocument: (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);

    const fn = (arg: { q: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const t = Application("OmniFocus").defaultDocument

      return eval(arg.q);
    };

    return run(fn, { q });
  },
};

export const resolver: Resolvers = {
  Query: rootValue,
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
          containingProject: t.containingProject()
            ? {
                name: t.containingProject()?.name(),
                id: t.containingProject()?.id(),
              }
            : undefined,
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
        containingProject: t.containingProject()
          ? {
              name: t.containingProject()?.name(),
              id: t.containingProject()?.id(),
            }
          : undefined,
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
