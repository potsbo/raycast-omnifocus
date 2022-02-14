import { print } from "graphql";
import { ConnectionInterface, EdgeInterface, NodeInterface } from "../constants";

test("NodeInterface snapshot", () => {
  expect(print(NodeInterface)).toMatchSnapshot();
});

test("EdgeInterface snapshot", () => {
  expect(print(EdgeInterface)).toMatchSnapshot();
});

test("ConnectionInterface snapshot", () => {
  expect(print(ConnectionInterface)).toMatchSnapshot();
});
