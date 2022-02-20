import express from "express";
import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { build } from "../api/sdef-to-schema";
import { printSchema } from "graphql";
import { buildRootValue } from "../api/rootValue";
import { basename } from "path";
import { runJXACode } from "@jxa/run";

const [verb, appPath, ..._] = process.argv.slice(2);

build(appPath).then((schema) => {
  switch (verb) {
    case "dump":
      console.log(printSchema(schema));
      return;
    case "serve": {
      const app = express();
      const appName = basename(appPath).split(".").slice(0, -1).join(".");
      const rootValue = buildRootValue(appName, runJXACode);
      app.use("/graphql", graphqlHTTP({ schema, rootValue }));
      app.use("/playground", expressPlayground({ endpoint: "/graphql" }));
      app.listen(4000);
      console.log("Running a GraphQL API server at http://localhost:4000/graphql");
    }
  }
});
