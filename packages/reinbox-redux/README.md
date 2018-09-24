# reinbox-redux

[![npm](https://img.shields.io/npm/v/reinbox-redux.svg)](https://www.npmjs.com/package/reinbox-redux)
[![license](https://img.shields.io/github/license/Leko/reinbox-redux.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/Leko/reinbox.svg?style=svg)](https://circleci.com/gh/Leko/reinbox)
[![codecov](https://codecov.io/gh/Leko/reinbox/branch/master/graph/badge.svg)](https://codecov.io/gh/Leko/reinbox)

Use [reinbox](https://github.com/Leko/reinbox/tree/master/packages/reinbox) with Redux.  
If you are not using Redux, you can use [reinbox](https://github.com/Leko/reinbox/tree/master/packages/reinbox) only.

## Install

```
npm install reinbox reinbox-redux
```

## Usage

### Configure store

reinbox-redux provides `createReducer` and `Provider`.  
Please use `combineReducers` to combineReducers with key: `reinbox`.

```jsx
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { Provider as ReinboxProvider, createReducer } from "reinbox-redux";

const rootReducer = combineReducers({
  reinbox: createReducer()
});
const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <ReinboxProvider>...</ReinboxProvider>
  </Provider>
);
```

#### Custom namespace

If you want to change reducer name from `reinbox`, you should pass `namespace` prop to Provider.

```jsx
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { Provider as ReinboxProvider, createReducer } from "reinbox-redux";

const rootReducer = combineReducers({
  someGreatReducer: createReducer()
});
const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <ReinboxProvider namespace="someGreatReducer">...</ReinboxProvider>
  </Provider>
);
```

### Publish & dismiss

reinbox-redux provides `actions`.  
It contains two action creators: `publish` and `dismiss`.

```jsx
import { connect } from "react-redux";
import { actions } from "reinbox-redux";
import { Inbox } from "reinbox";

const Control = ({ onPublish, onDismiss }) => (
  <div>
    <button onClick={onPublish}>notify</button>
    <button onClick={onDismiss}>dismiss</button>
  </div>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({
  onPublish() {
    dispatch(actions.publish(TOPIC, { id: "xxx", message: "notify me" }));
  },
  onDismiss() {
    dispatch(actions.dismiss(TOPIC, "xxx"));
  }
});
const Controls = connect(
  mapStateToProps,
  mapDispatchToProps
)(Control);

const App = () => (
  <Provider store={store}>
    <ReinboxProvider>
      <Controls />
      <Inbox topic={TOPIC}>
        {({ payload, dismiss }) =>
          payload && (
            <div>
              <span>{payload.message}</span>
              <button onClick={dismiss}>dismiss</button>
            </div>
          )
        }
      </Inbox>
    </ReinboxProvider>
  </Provider>
);
```

## API

### createReducer

```js
const reducer = createReducer();
```

### actions.publish

```js
dispatch(actions.publish("test", { id: "xxx", message: "notify me" }));
```

| argument | required | description                                         |
| -------- | -------- | --------------------------------------------------- |
| topic    | Yes      | Topic name you want to publish                      |
| payload  | Yes      | Notification message. It should contains `id` field |

### actions.dismiss

```js
dispatch(actions.dismiss("test", "xxx"));
```

| argument | required | description                    |
| -------- | -------- | ------------------------------ |
| topic    | Yes      | Topic name you want to dismiss |
| id       | Yes      | message id                     |

### `<Provider />`

```jsx
<Provider namespace="someGreatReducer">...</Provider>
```

| prop name | required | description                                        | default     |
| --------- | -------- | -------------------------------------------------- | ----------- |
| children  | Yes      | any react components                               |             |
| namespace | -        | please refer [Custom namespace](#custom-namespace) | `"reinbox"` |

## Development

```
git clone git@github.com:Leko/reinbox.git
cd reinbox
npm i
npx lerna bootstrap
```

## License

This package under [MIT](https://opensource.org/licenses/MIT) license.
