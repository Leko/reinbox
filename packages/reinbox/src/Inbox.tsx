import * as React from "react";
import { Consumer, Payload } from "./context";

type Props = {
  topic: string;
  children: (
    context: { payload: Payload | null; dismiss: () => void }
  ) => React.ReactNode;
};

export const Inbox = ({ topic, children }: Props) => (
  <Consumer>
    {({ state: { topics }, dismiss }) => {
      const payloads = topics[topic] || {};
      const payload = Object.values(payloads)[0] || null;
      return children({
        payload,
        dismiss: () => (payload ? dismiss(topic, payload.id) : null)
      });
    }}
  </Consumer>
);
