import { DocumentNode, printSchema } from "graphql";
import { join } from "path";
import { build } from "../api/sdef-to-schema";
import prettier from "prettier";
import fs from "fs";
import gql from "graphql-tag";

const run = async (appPath: string, output: string, override?: DocumentNode) => {
  const schema = await build(appPath, override);
  const sortedSchema = printSchema(schema);
  const comment = `# Code generated by "sdef-to-schema"; DO NOT EDIT.\n`;

  fs.writeFile(output, prettier.format(comment + sortedSchema, { parser: "graphql" }), (err) => {
    if (err) {
      throw err;
    }
    console.log(`✅ Schemad generated`);
  });
};

const path = join(__dirname, "..", "..", "assets", "schema.graphql");

run(
  "/Applications/OmniFocus.app",
  path,
  gql`
    scalar RichText
  `
).catch((err) => {
  console.error(err);
});
