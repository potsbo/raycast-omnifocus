import { run } from "@jxa/run";

const wrap = <T>(fn: () => T) => {
  return async () => {
    return await run<T>(fn);
  };
};

declare const Application: (_: "OmniFocus") => OmniFocus;

interface Document {
  perspectiveNames: () => [string[]];
  inboxTasks: () => [Task[]];
  projects: {
    (): [Project[]];
    byId: (id: string) => Project;
  };
  folders: {
    (): [Folder[]];
  };
}

interface FolderProperties {
  name: string;
}

type Folder = AppleScriptClass<FolderProperties> & {
  projects: {
    (): Project[];
    byId: (id: string) => Project;
  };
};

interface OmniFocus {
  document: Document;
  defaultDocument: Document;
}

type Status = "active status" | "on hold status" | "done status" | "dropped status";

interface ProjectProperties {
  effectiveStatus: Status;
  completedByChildren: boolean;
  lastReviewDate: string;
  id: string;
  nextReviewDate: string;
  shouldUseFloatingTimeZone: boolean;
  effectiveDeferDate: unknown;
  repetition: unknown;
  blocked: boolean;
  defaultSingletonActionHolder: boolean;
  primaryTag: unknown;
  modificationDate: string;
  numberOfCompletedTasks: 0;
  effectiveDueDate: unknown;
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
  containingProject: unknown;
  effectiveDueDate: unknown;
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
  return app.document.perspectiveNames()[0];
});

export const getInboxTasks = wrap(() => {
  const app = Application("OmniFocus");
  return app.document.inboxTasks()[0].map((t) => {
    return { id: t.id(), name: t.name(), completed: t.completed() };
  });
});

export const getTasksInProject = (projectId: string) => {
  return () => {
    return run<TaskProperties[]>((pid: string) => {
      const project = Application("OmniFocus").defaultDocument.projects.byId(pid);
      if (project === undefined) {
        return [];
      }
      return project
        .rootTask()
        .tasks()
        .map((t) => t.properties());
    }, projectId);
  };
};

export const getProjects = wrap(() => {
  const app = Application("OmniFocus");
  const ps = app.document.projects()[0];
  const ret = ps.map((t) => {
    return { id: t.id(), name: t.name(), completed: t.completed(), availableTaskCount: t.numberOfAvailableTasks() };
  });
  return ret;
});

export const getNestedProjects = wrap(() => {
  return Application("OmniFocus")
    .document.folders()[0]
    .map((f) => {
      return {
        folderName: f.name(),
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
