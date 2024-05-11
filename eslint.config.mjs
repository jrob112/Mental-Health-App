import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

// export default [
//   { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   pluginReactConfig,
// ];
export default [
  {
    env: {
      es6: true,
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 9,
      ecmaFeatures: {
        jsx: true,
      },
    },
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js', '!**/eslint.config.js'],
    rules: {
      /* Indentation */
      'no-mixed-spaces-and-tabs': 2,
      indent: [2, 2],
      /* Variable cames */
      camelcase: 2,
      /* Language constructs */
      curly: 2,
      eqeqeq: [2, 'smart'],
      'func-style': [2, 'expression'],
      'no-var': 2,
      'prefer-const': 2,
      /* Semicolons */
      semi: 2,
      'no-extra-semi': 2,
      /* Padding & additional whitespace (preferred but optional) */
      'brace-style': [2, '1tbs', { allowSingleLine: true }],
      'semi-spacing': 1,
      'key-spacing': 1,
      'block-spacing': 1,
      'comma-spacing': 1,
      'no-multi-spaces': 1,
      'space-before-blocks': 1,
      'keyword-spacing': [1, { before: true, after: true }],
      'space-infix-ops': 1,
      /* Minuta */
      'comma-style': [2, 'last'],
      quotes: [1, 'single'],
    },
  },
];
