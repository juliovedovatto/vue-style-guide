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
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'never'],
    'sort-imports': ['error'],

    // Vue specific
    'vue/require-prop-type-constructor': 'error',
    'vue/require-default-prop': 'error',
    'vue/prop-name-casing': 'error',
    'vue/no-mutating-props': 'error',
    'vue/order-in-components': 'error',
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
