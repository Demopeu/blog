import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.js";

// ⬇️ 단독 사용 시 필요할 수 있는 기본 룰셋 (현재는 base.js를 쓰므로 주석 처리)
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

/**
 * ⚛️ Next.js 앱 전용 ESLint 확장팩 (Next.js Configuration)
 * * base.js의 FSD/Panda 공통 뼈대를 상속받고, React와 Next.js에 특화된 룰을 추가합니다.
 * * apps/blog, apps/home 등의 Next.js 프로젝트에서 최종적으로 이 파일을 불러와 사용합니다.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
  // 1. 🛑 Next.js 전용 무시 목록
  // Next.js가 빌드할 때 생성하는 폴더들을 린트 검사에서 제외합니다.
  {
    ignores: [
      ".next/**",       // Next.js 빌드 캐시
      "out/**",         // Static Export 결과물
      "build/**",       // 커스텀 빌드 폴더
      "next-env.d.ts",  // Next.js 자동 생성 타입 파일
    ],
  },

  // 2. 🏢 공통 뼈대 상속
  // 우리가 정성껏 만든 FSD 아키텍처 보호 룰과 Panda CSS 룰이 담긴 base.js를 쫙 깔아줍니다.
  ...baseConfig,

  // --- ⚠️ 롤백용 중복 룰 (터보레포 원본 방식) ---
  // 만약 훗날 base.js와의 연결을 끊고 이 파일만 단독으로 써야 한다면 아래 주석을 해제하세요.
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  // ---------------------------------------------

  // 3. ⚛️ React 기본 설정 (v9 Flat Config 호환)
  // React 컴포넌트 작성 시 발생하는 흔한 에러들을 잡아줍니다.
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker, // PWA나 서비스워커 파일에서 window 객체 에러 방지
        ...globals.browser,       // 브라우저 전역 객체(document, window 등) 인식
      },
    },
    settings: {
      react: { version: "detect" }, // 설치된 React 버전을 자동으로 파악해서 룰을 맞춤
    },
  },

  // 4. 🟪 Next.js 특화 설정
  // <Image>, <Link> 태그 사용법 등 Next.js의 Core Web Vitals(성능 지표)를 지키도록 강제합니다.
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules, // 구글 SEO 성능 최적화 룰 활성화
    },
  },

  // 5. 🪝 React Hooks 특화 설정
  // useEffect의 의존성 배열(deps)이 빠졌거나 잘못 쓰인 것을 귀신같이 잡아냅니다.
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // 핵심: React 17부터는 파일 상단에 'import React from "react"'를 안 써도 됩니다.
      // 이 룰을 꺼두지 않으면 모든 컴포넌트에 React를 import하라고 에러를 띄우므로 반드시 꺼야 합니다.
      "react/react-in-jsx-scope": "off",
    },
  },

  // 6. ✨ Prettier 충돌 방지막 (무조건 배열의 맨 마지막!)
  // 위에서 설정한 React, Next.js 관련 룰 중에서 '포맷팅(띄어쓰기 등)'과 관련된 룰만 쏙 골라 꺼줍니다.
  eslintConfigPrettier,
];