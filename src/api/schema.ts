import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

export const schema = loadSchemaSync(join(__dirname, "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});
