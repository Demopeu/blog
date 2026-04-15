import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ['src/shared/lib/compose-providers.tsx'],
    rules: {
      '@eslint-react/component-hook-factories': 'off',
    },
  },
];
