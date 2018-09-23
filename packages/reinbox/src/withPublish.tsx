import * as React from "react";
import { Consumer, Payload } from "./context";

export type WithPublishProps = {
  publish: (topic: string, payload: Payload) => void;
};

export const withPublish = <P extends {}>(
  Cmp: React.ComponentType<P & WithPublishProps>
): React.ComponentType<P> => (props: P) => (
  <Consumer>
    {({ publish }) => (
      <Cmp
        publish={(topic: string, payload: Payload) => publish(topic, payload)}
        {...props}
      />
    )}
  </Consumer>
);
