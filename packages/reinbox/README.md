# reinbox

Declarative topic based notification UI manager for React (Native)

## Install

```
npm install reinbox
```

## Usage

```jsx
import { Provider, Inbox, withPublish } from "reinbox";

const TOPIC = "test";

const Button = ({ publish }) => (
  <button onClick={() => publish(TOPIC, { id: "xxx", message: "notify me" })}>
    notify
  </button>
);
const PublishButton = withPublish(Button);

const App = () => (
  <Provider>
    <div>
      <PublishButton />
    </div>
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
  </Provider>
);
```

## Development

```
git clone git@github.com:Leko/reinbox.git
cd reinbox
npm i
npx lerna bootstrap
```

## License

This package under [MIT](https://opensource.org/licenses/MIT) license.
