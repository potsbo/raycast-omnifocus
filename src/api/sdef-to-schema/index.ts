import { exec } from "child_process";
import { promisify } from "util";
import { parseStringPromise } from "xml2js";
import { print, lexicographicSortSchema, buildASTSchema, DocumentNode, DefinitionNode } from "graphql";
import { pruneSchema } from "@graphql-tools/utils";
import { Sdef } from "./sdef";
import { ConnectionInterface, EdgeInterface, NodeInterface } from "./constants";
import gql from "graphql-tag";
import { prune } from "./prune";
import { parseSuites } from "./suite";
import { readFile } from "fs";

const getBuilders = async (appPath: string) => {
  const sdefCmdResult = await promisify(exec)(`sdef ${appPath}`);
  const sdef = (await parseStringPromise(sdefCmdResult.stdout)) as Sdef;
  return parseSuites(sdef);
};

const getBuildersFromFile = async (filepath: string) => {
  const content = await promisify(readFile)(filepath);
  const sdef = (await parseStringPromise(content.toString())) as Sdef;
  return parseSuites(sdef);
};

export const build = async (appPath: string, override?: DocumentNode) => {
  let { builders, includes } = await getBuilders(appPath);
  while (includes.length > 0) {
    for (const i of includes) {
      const { builders: bs, includes: is } = await getBuildersFromFile(i);
      includes = is;
      builders = [...builders, ...bs];
    }
  }

  const env = { builders, override };

  const definitions: DefinitionNode[] = [ConnectionInterface, EdgeInterface, NodeInterface];
  builders.forEach((b) => {
    definitions.push(...b.build(env));
  });

  const schema = gql`
    type Query {
      application: Application!
    }
    type Mutation

    ${definitions.map(print).join("\n")}

    # https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
    type PageInfo {
      hasPreviousPage: Boolean!
      hasNextPage: Boolean!
      startCursor: String!
      endCursor: String!
    }

    directive @recordType on OBJECT
    directive @extractFromObjectDisplayName on FIELD_DEFINITION

    input Condition {
      enabled: Boolean! = true
      field: String
      operands: [Condition!]
      operator: String! = "="
      value: String! = "true"
    }

    ${override ? print(override) : ""}
  `;

  return lexicographicSortSchema(pruneSchema(buildASTSchema(prune(schema))));
};
