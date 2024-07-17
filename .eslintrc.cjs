const { group } = require('console');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:import/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    'import/extensions': ['error'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
      {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/_pages*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/_components*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/_hooks*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/_types*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'src/_utils',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
