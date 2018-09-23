import * as React from "react";
import * as renderer from "react-test-renderer";
import { Payload } from "../src/context";
import { withPublish, WithPublishProps } from "../src/withPublish";
import { Inbox } from "../src/Inbox";
import { InboxProvider } from "../src/InboxProvider";

const Button = ({
  publish,
  topic,
  payload
}: {
  topic: string;
  payload: Payload;
} & WithPublishProps) => (
  <button onClick={() => publish(topic, payload)}>publish</button>
);

const Publisher = withPublish(Button);

test("can publish message to missing topic", () => {
  const topic = "test";
  const component = renderer.create(
    <InboxProvider>
      <Publisher topic={topic} payload={{ id: "xxx" }} />
      <Inbox topic={topic}>
        {({ payload }) => (payload ? payload.id : null)}
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  // @ts-ignore
  expect(tree[1]).toBeFalsy();

  // @ts-ignore
  tree.props.onClick();
  tree = component.toJSON();
  // @ts-ignore
  expect(tree[1]).toBe("xxx");
});

test("can publish message to existing topic", () => {
  const topic = "test";
  const component = renderer.create(
    <InboxProvider
      initialTopics={{
        [topic]: {
          xxx: { id: "xxx" }
        }
      }}
    >
      <Publisher topic={topic} payload={{ id: "yyy" }} />
      <Inbox topic={topic}>
        {({ payload }) => (payload ? payload.id : null)}
      </Inbox>
    </InboxProvider>
  );
  let tree = component.toJSON();
  // @ts-ignore
  expect(tree[1]).toBe("xxx");

  // @ts-ignore
  tree[0].props.onClick();
  tree = component.toJSON();
  // @ts-ignore
  expect(tree[1]).toBe("xxx");
});
