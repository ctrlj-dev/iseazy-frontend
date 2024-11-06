import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ['build/**'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Disable the requirement for React to be in scope when using JSX
      'react/react-in-jsx-scope': 'off',
      // Treat prettier formatting issues as errors
      'prettier/prettier': 'error',
      // Disable the no-undef rule, which checks for undefined variables
      'no-undef': 'off',
    },
  },
];

export default config;
