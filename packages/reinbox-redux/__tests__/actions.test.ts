import { actions } from "../src/actions";

test('actions.publish should return type: "reinbox/publish"', () => {
  const action = actions.publish("", { id: "" });
  expect(action.type).toBe("reinbox/publish");
});
test("actions.publish should return payload", () => {
  const topic = "test";
  const id = "xxx";
  const message = "some message";
  const action = actions.publish(topic, { id, message });
  expect(action.payload).toEqual({
    topic,
    payload: { id, message }
  });
});

test('actions.dismiss should return type: "reinbox/dismiss"', () => {
  const action = actions.dismiss("", "");
  expect(action.type).toBe("reinbox/dismiss");
});
test("actions.dismiss should return payload", () => {
  const topic = "test";
  const id = "xxx";
  const action = actions.dismiss(topic, id);
  expect(action.payload).toEqual({
    topic,
    id
  });
});
