import { run } from "@jxa/run";
import { GraphQLResolveInfo } from "graphql";
import { Resolvers } from "./generated/graphql";
import { genQuery } from "./query";
import camelCase from "camelcase";

export const buildRootValue = (runner: <T>(fn: (_: T) => unknown, args: T) => unknown) => {
  return new Proxy(
    {},
    {
      get: function (_, name: string) {
        if (name === "application") {
          return (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
            const q = genQuery("t", "OmniFocus", info);

            const fn = (arg: { q: string }) => {
              return eval(arg.q);
            };

            return runner(fn, { q });
          };
        }

        return (typeName: string, props: unknown, info: GraphQLResolveInfo) => {
          const fieldName = camelCase(typeName);
          const q = genQuery("t", "OmniFocus", info);
          const mut = `
          const app = Application("OmniFocus");
          const obj = app.${typeName}(${JSON.stringify(props)});
          app.defaultDocument.${fieldName}.push(obj);
        `;

          const fn = (arg: { mut: string; q: string }) => {
            eval(mut);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const t = Application("OmniFocus").defaultDocument;
            return eval(arg.q);
          };

          return runner(fn, { mut, q });
        };
      },
    }
  );
};

export const resolvers: Resolvers = {
  Query: buildRootValue(run),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Application: (_: "OmniFocus") => any;

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
