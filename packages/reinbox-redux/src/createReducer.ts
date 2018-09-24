// @ts-ignore power-assign not provided DTS
import { assign } from "power-assign";
import { State } from "reinbox";
import { Actions } from "./actions";

export const createReducer = () => {
  const initialState: State = {
    topics: {}
  };

  const reducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
      case "reinbox/publish": {
        const { topic, payload } = action.payload;
        return assign(state, {
          [`topics.${topic}.${payload.id}`]: payload
        });
      }
      case "reinbox/dismiss": {
        const { topic, id } = action.payload;
        return assign(state, {
          $unset: {
            [`topics.${topic}.${id}`]: ""
          }
        });
      }
      default:
        return state;
    }
  };

  return reducer;
};
