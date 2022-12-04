const path = require("path");

module.exports = {
  extends: [
    ".eslintrc",
    "next/core-web-vitals",
    "plugin:storybook/recommended",
  ],
  root: true,
  settings: {
    next: {
      rootDir: path.join(__dirname, "src"),
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: { "@typescript-eslint/await-thenable": "off" },
};
