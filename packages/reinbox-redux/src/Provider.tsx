import * as React from "react";
import { RawProvider, Context } from "reinbox";

export type Props = {
  namespace?: string;
  children: React.ReactNode;
};
type ConnectedProps = Props & Context;

export const Provider: React.SFC<ConnectedProps> = ({
  children,
  state,
  dismiss,
  publish
}: ConnectedProps) => {
  return (
    <RawProvider
      value={{
        state,
        dismiss,
        publish
      }}
    >
      {children}
    </RawProvider>
  );
};
Provider.defaultProps = {
  namespace: "reinbox"
};
