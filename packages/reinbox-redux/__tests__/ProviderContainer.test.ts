import "jest";
import { mapStateToProps, mapDispatchToProps } from "../src/ProviderContainer";
import { actions, Actions } from "../src/actions";

test("mapStateToProps should throws Error when no namespace found", () => {
  const namespace = "test";
  expect(() => mapStateToProps({}, { namespace, children: null })).toThrowError(
    new Error(`key ${namespace} not found in Redux state`)
  );
});
test("mapStateToProps should returns reindex State", () => {
  const namespace = "test";
  const expected = {};
  const appState = {
    [namespace]: expected
  };
  expect(mapStateToProps(appState, { namespace, children: null })).toEqual({
    state: expected
  });
});

test("mapDispatchToProps should returns publish", () => {
  // @ts-ignore
  const dispatch: Dispatch<Actions> = () => {};
  expect(mapDispatchToProps(dispatch)).toHaveProperty("publish");
});
test("mapDispatchToProps should returns dismiss", () => {
  // @ts-ignore
  const dispatch: Dispatch<Actions> = () => {};
  expect(mapDispatchToProps(dispatch)).toHaveProperty("dismiss");
});
test("mapDispatchToProps.publish should dispatch publish action", () => {
  const spy = jest.fn(() => {});
  const props = mapDispatchToProps(spy);
  const action = actions.publish("topic", { id: "id" });
  props.publish("topic", { id: "id" });
  expect(spy).toBeCalledWith(action);
});
test("mapDispatchToProps.dismiss should dispatch dismiss action", () => {
  const spy = jest.fn(() => {});
  const props = mapDispatchToProps(spy);
  const action = actions.dismiss("topic", "id");
  props.dismiss("topic", "id");
  expect(spy).toBeCalledWith(action);
});
