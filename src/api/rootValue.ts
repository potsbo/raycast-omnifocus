import { GraphQLResolveInfo } from "graphql";
import { genQuery } from "./query";

export const buildRootValue = (appName: string, runner: (code: string) => unknown) => {
  return new Proxy(
    {},
    {
      get: function (_, name: string) {
        if (name === "application") {
          return (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
            const q = genQuery(appName, info);
            return runner(q);
          };
        }
      },
    }
  );
};