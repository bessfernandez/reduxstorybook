# Sample app with Redux / TS / Storybook
Fun Fun Fun sample app with Redux / TS / Storybook. May be converted into a boilerplate of sorts.. Mostly just an experiment of stacks I want to play with.

This is currently demonstrating an integration with a third party tool - Learnosity. Will likely move away from this as sample app is more of a thing.. 


## Tech Stack
- React
- Redux
- TypeScript
- Redux-connected-router (extends React Router)
- ESLint
- Prettier
- Jest

## Up Next
Serve it up all static like. Netlify?

## Running locally

1. Install the things via `npm install`
2. Ye olde`npm start`
3. Load up `localhost:3000`

## Approach and project structure
**TODO** More on project structure and approach to building

## Linting and code standards
Should be supported by most IDE's to offer in code linting. For example: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint.

To run via npm:

```
npm run lint
```

In addition there is a [Prettier](https://prettier.io) setup which will auto fix your code on save with simple fixes such as missing semicolons or incorrect tab width. See `prettierrc` file for more on specific rules.


## Testing
IN PROGRESS

1. App uses Jest and Enzyme to test our components, redux, and utilities. Please see resources below for more on testing frameworks.
2. Run ye olde `npm test`
3. To watch tests as you're writing / updating running `npm run watch:test` will do the trick

## Resources
- [Great step by step tutorial on understanding the Redux Workflow](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092)
- [Redux and TypeScript](https://medium.com/@resir014/redux-4-typescript-2-9-a-type-safe-approach-7f073917b803)
- [React & Redux & TS guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- [The general JS testing environment and strategy implemented is outlined here](https://alligator.io/react/testing-react-redux-with-jest-enzyme/)
- [Redux test writing guidelines](https://github.com/reduxjs/redux/blob/master/docs/recipes/WritingTests.md#connected-components)

## Deployment
TBD based on BE integration chosen..


