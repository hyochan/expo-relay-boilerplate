module.exports = {
  root: true,
  rules: {
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'warn',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'warn',
    'relay/no-future-added-value': 'warn',
    'relay/unused-fields': 0,
    '@typescript-eslint/camelcase': 0,
  },
  plugins: ['relay'],
  extends: '@dooboo/eslint-config',
};
