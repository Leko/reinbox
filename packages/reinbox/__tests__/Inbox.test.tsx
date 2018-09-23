import * as React from "react";
import * as renderer from "react-test-renderer";
import { Inbox } from "../src/Inbox";
import { InboxProvider } from "../src/InboxProvider";

test("snapshot for empty children", () => {
  const component = renderer.create(<Inbox topic="test">{() => null}</Inbox>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot for static children", () => {
  const component = renderer.create(
    <Inbox topic="test">
      {({ dismiss }) => <button onClick={dismiss}>click me</button>}
    </Inbox>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot for static children with payload", () => {
  const topic = "test";
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        [topic]: { xxx: { id: "xxx", message: "notification message" } }
      }}
    >
      <Inbox topic={topic}>
        {({ payload, dismiss }) =>
          payload && (
            <div>
              <span>{payload.message}</span>
              <button onClick={dismiss}>dismiss</button>
            </div>
          )
        }
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Inbox should show first of message", () => {
  const topic = "test";
  const messages = {
    xxx: { id: "xxx" },
    yyy: { id: "yyy" },
    zzz: { id: "zzz" }
  };
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        [topic]: messages
      }}
    >
      <Inbox topic={topic}>
        {({ payload }) => (payload ? payload.id : null)}
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  expect(tree).toBe("xxx");
});

test("It should show next message when called dismiss", () => {
  const topic = "test";
  const messages = {
    xxx: { id: "xxx" },
    yyy: { id: "yyy" }
  };
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        [topic]: messages
      }}
    >
      <Inbox topic={topic}>
        {({ payload, dismiss }) => (
          <button onClick={dismiss}>{payload ? payload.id : null}</button>
        )}
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  // @ts-ignore
  tree.props.onClick();
  tree = component.toJSON();
  // @ts-ignore
  expect(tree.children[0]).toBe("yyy");
});

test("It should pass null with single message when called dismiss", () => {
  const topic = "test";
  const messages = {
    xxx: { id: "xxx" }
  };
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        [topic]: messages
      }}
    >
      <Inbox topic={topic}>
        {({ payload, dismiss }) => (
          <button onClick={dismiss}>{payload ? payload.id : null}</button>
        )}
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  // @ts-ignore
  tree.props.onClick();
  tree = component.toJSON();
  // @ts-ignore
  expect(tree.children).toBe(null);
});
