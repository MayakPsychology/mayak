module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  rules: {
    'import/namespace': 'off',
    'max-len': ['error', { code: 120, ignoreStrings: true }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [2, { namedComponents: ['arrow-function', 'function-declaration'] }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'no-return-await': 'off',
    indent: ['error', 2],
    'no-multiple-empty-lines': ['error', { max: 3, maxBOF: 0, maxEOF: 0 }],
    'no-underscore-dangle': 0,
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 'off',
    'no-restricted-exports': 0,
    'no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: '@/**', group: 'internal' },
          { pattern: '@*', group: 'internal' },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
