import { buildExecutionContext, ExecutionContext } from "graphql/execution/execute";
import { GetInboxTasksDocument, GetTasksDocument, GetTasksInProjectDocument } from "./generated/graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { genQuery } from "./query";
import prettier from "prettier";
import { GraphQLError } from "graphql";

const schema = loadSchemaSync(join(__dirname, "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const validateExecontext = (obj: ExecutionContext | readonly GraphQLError[]): obj is ExecutionContext => {
  return "operation" in obj;
};

test("query for GetTasksDocument", () => {
  const document = GetTasksDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  }) as ExecutionContext;

  expect(prettier.format(genQuery("parent", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for GetInboxTasksDocument", () => {
  const document = GetInboxTasksDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  }) as ExecutionContext;

  expect(prettier.format(genQuery("parent", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for GetTasksInProjectDocument", () => {
  const document = GetTasksInProjectDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
    variableValues: { projectId: "foobar" },
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("parent", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("run for GetTasksInProjectDocument", () => {
  const document = GetTasksInProjectDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
    variableValues: { projectId: "foobar" },
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parent = {
    projects: {
      byId: () => {
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
      },
    },
  };
  expect(eval(genQuery("parent", exeContext))).toMatchSnapshot();
});
