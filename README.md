# es-webpack-notifier

> frok [webpack-notifier](https://github.com/Turbo87/webpack-notifier), Add support for Multi-compiler mode

## Installation

Use `yarn` to install this package:

```
yarn add es-webpack-notifier --dev
```

## Usage

In the `webpack.config.js` file:

```js
var WebpackNotifierPlugin = require('es-webpack-notifier');

var config = module.exports = {
  // ...

  plugins: [
    new WebpackNotifierPlugin(),
  ]
},
```

## Configuration

### Title

Title shown in the notification.

```js
new WebpackNotifierPlugin({title: 'Webpack'});
```

### Content Image

Image shown in the notification.

```js
var path = require('path');

new WebpackNotifierPlugin({contentImage: path.join(__dirname, 'logo.png')});
```

### Exclude Warnings

If set to `true`, warnings will not cause a notification.

```js
new WebpackNotifierPlugin({excludeWarnings: true});
```

### Always Notify

Trigger a notification every time.  Call it "noisy-mode".

```js
new WebpackNotifierPlugin({alwaysNotify: true});
```

### Skip Notification on the First Build

Do not notify on the first build.  This allows you to receive notifications on subsequent incremental builds without being notified on the initial build.

```js
new WebpackNotifierPlugin({skipFirstNotification: true});
```
