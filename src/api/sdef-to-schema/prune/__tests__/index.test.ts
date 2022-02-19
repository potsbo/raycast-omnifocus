import { print } from "graphql";
import gql from "graphql-tag";
import { prune } from "../index";

test("valid schema", () => {
  const input = gql`
    type Something {
      string: String
      nonNullString: String!
    }

    extend type Something {
      int: Int!
    }
  `;

  const output = gql`
    type Something {
      string: String
      nonNullString: String!
      int: Int!
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
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

test("fields with interface", () => {
  const input = gql`
    type Something {
      someInterface: SomeInterface
    }

    interface SomeInterface {
      str: String
    }
  `;

  const output = gql`
    type Something {
      someInterface: SomeInterface
    }

    interface SomeInterface {
      str: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("fields with enum", () => {
  const input = gql`
    type Something {
      someEnum: SomeEnum
    }

    enum SomeEnum {
      VALUE1
      VALUE2
    }
  `;

  const output = gql`
    type Something {
      someEnum: SomeEnum
    }

    enum SomeEnum {
      VALUE1
      VALUE2
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("args", () => {
  const input = gql`
    type Something {
      str: String
      fieldWithValidArgs(id: String!, input: SomeInput): Boolean
      fieldWithInvalidArgs(id: UnknownType!): Int
    }

    input SomeInput {
      str: String
    }
  `;

  const output = gql`
    type Something {
      str: String
      fieldWithValidArgs(id: String!, input: SomeInput): Boolean
      fieldWithInvalidArgs: Int
    }

    input SomeInput {
      str: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("input only", () => {
  const input = gql`
    input SomeInput {
      str: String
    }
  `;

  const output = gql`
    input SomeInput {
      str: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("valid interface", () => {
  const input = gql`
    interface SomeInterface {
      someField: String
    }
    type SomeType implements SomeInterface {
      someField: String
    }
  `;

  const output = gql`
    interface SomeInterface {
      someField: String
    }
    type SomeType implements SomeInterface {
      someField: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("valid child interface", () => {
  const input = gql`
    interface ParentInterface {
      childInterface: ChildInterface
    }

    interface ChildInterface {
      someField: String
    }

    type SomeType implements ParentInterface {
      childInterface: ValidChild
      validField: String
    }

    type ValidChild implements ChildInterface {
      someField: String
    }
  `;

  const output = gql`
    interface ParentInterface {
      childInterface: ChildInterface
    }

    interface ChildInterface {
      someField: String
    }

    type SomeType implements ParentInterface {
      childInterface: ValidChild
      validField: String
    }

    type ValidChild implements ChildInterface {
      someField: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});
test("invalid interface", () => {
  const input = gql`
    interface SomeInterface {
      someField: String
    }
    type SomeType implements SomeInterface {
      validField: String
    }
  `;

  const output = gql`
    interface SomeInterface {
      someField: String
    }
    type SomeType {
      validField: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});

test("invalid child interface", () => {
  const input = gql`
    interface ParentInterface {
      childInterface: ChildInterface
    }

    interface ChildInterface {
      someField: String
    }

    type SomeType implements ParentInterface {
      childInterface: InvalidChild
      validField: String
    }

    type InvalidChild implements ChildInterface {
      anotherField: String
    }
  `;

  const output = gql`
    interface ParentInterface {
      childInterface: ChildInterface
    }

    interface ChildInterface {
      someField: String
    }

    type SomeType {
      childInterface: InvalidChild
      validField: String
    }

    type InvalidChild {
      anotherField: String
    }
  `;

  expect(print(prune(input))).toEqual(print(output));
});
