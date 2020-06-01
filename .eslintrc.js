module.exports = {
  root: true,
  rules: {
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'warn',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'warn',
    'relay/no-future-added-value': 'warn',
    'relay/unused-fields': 'warn',
  },
  plugins: ['relay'],
  extends: '@dooboo/eslint-config',
};
