import { Payload } from "reinbox";

type PublishAction = {
  type: "reinbox/publish";
  payload: {
    topic: string;
    payload: Payload;
  };
};
type DismissAction = {
  type: "reinbox/dismiss";
  payload: {
    topic: string;
    id: string;
  };
};
export type Actions = PublishAction | DismissAction;

const publish = (topic: string, payload: Payload): PublishAction => ({
  type: "reinbox/publish",
  payload: {
    topic,
    payload
  }
});
const dismiss = (topic: string, id: string): DismissAction => ({
  type: "reinbox/dismiss",
  payload: {
    topic,
    id
  }
});

export const actions = {
  publish,
  dismiss
};
