# reinbox

[![npm](https://img.shields.io/npm/v/reinbox.svg)](https://www.npmjs.com/package/reinbox)
[![license](https://img.shields.io/github/license/Leko/reinbox.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/Leko/reinbox.svg?style=svg)](https://circleci.com/gh/Leko/reinbox)
[![codecov](https://codecov.io/gh/Leko/reinbox/branch/master/graph/badge.svg)](https://codecov.io/gh/Leko/reinbox)

Declarative topic based notification UI manager for React (Native).  
If you want to use reinbox with [Redux](https://github.com/reduxjs/redux), you can use [reinbox-redux](https://github.com/Leko/reinbox/tree/master/packages/reinbox-redux).

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

## API

### `<Inbox />`

```jsx
<Inbox topic="test">
  {({ payload, dismiss }) =>
    payload && (
      <div>
        <span>{payload.message}</span>
        <button onClick={dismiss}>dismiss</button>
      </div>
    )
  }
</Inbox>
```

| prop name | required | description                                                                   |
| --------- | -------- | ----------------------------------------------------------------------------- |
| topic     | Yes      | Topic name you want to receive message                                        |
| childrenn | Yes      | Render notification message.<br />When there is no message, payload is `null` |

## Development

```
git clone git@github.com:Leko/reinbox.git
cd reinbox
npm i
npx lerna bootstrap
```

## License

This package under [MIT](https://opensource.org/licenses/MIT) license.
