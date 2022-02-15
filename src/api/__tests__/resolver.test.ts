import { graphql, GraphQLResolveInfo, print } from "graphql";
import { defaultDocument } from "../__utils__/defaultDocument";
import { GetTasksInProjectDocument, QueryResolvers } from "../generated/graphql";
import { genQuery } from "../query";
import gql from "graphql-tag";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

export const schema = loadSchemaSync(join(__dirname, "..", "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fail(reason: any) {
  throw new Error(reason);
}

const rootValue: QueryResolvers = {
  defaultDocument: (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const t = { defaultDocument: () => defaultDocument };
    return eval(q);
  },
};

test("Resolve Connection Related Query", async () => {
  const document = gql`
    query Hoge {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parent = defaultDocument;
  expect(data).toMatchSnapshot();
});
