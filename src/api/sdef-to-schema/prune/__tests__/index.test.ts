import { print } from "graphql";
import gql from "graphql-tag";
import { prune } from "../index";

test("valid schema", () => {
  const input = gql`
    type Something {
      str: String
      nonNullString: String!
    }
  `;

  expect(print(prune(input))).toEqual(print(input));
});

test("valid schema", () => {
  const input = gql`
    type Something {
      str: String
      nonNullString: String!
      unKnownType: UnKnownType
    }
  `;

  const output = gql`
    type Something {
      str: String
      nonNullString: String!
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});
