# Linting

## ESLint

npm packages needed:

```
npm i -D eslint prettier @prettier/plugin-pug @vue/eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-plugin-sort-exports
```

```js
// .eslintrc.js

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  plugins: ['sort-exports'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'never'],
    'sort-imports': ['error'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // custom rules
    'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],

    // Vue specific
    'vue/require-prop-type-constructor': 'error',
    'vue/require-default-prop': 'error',
    'vue/prop-name-casing': 'error',
    'vue/no-mutating-props': 'error',
    'vue/order-in-components': 'error',
    'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*(:[a-z]+(?:-[a-z]+)*)?$/u'] }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
```

Prettier Configuration

```js
// prettierrc.js
 module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  pugSingleQuote: false,
  printWidth: 120,
  arrowParens: 'avoid'
}
```

## Optional
Vetur - Vue tooling for VS Code. https://marketplace.visualstudio.com/items?itemName=octref.vetur
