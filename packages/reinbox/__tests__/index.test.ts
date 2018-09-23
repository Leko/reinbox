import { Provider, Inbox, withPublish } from "../src/index";

test("should export Provider", () => {
  expect(Provider).toBeTruthy();
});
test("should export Inbox", () => {
  expect(Inbox).toBeTruthy();
});
test("should export withPublish", () => {
  expect(withPublish).toBeTruthy();
});
