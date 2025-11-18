# ADR-0004: Tailwind CSS v4 모노레포 패키지 스캔 전략

## 📣 상태

채택됨 (Accepted) - 2025-11-18

## 📋 상황

Turborepo 모노레포 환경에서 `packages/ui`의 컴포넌트(Sidebar)에 `min-h-svh` 클래스가 있지만, `apps/home`에서 실행 시 해당 클래스가 CSS에 포함되지 않는 문제 발생.

### 문제의 핵심

```tsx
// packages/ui/src/components/sidebar.tsx (144번 줄)
className="flex min-h-svh w-full"  // ❌ min-h-svh가 CSS에 포함 안 됨

// apps/home/src/app/(main)/layout.tsx (22번 줄)
<SidebarProvider className="flex-col min-h-svh">  // ✅ 여기 추가하면 작동
```

### 원인 분석

Tailwind CSS v4는 CSS-first 접근 방식을 사용하여:

1. `@import 'tailwindcss'`가 있는 CSS 파일 기준으로 작동
2. 기본적으로 **현재 앱의 소스만 스캔**
3. `packages/ui`는 TypeScript만 컴파일되고 CSS 처리는 없음
4. `apps/home` 빌드 시 Tailwind는 home의 소스만 보고 ui 패키지는 스캔하지 않음

**빌드 순서:**

```
1. packages/ui 빌드 (TypeScript 컴파일만)
2. apps/home 빌드 (Tailwind 실행, 하지만 ui 소스 미스캔)
```

## ✋ 나의 생각

- Tailwind v4의 자동 감지가 모노레포 구조를 완벽히 지원하지 못함
- `min-h-svh`만 문제가 아니라 ui 패키지의 모든 클래스가 누락될 수 있음
- 다른 클래스들이 작동한 이유: home 앱에서 우연히 같은 클래스를 사용했기 때문
- 공식 Turborepo + Shadcn + Tailwind v4 템플릿들도 `@source` 지시어를 사용 중
- CSS 크기 증가 vs 개발 경험/안정성의 트레이드오프 고민 필요

### 실제 사례 조사

- [bytaesu/turborepo-shadcn-tailwind-v4](https://github.com/bytaesu/turborepo-shadcn-tailwind-v4): `@source` 필수라고 명시
- [philipptpunkt/turbo-with-tailwind-v4](https://github.com/philipptpunkt/turbo-with-tailwind-v4): packages에서 CSS 빌드하지만 테마만 공유
- Tailwind 공식 문서에서도 "Explicitly Registering Sources" 권장

## 🔨 결정

**선택적 `@source` 지시어 방식 채택**

```css
// apps/home/src/app/styles/base.css
@import './source.css';
```

```css
// apps/home/src/app/styles/source.css
// 여기서 내가 쓰는 컴포넌트 목록만 넣을 것
@source "../../**/*.{tsx,ts}";
@source "../../../node_modules/@repo/ui/src/components/**/*.{tsx,ts}";
```

### 선택 이유

1. **필요한 컴포넌트만 스캔**: 전체 ui 패키지가 아닌 실제 사용하는 `components/` 디렉토리만 지정
2. **안정성 확보**: 동적 클래스명, 조건부 렌더링에도 안전
3. **유지보수성**: 수동으로 Layout에 클래스 추가할 필요 없음
4. **CSS 크기 최적화**: hooks, lib 등 불필요한 디렉토리 제외

## 📊 영향

### 📈 긍정적 영향

- **자동화**: ui 패키지의 모든 컴포넌트 클래스 자동 포함
- **안전성**: 누락된 클래스로 인한 스타일 버그 방지
- **개발 경험**: Layout에 중복 클래스 명시 불필요
- **확장성**: 새 컴포넌트 추가 시 별도 설정 불필요

### 📉 부정적 영향

**CSS 번들 크기 증가 (추정):**

```
현재 방식:         ~30KB (압축 전) → ~6KB (Gzip)
선택적 @source:   ~40KB (압축 전) → ~8KB (Gzip)
차이:             +10KB            → +2KB
```

- 실제 사용자 영향: 2KB ≈ 0.02초 (100Mbps 기준)
- Tailwind의 atomic CSS 특성상 중복 제거 완벽
- 미사용 컴포넌트(Badge, Card 등)의 클래스도 일부 포함

## 📝 고려한 대안

### 1. **현재 방식 유지** (Layout에 클래스 명시)

```tsx
<SidebarProvider className="flex-col min-h-svh">
```

**장점:**

- CSS 크기 최소화 (~6KB Gzip)
- 필요한 클래스만 정확히 포함

**단점:**

- 수동 관리 필요 (휴먼 에러 가능)
- 동적 클래스명 감지 불가
- 컴포넌트 추가 시마다 Layout 수정
- ❌ **채택 안 함**: 유지보수 비용 높음

### 2. **전체 ui 패키지 @source**

```css
@source "../../../node_modules/@repo/ui/src/**/*.{tsx,ts}";
```

**장점:**

- 가장 간단한 설정
- 모든 파일 자동 스캔

**단점:**

- CSS 크기 최대 (~12KB Gzip, +6KB)
- hooks, lib 등 불필요한 파일도 스캔
- ❌ **채택 안 함**: 불필요한 오버헤드

### 3. **packages에서 CSS 빌드 후 import**

```css
@import '@repo/ui/styles.css';
```

**장점:**

- 명시적 의존성
- packages 먼저 빌드하는 구조 활용

**단점:**

- 중복 CSS 생성 (ui에서 생성 + home에서 재생성)
- 동적 클래스 감지 불가
- Tree-shaking 불가능
- ❌ **채택 안 함**: Tailwind v4 구조와 맞지 않음

### 4. **PurgeCSS 후처리 추가**

```json
{
  "build": "next build && purgecss ..."
}
```

**장점:**

- 최종 CSS 크기 최소화
- 실제 사용 클래스만 남김

**단점:**

- 빌드 파이프라인 복잡도 증가
- 빌드 시간 증가
- 설정 오류 시 스타일 깨짐 위험
- ❌ **채택 안 함**: 오버엔지니어링

## 📚 참고자료

- [Tailwind CSS v4 - Detecting Classes in Source Files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [bytaesu/turborepo-shadcn-tailwind-v4](https://github.com/bytaesu/turborepo-shadcn-tailwind-v4) - Critical Configuration 참고
- [philipptpunkt Medium - Setting up Tailwind CSS v4 in a Turbo Monorepo](https://medium.com/@philipptrentmann/setting-up-tailwind-css-v4-in-a-turbo-monorepo-7688f3193039)
- [Turborepo - shadcn/ui Guide](https://turborepo.com/docs/guides/tools/shadcn-ui)
