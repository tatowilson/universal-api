# navigate.go 
[![npm](https://img.shields.io/npm/v/universal-navigate.svg)](https://www.npmjs.com/package/universal-navigate)

Route navigation capability implementation.

## Support

<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px">

## Install

```bash
$ npm install universal-navigate --save
```

## Usage

```js
import navigate from 'universal-navigate';

// How to use it in quickapp
// import chooseImage from 'universal-navigate/lib/quickapp;

navigate.go({
  step: -1
}).then(() => {
});

```

## Methods

### `go(options)`

#### Arguments
| Property         | Type      | Description                                                                                                      | required | Default |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------- | :------: | :-----: |
| options          | `object`  | Go function arguments                                                                                            |   true   |    -    |
| options.step     | `number`  | The number of forward steps is positive and only supports the web, and the number of backward steps is negative. |   true   |    -    |
| options.success | `Function`  | The callback function for a successful API call | false | - |
| options.fail | `Function`  | The callback function for a failed API call | false | - |
| options.complete | `Function`  | The callback function used when the API call completed (always executed whether the call succeeds or fails) | 否 | - |