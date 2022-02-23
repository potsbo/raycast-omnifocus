import { buildExecutionContext, ExecutionContext } from "graphql/execution/execute";
import {
  GetInboxTasksDocument,
  GetTasksDocument,
  GetTasksInProjectDocument,
  GetTopLevelProjectsDocument,
} from "../generated/graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { genQuery } from "../query";
import prettier from "prettier";
import { GraphQLError } from "graphql";
import gql from "graphql-tag";

const schema = loadSchemaSync(join(__dirname, "..", "..", "..", "assets", "schema.graphql"), {
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
    variableValues: { onlyFlagged: true, onlyAvailable: true },
  }) as ExecutionContext;

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for GetTasksDocument for forecast", () => {
  const document = GetTasksDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
    variableValues: { withEffectiveDueDate: true, onlyAvailable: true },
  }) as ExecutionContext;

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for GetInboxTasksDocument", () => {
  const document = GetInboxTasksDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  }) as ExecutionContext;

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
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

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for GetTopLevelProjects", () => {
  const document = GetTopLevelProjectsDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
    variableValues: { projectId: "foobar" },
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query for Connection", () => {
  const document = gql`
    query Hoge {
      application {
        defaultDocument {
          projects {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                name
              }
            }
          }
        }
      }
    }
  `;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query with inline fragment", () => {
  const document = gql`
    query {
      application {
        defaultDocument {
          folders {
            edges {
              node {
                name
                sections {
                  edges {
                    node {
                      ... on Project {
                        completed
                      }
                      ... on Folder {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query with project interface", () => {
  const document = gql`
    query {
      application {
        defaultDocument {
          projects {
            byId(id: "hZoaSakOnG4") {
              rootTask {
                id
              }
            }
          }
        }
      }
    }
  `;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});

test("query with pageInfo", () => {
  const document = gql`
    query {
      application {
        defaultDocument {
          projects(first: 10, after: "SOME-ID") {
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
    }
  `;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  });
  if (!validateExecontext(exeContext)) {
    fail();
  }

  expect(prettier.format(genQuery("OmniFocus", exeContext), { parser: "babel" })).toMatchSnapshot();
});
