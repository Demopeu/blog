import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'error',
        { additionalHooks: '(useEffectEvent|useOptimistic)' },
      ],
    },
  },
];
