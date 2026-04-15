import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.js";

// ⬇️ 단독 사용 시 필요할 수 있는 기본 룰셋 (현재는 base.js를 쓰므로 주석 처리)
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

/**
 * ⚛️ 순수 React 패키지 전용 ESLint 확장팩 (Internal React Configuration)
 * * Next.js 의존성 없이, @repo/ui 같은 내부 공통 컴포넌트 라이브러리 검사에 사용됩니다.
 * * 프레임워크에 종속되지 않은 '순수한 React' 환경을 보장합니다.
 *
 * @type {import("eslint").Linter.Config[]} 
 */
export const config = [
  // 1. 🏢 공통 뼈대 상속 (FSD + Panda CSS + 기본 룰)
  ...baseConfig,

  // --- ⚠️ 롤백용 중복 룰 (터보레포 원본 방식) ---
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  // ---------------------------------------------

  // 2. ⚛️ React 기본 설정 (Next.js 관련 룰 배제)
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // 3. 🪝 React Hooks 특화 설정
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React 17+ JSX 변환 호환: import React 생략 허용
      "react/react-in-jsx-scope": "off",
    },
  },

  // 4. ✨ Prettier 충돌 방지막 (반드시 배열의 맨 마지막!)
  eslintConfigPrettier,
];