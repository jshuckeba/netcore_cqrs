## Get Started
This project was started from a clone of [React Slingshot](https://github.com/coryhouse/react-slingshot).  View their [README](https://github.com/coryhouse/react-slingshot/blob/master/README.md) file or [FAQ](https://github.com/coryhouse/react-slingshot/blob/master/docs/FAQ.md) page for more information.

## Environment Variables
To change environment variables on your local machine, create a .env file at the root (same level as package.json). 

Example .env file:
```
ROOT_INVENTORY_API_URL=http://localhost:52476/api

```

## Technologies
We are using the following technologies:

| **Tech** | **Description** |
|----------|-------|
| [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    |
| [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).|
| [React Router](https://github.com/reactjs/react-router) | A complete routing library for React |
| [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     |
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). |
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. |
| [Jest](https://facebook.github.io/jest/) | Automated tests with built-in expect assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. |
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. |

