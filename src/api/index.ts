import { runJXACode } from "@jxa/run";

import { Resolvers } from "./generated/graphql";
import { buildRootValue } from "./rootValue";

export const resolvers: Resolvers = {
  Query: buildRootValue("OmniFocus", runJXACode),
};
