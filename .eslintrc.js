module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": ".",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react-hooks", "jest", "prettier"],
  "extends": [
    "@lumen",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0
  }
}
