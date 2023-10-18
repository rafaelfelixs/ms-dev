module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    camelcase: [2, { properties: 'always' }],
    complexity: ['error', { max: 20 }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'unused-imports/no-unused-imports-ts': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          '{}': false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
  ignorePatterns: ['webpack.config.js'],
};
