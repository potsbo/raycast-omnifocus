import { graphql, GraphQLResolveInfo, print } from "graphql";
import { defaultDocument } from "../__utils__/defaultDocument";
import { QueryResolvers } from "../generated/graphql";
import { genQuery } from "../query";
import gql from "graphql-tag";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

export const schema = loadSchemaSync(join(__dirname, "..", "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const rootValue: QueryResolvers = {
  defaultDocument: (_: unknown, _2: unknown, info: GraphQLResolveInfo) => {
    const q = genQuery("t", info);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const t = defaultDocument;
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
            }
          }
        }
      }
    }
  `;
  const { data, errors } = await graphql({
    schema,
    source: print(document),
    rootValue: rootValue,
  });

  if (errors !== null && errors !== undefined) {
    fail();
  }
  expect(data).toMatchSnapshot();
});
