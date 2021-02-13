const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": [
      ERROR,
      4
    ],
    "linebreak-style": [
      ERROR,
      "unix"
    ],
    "quotes": [
      ERROR,
      "double"
    ],
    "semi": [
      ERROR,
      "always"
    ],
    "func-names": ERROR,
    "id-length": [ERROR, { min: 2 }],
  }
};
