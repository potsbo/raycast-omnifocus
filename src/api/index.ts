import { run } from "@jxa/run";
import { GraphQLResolveInfo } from "graphql";
import { QueryResolvers, Resolvers } from "./generated/graphql";
import { genQuery } from "./query";
import camelCase from "camelcase";

// The rootValue provides a resolver function for each API endpoint
const rootValue: QueryResolvers = {
  defaultDocument: (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);

    const fn = (arg: { q: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const t = Application("OmniFocus");

      return eval(arg.q);
    };

    return run(fn, { q });
  },
};

const push = (typeName: string, props: unknown, info: GraphQLResolveInfo) => {
  const fieldName = camelCase(typeName);
  const q = genQuery("t", info);
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

  return run(fn, { props: JSON.stringify(props), q });
};

const query = new Proxy(rootValue, {
  get: function (target, name: string) {
    if (name === "defaultDocument") {
      return target[name];
    }

    return function (props: Record<string, any>, _2: unknown, info: GraphQLResolveInfo) {
      const { returnType } = info;
      // TODO correctly extract return type
      const typeName = (returnType as any).ofType.name;
      push(typeName, props, info);
    };
  },
});

export const resolvers: Resolvers = {
  Query: query,
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
