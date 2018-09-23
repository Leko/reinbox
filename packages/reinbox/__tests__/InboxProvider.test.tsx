import * as React from "react";
import * as renderer from "react-test-renderer";
import { Inbox } from "../src/Inbox";
import { InboxProvider } from "../src/InboxProvider";

const Child = () => (
  <Inbox topic="test">
    {({ payload, dismiss }) =>
      payload && (
        <div>
          <span>{payload.message}</span>
          <button onClick={dismiss}>dismiss</button>
        </div>
      )
    }
  </Inbox>
);

test("snapshot with one message", () => {
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        test: { xxx: { id: "xxx", message: "notification message" } }
      }}
    >
      <Child />
    </InboxProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot with no messages", () => {
  const component = renderer.create(
    <InboxProvider>
      <Child />
    </InboxProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
