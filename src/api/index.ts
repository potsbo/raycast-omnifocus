import { run } from "@jxa/run";
import { GraphQLResolveInfo } from "graphql";
import { QueryResolvers, Resolvers } from "./generated/graphql";
import { genQuery } from "./query";

// The rootValue provides a resolver function for each API endpoint
const rootValue: QueryResolvers = {
  defaultDocument: (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);

    const fn = (arg: { q: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const t = Application("OmniFocus").defaultDocument;

      return eval(arg.q);
    };

    return run(fn, { q });
  },
};

export const resolvers: Resolvers = {
  Query: rootValue,
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
