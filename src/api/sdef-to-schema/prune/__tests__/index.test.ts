import { print } from "graphql";
import gql from "graphql-tag";
import { prune } from "../index";

test("valid schema", () => {
  const input = gql`
    type Something {
      string: String
      nonNullString: String!
    }
  `;

  expect(print(prune(input))).toEqual(print(input));
});

test("one invalid field", () => {
  const input = gql`
    type Something {
        string: String
      nonNullString: String!
      unKnownType: UnKnownType
    }
  `;

  const output = gql`
    type Something {
      string: String
      nonNullString: String!
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});
