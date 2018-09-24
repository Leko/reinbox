# reinbox-redux

Use [reinbox](https://github.com/Leko/reinbox/tree/master/packages/reinbox) with Redux

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
    dispatch(
      actions.publish({
        topic: TOPIC,
        payload: { id: "xxx", message: "notify me" }
      })
    );
  },
  onDismiss() {
    dispatch(
      actions.dismiss({
        topic: TOPIC,
        id: "xxx"
      })
    );
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
        {({ payload }) =>
          payload && (
            <div>
              <span>{payload.message}</span>
            </div>
          )
        }
      </Inbox>
    </ReinboxProvider>
  </Provider>
);
```

### dismiss in Inbox

If you want to use `dismiss` in Inbox, please set `dispatcher` prop to Provider.

```jsx
import { Provider } from "react-redux";
import { Provider as ReinboxProvider } from "reinbox-redux";
import { Inbox } from "reinbox";

const App = () => (
  <Provider store={store}>
    <ReinboxProvider dispatcher={store.dispatch}>
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

### actions.publish

### actions.dismiss

### <Provider />

### <Inbox />

## Development

```
git clone git@github.com:Leko/reinbox.git
cd reinbox
npm i
npx lerna bootstrap
```

## License

This package under [MIT](https://opensource.org/licenses/MIT) license.
