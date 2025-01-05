import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node, // Add Node.js globals
    },
    rules: {
      // Add your custom rules here
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Add your custom rules here
    },
  },
  pluginJs.configs.recommended,
];
