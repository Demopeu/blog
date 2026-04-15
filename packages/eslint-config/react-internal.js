import eslintReact from '@eslint-react/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { config as baseConfig } from './base.js';

/**
 * ⚛️ 순수 React 패키지 전용 ESLint 확장팩 (Internal React Configuration)
 * * Next.js 의존성 없이, @repo/ui 같은 내부 공통 컴포넌트 라이브러리 검사에 사용됩니다.
 * * 프레임워크에 종속되지 않은 '순수한 React' 환경을 보장합니다.
 * * @eslint-react/eslint-plugin v4 사용 (ESLint 10+ 호환)
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // 1. 🏢 공통 뼈대 상속 (FSD + 기본 룰)
  ...baseConfig,

  // 2. ⚛️ React 설정 (@eslint-react - ESLint 10+ 네이티브 지원)
  // recommended 프리셋에 React core, JSX, DOM, hooks-extra 룰이 모두 포함됩니다.
  eslintReact.configs.recommended,

  // 3. 🌐 브라우저 전역 객체 인식
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },

  // 4. ✨ Prettier 충돌 방지막 (반드시 배열의 맨 마지막!)
  eslintConfigPrettier,
];
