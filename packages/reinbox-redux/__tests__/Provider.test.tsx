import * as React from "react";
import * as renderer from "react-test-renderer";
import { Inbox } from "reinbox";
import { Provider } from "../src/Provider";

const Child = () => (
  <Inbox topic="test">
    {({ payload, dismiss }) =>
      payload && (
        <div>
          <span>{payload.id}</span>
          <button onClick={dismiss}>dismiss</button>
        </div>
      )
    }
  </Inbox>
);

const mockProps = {
  dismiss: () => {},
  publish: () => {}
};

test("snapshot with one message", () => {
  const topics = {
    reinbox: {
      xxx: { id: "xxx" }
    }
  };
  const component = renderer.create(
    <Provider {...mockProps} state={{ topics }}>
      <Child />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with one message and custom namespace", () => {
  const namespace = "ns";
  const topics = {
    [namespace]: {
      xxx: { id: "xxx" }
    }
  };
  const component = renderer.create(
    <Provider {...mockProps} state={{ topics }} namespace={namespace}>
      <Child />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with no messages", () => {
  const component = renderer.create(
    <Provider {...mockProps} state={{ topics: {} }}>
      <Child />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
