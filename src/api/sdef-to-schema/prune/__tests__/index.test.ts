import { buildSchema, print, validateSchema } from "graphql";
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
      unKnownType: UnknownType
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

test("user defiend type", () => {
  const input = gql`
    type Something {
      string: String
      nonNullString: String!
      unKnownType: KnownType
    }

    type KnownType {
      string: String
    }
  `;

  expect(print(prune(input))).toEqual(print(input));
});

test("depending on invalid type", () => {
  const input = gql`
    type Something {
      string: String
      nonNullString: String!
      unKnownType: KnownType
    }

    type KnownType {
      string: UnknownType
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
