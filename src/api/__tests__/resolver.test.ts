import { graphql, print } from "graphql";
import { defaultDocument } from "../__utils__/defaultDocument";
import { GetTasksInProjectDocument } from "../generated/graphql";
import gql from "graphql-tag";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { buildRootValue } from "../rootValue";

export const schema = loadSchemaSync(join(__dirname, "..", "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fail(reason: any) {
  throw new Error(reason);
}

const rootValue = buildRootValue("OmniFocus", (query) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Application = (_: string) => ({
    defaultDocument: () => defaultDocument,
    InboxTask: (props: Record<string, unknown>) => {
      return Object.fromEntries(Object.entries(props).map(([k, v]) => [k, () => v]));
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Automation = {
    getDisplayString: (obj: { getDisplayString: () => string }) => {
      console.log(obj.getDisplayString());
      return obj.getDisplayString();
    },
  };

  return new Promise((resolve) => resolve(JSON.parse(eval(query)).result));
});

test("Resolve Connection Related Query", async () => {
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
                rootTask {
                  name
                  id
                  containingProject {
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data, errors } = await graphql({
    schema,
    source: print(document),
    rootValue,
  });

  if (errors !== null && errors !== undefined) {
    fail(errors);
  }
  expect(data).toMatchSnapshot();
});

test("run for GetTasksInProjectDocument", async () => {
  const document = GetTasksInProjectDocument;
  const { data, errors } = await graphql({
    schema,
    source: print(document),
    rootValue,
    variableValues: { projectId: "some-project-id" },
  });

  if (errors !== null && errors !== undefined) {
    fail(errors);
  }

  expect(data).toMatchSnapshot();
});

test("simple mutation", async () => {
  const document = gql`
    mutation {
      pushInboxTask(name: "SomeTask") {
        name
      }
    }
  `;
  const { data, errors } = await graphql({
    schema,
    source: print(document),
    rootValue,
  });

  if (errors !== null && errors !== undefined) {
    fail(errors);
  }
  expect(data).toMatchSnapshot();
});
