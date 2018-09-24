import { Dispatch } from "redux";
import { connect } from "react-redux";
import { State, Payload } from "reinbox";
import { actions, Actions } from "./actions";
import { Provider, Props } from "./Provider";

export const mapStateToProps = (
  state: { [key: string]: Object },
  ownProps: Props
) => {
  const { namespace } = ownProps;
  if (!namespace || !state[namespace]) {
    throw new Error(`key ${namespace} not found in Redux state`);
  }

  return {
    state: state[namespace] as State
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  publish(topic: string, payload: Payload) {
    dispatch(actions.publish(topic, payload));
  },
  dismiss(topic: string, id: string) {
    dispatch(actions.dismiss(topic, id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);
