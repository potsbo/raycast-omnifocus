import express from "express";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { resolvers } from "../api/index";
import { join } from "path";
import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";

export const schema = loadSchemaSync(join(__dirname, "..", "..", "assets", "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const app = express();
app.use("/graphql", graphqlHTTP({ schema, rootValue: resolvers.Query }));
app.use("/playground", expressPlayground({ endpoint: "/graphql" }));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
