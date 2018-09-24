import { createReducer } from "../src/createReducer";
import { actions } from "../src/actions";

test("createReducer should returns reducer", () => {
  expect(createReducer()).toBeTruthy();
});

test("reducer can reduce 'reinbox/publish' immutably", () => {
  const reducer = createReducer();
  const state = {
    topics: {}
  };
  const cloneState = JSON.parse(JSON.stringify(state));
  const action = actions.publish("test", { id: "xxx" });
  const newState = reducer(state, action);
  expect(state).toEqual(cloneState);
  expect(newState).toEqual({
    topics: {
      test: {
        xxx: { id: "xxx" }
      }
    }
  });
});
test("reducer can reduce 'reinbox/publish' on exist topic immutably", () => {
  const reducer = createReducer();
  const state = {
    topics: {
      test: {
        zzz: { id: "zzz" }
      }
    }
  };
  const cloneState = JSON.parse(JSON.stringify(state));
  const action = actions.publish("test", { id: "xxx" });
  const newState = reducer(state, action);
  expect(state).toEqual(cloneState);
  expect(newState).toEqual({
    topics: {
      test: {
        zzz: { id: "zzz" },
        xxx: { id: "xxx" }
      }
    }
  });
});
test("reducer can reduce 'reinbox/publish' on initialState", () => {
  const reducer = createReducer();
  const action = actions.publish("test", { id: "xxx" });
  const newState = reducer(undefined, action);
  expect(newState).toEqual({
    topics: {
      test: {
        xxx: { id: "xxx" }
      }
    }
  });
});

test("reducer can reduce 'reinbox/dismiss' immutably", () => {
  const reducer = createReducer();
  const state = {
    topics: {
      test: {
        xxx: { id: "xxx" },
        yyy: { id: "yyy" }
      }
    }
  };
  const cloneState = JSON.parse(JSON.stringify(state));
  const action = actions.dismiss("test", "xxx");
  const newState = reducer(state, action);
  expect(state).toEqual(cloneState);
  expect(newState).toEqual({
    topics: {
      test: {
        yyy: { id: "yyy" }
      }
    }
  });
});

test("reducer should return before state when unknown action type", () => {
  const reducer = createReducer();
  const state = {
    topics: {
      test: {
        xxx: { id: "xxx" },
        yyy: { id: "yyy" }
      }
    }
  };
  // @ts-ignore
  const newState = reducer(state, { type: "xxx" });
  expect(newState).toBe(state);
});
