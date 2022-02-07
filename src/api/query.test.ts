import { buildExecutionContext, ExecutionContext } from "graphql/execution/execute";
import { GetTasksDocument } from "./generated/graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { genQuery } from "./query";

const schema = loadSchemaSync(join(__dirname, "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

test("query for GetTasksDocument", () => {
  const document = GetTasksDocument;
  const exeContext = buildExecutionContext({
    schema: schema,
    document: document,
  }) as ExecutionContext;

  expect(genQuery("parent", exeContext)).toMatchSnapshot();
});
