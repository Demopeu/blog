import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importXPlugin from 'eslint-plugin-import-x';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * 🏢 모노레포 공통 ESLint 뼈대 (Base Configuration)
 * * 모든 앱(apps/*)과 패키지(packages/*)가 공통으로 상속받는 최상위 룰셋입니다.
 * 중복 선언을 방지하고, 프로젝트 전체의 아키텍처(FSD)와 디자인 토큰(Panda)을 통제합니다.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // 1. 🛑 검사 제외 대상 (무시 목록)
  // 빌드 결과물이나 캐시 폴더까지 검사하면 에디터가 심각하게 느려지므로 반드시 제외합니다.
  {
    ignores: [
      'dist/**', // 빌드된 결과물
      '.next/**', // Next.js 빌드 및 캐시
      '.turbo/**', // Turborepo 빌드 캐시
      'node_modules/**', // 패키지 모듈
      'pnpm-lock.yaml', // 패키지 잠금 파일
    ],
  },

  // 2. 🔰 기본 권장 룰셋 (JS & TS)
  // ESLint와 TS 진영에서 권장하는 기본적인 에러 방지 룰들을 활성화합니다.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. 🛠️ 커스텀 플러그인 및 강력한 실무 룰 장착
  {
    plugins: {
      'turbo': turboPlugin,
      'import-x': importXPlugin,
    },
    rules: {
      // --- 🚀 Turborepo 규칙 ---
      // 코드에서 process.env.FOO를 썼는데, turbo.json의 "env" 배열에 선언하지 않으면 경고. (캐싱 누락 방지)
      'turbo/no-undeclared-env-vars': 'warn',

      // --- 🏗️ 아키텍처 및 의존성 규칙 (FSD) ---
      // [1] 모노레포 캡슐화 보호: 다른 패키지를 부를 때 ../../../packages/ui 처럼 상대경로로 뚫고 나가는 것을 방지. (@repo/ui 처럼 워크스페이스 이름 사용 강제)
      'import-x/no-relative-packages': 'error',

      // [2] FSD (Feature-Sliced Design) 계층 역전 방지
      // 핵심 원칙: 하위 계층은 상위 계층을 알면 안 됩니다. 이를 위반하면 즉시 빌드를 터뜨립니다.
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            // shared(최하위)는 그 어떤 상위 계층도 참조할 수 없음
            {
              target: './src/shared',
              from: './src/entities',
              message: '[FSD 위반] shared는 entities를 참조할 수 없습니다.',
            },
            {
              target: './src/shared',
              from: './src/features',
              message: '[FSD 위반] shared는 features를 참조할 수 없습니다.',
            },

            // entities는 비즈니스 로직(features)을 모른 채 독립적이어야 함
            {
              target: './src/entities',
              from: './src/features',
              message: '[FSD 위반] entities는 features를 참조할 수 없습니다.',
            },

            // features(기능)는 화면 조립 단위인 widgets를 참조할 수 없음
            {
              target: './src/features',
              from: './src/widgets',
              message: '[FSD 위반] features는 widgets를 참조할 수 없습니다.',
            },

            // widgets는 최종 조립 계층인 app을 참조할 수 없음
            {
              target: './src/widgets',
              from: './src/app',
              message: '[FSD 위반] widgets는 app 계층을 참조할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },

  // 4. ✨ Prettier 충돌 방지막 (반드시 배열의 맨 마지막에 위치!)
  // ESLint의 포맷팅 룰(띄어쓰기, 줄바꿈 등)을 싹 다 꺼버려서 Prettier와 싸우는 것을 막습니다.
  eslintConfigPrettier,
];
