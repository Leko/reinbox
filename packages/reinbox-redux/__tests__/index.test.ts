import "jest";
import { createReducer, actions, Provider } from "../src/index";

test("should export createReducer", () => {
  expect(createReducer).toBeTruthy();
});
test("should export actions", () => {
  expect(actions).toBeTruthy();
});
test("should export Provider", () => {
  expect(Provider).toBeTruthy();
});
