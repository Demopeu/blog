import eslintReact from '@eslint-react/eslint-plugin';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { config as baseConfig } from './base.js';

/**
 * ⚛️ Next.js 앱 전용 ESLint 확장팩 (Next.js Configuration)
 * * base.js의 FSD/Panda 공통 뼈대를 상속받고, React와 Next.js에 특화된 룰을 추가합니다.
 * * apps/blog, apps/home 등의 Next.js 프로젝트에서 최종적으로 이 파일을 불러와 사용합니다.
 * * @eslint-react/eslint-plugin v4 사용 (ESLint 10+ 호환)
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
  // 1. 🛑 Next.js 전용 무시 목록
  // Next.js가 빌드할 때 생성하는 폴더들을 린트 검사에서 제외합니다.
  {
    ignores: [
      '.next/**', // Next.js 빌드 캐시
      'out/**', // Static Export 결과물
      'build/**', // 커스텀 빌드 폴더
      'next-env.d.ts', // Next.js 자동 생성 타입 파일
    ],
  },

  // 2. 🏢 공통 뼈대 상속
  // FSD 아키텍처 보호 룰과 기본 JS/TS 룰이 담긴 base.js를 상속합니다.
  ...baseConfig,

  // 3. ⚛️ React 설정 (@eslint-react - ESLint 10+ 네이티브 지원)
  // eslint-plugin-react 7.x가 ESLint 10 API와 호환되지 않아 @eslint-react로 전환.
  // recommended 프리셋에 React core, JSX, DOM, hooks-extra 룰이 모두 포함됩니다.
  eslintReact.configs.recommended,

  // 4. 🌐 브라우저 전역 객체 인식
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker, // PWA나 서비스워커 파일에서 window 객체 에러 방지
        ...globals.browser, // 브라우저 전역 객체(document, window 등) 인식
      },
    },
  },

  // 5. 🟪 Next.js 특화 설정
  // <Image>, <Link> 태그 사용법 등 Next.js의 Core Web Vitals(성능 지표)를 지키도록 강제합니다.
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules, // 구글 SEO 성능 최적화 룰 활성화
    },
  },

  // 6. ✨ Prettier 충돌 방지막 (무조건 배열의 맨 마지막!)
  eslintConfigPrettier,
];
