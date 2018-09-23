import * as React from "react";
// @ts-ignore power-assign not provided DTS
import { assign } from "power-assign";
import { Provider, State, Topics, Payload } from "./context";

type Props = {
  initialTopics?: Topics;
  children: React.ReactNode;
};

export class InboxProvider extends React.Component<Props, State> {
  state: State = {
    topics: this.props.initialTopics || {}
  };

  publish = (topic: string, payload: Payload) => {
    const newState = assign(this.state, {
      [`topics.${topic}.${payload.id}`]: payload
    });
    this.setState(newState);
  };

  dismiss = (topic: string, id: string) => {
    const newState = assign(this.state, {
      $unset: {
        [`topics.${topic}.${id}`]: ""
      }
    });
    this.setState(newState);
  };

  render() {
    const { state, dismiss, publish } = this;
    const { children } = this.props;

    return (
      <Provider
        value={{
          state,
          dismiss,
          publish
        }}
      >
        {children}
      </Provider>
    );
  }
}
