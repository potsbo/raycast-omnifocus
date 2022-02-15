import { GraphQLResolveInfo } from "graphql";
import { genQuery } from "./query";
import camelCase from "camelcase";

const MUTATION_TYPES = ["push"] as const;
type MutationType = typeof MUTATION_TYPES[number];

const splitMutationName = (name: string): [MutationType, string] => {
  for (const mut of MUTATION_TYPES) {
    if (name.startsWith(mut)) {
      return [mut, camelCase(name.slice(mut.length), { pascalCase: true })];
    }
  }

  throw new Error(`Failed to infer mutation type for ${name}`);
};

export const buildRootValue = (appName: string, runner: (code: string) => Promise<unknown>) => {
  return new Proxy(
    {},
    {
      get: function (_, name: string) {
        // query
        if (name === "application") {
          return (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
            const code = genQuery(appName, info);
            return runner(code);
          };
        }

        // mutation
        return (args: unknown, _2: unknown, info: GraphQLResolveInfo) => {
          const [mut, typeName] = splitMutationName(info.fieldName);
          const objName = "obj";
          const q = genQuery(appName, info, objName);

          // TODO: not to hardcode defaultDocument here
          const code = `
              const app = Application("${appName}");
              const ${objName} = app.${typeName}(${JSON.stringify(args)});
              app.defaultDocument().${camelCase(typeName)}s.${mut}(${objName});
              ${q}
          `;
          return runner(code);
        };
      },
    }
  );
};
