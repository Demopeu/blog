import { config } from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    files: ['src/react-bits/**/*.{ts,tsx}'],
    rules: {
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/no-forward-ref': 'off',
      '@eslint-react/web-api-no-leaked-resize-observer': 'off',
      '@eslint-react/web-api-no-leaked-event-listener': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/exhaustive-deps': 'off',
    },
  },
  {
    files: ['src/shadcn/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/use-state': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/set-state-in-effect': 'off',
    },
  },
];
