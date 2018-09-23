import * as React from "react";

export type Payload = {
  id: string;
} & {
  [otherPropName: string]: any;
};

export type Topic = {
  [payloadId: string]: Payload;
};

export type Topics = {
  [topicName: string]: Topic;
};

export type State = {
  topics: Topics;
};

export type Context = {
  state: State;
  publish: (topic: string, payload: Payload) => void;
  dismiss: (topic: string, id: string) => void;
};

const defaultContext: Context = {
  state: {
    topics: {}
  },
  publish: () => {},
  dismiss: () => {}
};

const { Provider, Consumer } = React.createContext(defaultContext);

export { Provider, Consumer };
