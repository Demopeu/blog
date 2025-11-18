# ADR-0003: 모노레포 마이그레이션 (Turborepo 채택)

## 📣 상태

채택됨 (Accepted) - 2025-11-17

## 📋 상황

단일 레포지토리로 시작한 blog 프로젝트를 멀티레포(Multiple Repositories)로 분리하려고 시도했으나, 다음과 같은 문제들이 발생:

### 발견된 문제점

1. **중복 코드 폭발**: UI 컴포넌트, 유틸리티 함수, 타입 정의가 각 레포에 중복됨
2. **버전 관리 복잡성**: 공통 컴포넌트 수정 시 여러 레포지토리에 동시 배포 필요
3. **의존성 동기화**: React, Next.js, TypeScript 등의 버전을 수동으로 맞춰야 함
4. **개발 경험 저하**: 여러 레포지토리를 동시에 열고 작업해야 함
5. **빌드 파이프라인 중복**: CI/CD 설정이 각 레포마다 필요

### 현재 프로젝트 구조 요구사항

- **apps/home**: 포트폴리오 메인 페이지
- **apps/blog**: 블로그 콘텐츠 페이지
- **공통 요소**: Shadcn UI 컴포넌트, Tailwind 설정, TypeScript 설정, ESLint 설정

## ✋ 나의 생각

- 멀티레포는 대규모 조직에서는 의미가 있지만, 1인 개발자에게는 오버헤드가 너무 큼
- 하지만 단순 pnpm workspace만 쓰기에는 빌드 최적화가 아쉬움
- Vercel에서 배포하고 있고, Vercel이 Turborepo를 만들었으니 최적화가 잘 되어 있을 것으로 예상
- 기술을 시험하는 블로그이기 때문에 조금 더 도전적인 선택을 하고 싶음
- Turborepo의 함수 수준 캐싱과 병렬 빌드는 매력적

### 레퍼런스 조사

- [Vercel 공식 문서](https://vercel.com/docs/monorepos/turborepo)에서 Turborepo 최적화 언급
- Shadcn UI도 모노레포 구조를 공식 지원 시작
- Next.js 16에서 Turbopack 정식 채택으로 Turborepo와의 시너지 기대

## 🔨 결정

**Turborepo 기반 모노레포로 마이그레이션**

```
blog-monorepo/
├── apps/
│   ├── home/          # 포트폴리오 메인
│   └── blog/          # 블로그
├── packages/
│   ├── ui/            # Shadcn UI 컴포넌트
│   ├── tailwind-config/  # Tailwind 공통 설정
│   ├── typescript-config/ # TypeScript 설정
│   └── eslint-config/     # ESLint 설정
├── turbo.json         # Turborepo 파이프라인 설정
└── pnpm-workspace.yaml
```

## 📊 영향

### 📈 긍정적 영향

**개발 경험:**

- 한 번의 `git clone`으로 전체 프로젝트 설정 완료
- 컴포넌트 수정 시 실시간으로 모든 앱에 반영
- 단일 IDE 창에서 전체 프로젝트 작업 가능

**코드 품질:**

- 중복 코드 제거 (DRY 원칙 준수)
- 타입 안전성 향상 (공통 타입 정의 사용)
- 일관된 코딩 스타일 (공통 ESLint, Prettier 설정)

**빌드 최적화:**

- 함수 수준 캐싱으로 빌드 시간 단축 (~40% 예상)
- 병렬 빌드로 전체 빌드 시간 감소
- 변경된 패키지만 선택적으로 재빌드

**배포:**

- Vercel에서 Turborepo 네이티브 지원
- Remote Caching으로 CI/CD 시간 단축
- 하나의 PR로 여러 앱 동시 배포 가능

### 📉 부정적 영향

**초기 설정 비용:**

- 모노레포 구조 설계 학습 곡선
- 기존 코드를 packages로 분리하는 마이그레이션 작업
- Turborepo 파이프라인 설정 필요

**복잡도 증가:**

- 의존성 그래프 관리 필요
- 패키지 간 순환 참조 주의 필요
- 빌드 순서 및 캐싱 전략 이해 필요

**저장소 크기:**

- 모든 앱이 하나의 레포에 있어 clone 크기 증가
- 하지만 개인 프로젝트 규모에서는 무시 가능

## 📝 고려한 대안

### 1. **멀티레포 (Multiple Repositories)**

**구조:**

```
blog-home/
blog-content/
shared-ui/
shared-config/
```

**장점:**

- 각 레포의 완전한 독립성
- 팀별로 레포 권한 분리 가능
- 각 앱의 배포 주기 완전 독립

**단점:**

- 중복 코드 관리 어려움
- 공통 컴포넌트 수정 시 여러 레포에 반영 필요
- 의존성 버전 동기화 수동 작업
- 개발 환경 설정 번거로움
- ❌ **채택 안 함**: 1인 개발자에게는 오버헤드가 너무 큼

### 2. **pnpm workspace 단일**

**구조:**

```
blog-workspace/
├── apps/
└── packages/
└── pnpm-workspace.yaml  (Turborepo 없음)
```

**장점:**

- 설정이 간단함 (pnpm-workspace.yaml만)
- 의존성 관리 용이 (pnpm의 심볼릭 링크)
- Turborepo 없이도 모노레포 가능
- 학습 곡선이 낮음

**단점:**

- 빌드 최적화 부족 (캐싱 없음)
- 병렬 빌드 수동 설정 필요
- 의존성 그래프 자동 처리 없음
- Vercel 배포 시 최적화 부족
- ❌ **채택 안 함**: 빌드 성능과 배포 최적화가 아쉬움

## 🎯 Turborepo 선택 이유 상세

### 1. **Vercel 네이티브 지원**

- Vercel이 Turborepo를 인수하여 직접 개발 중
- Vercel 배포 시 자동 Turborepo 감지 및 최적화
- Remote Caching이 Vercel에서 무료 제공

### 2. **Next.js와의 시너지**

- Next.js 16의 Turbopack과 함께 사용 시 최적 성능
- Vercel 팀이 Next.js와 Turborepo 모두 개발
- 공식 문서에서 Best Practice 제공

### 3. **학습 곡선과 성능의 균형**

- 간단한 설정
- pnpm workspace보다 강력한 캐싱
- 함수 수준 캐싱으로 증분 빌드 최적화

### 4. **기술 실험 목적 부합**

- 최신 빌드 도구 경험
- Rust 기반 고성능 빌드 시스템
- 블로그 콘텐츠 소재로 활용 가능

## 📚 마이그레이션 계획

### Phase 1: 구조 설정

- [x] Turborepo 초기 설정
- [x] pnpm workspace 설정
- [x] 기본 디렉토리 구조 생성

### Phase 2: 공통 패키지 분리

- [x] `@repo/ui` - Shadcn UI 컴포넌트
- [x] `@repo/tailwind-config` - Tailwind 설정
- [x] `@repo/typescript-config` - TypeScript 설정
- [x] `@repo/eslint-config` - ESLint 설정

### Phase 3: 앱 마이그레이션

- [x] apps/home 마이그레이션
- [x] apps/blog 마이그레이션

### Phase 4: 최적화

- [x] Turborepo 파이프라인 설정 (turbo.json)
- [x] 병렬 빌드 설정

## 📊 예상 성능 개선

| 항목        | 단일레포/멀티레포  | Turborepo 모노레포 | 개선율      |
| ----------- | ------------------ | ------------------ | ----------- |
| 초기 빌드   | ~180초 (전체)      | ~180초 (캐시 없음) | 0%          |
| 증분 빌드   | ~180초 (변경 무관) | ~40초 (캐시 활용)  | 77%         |
| 개발 시작   | ~30초 (각 앱)      | ~15초 (병렬)       | 50%         |
| 의존성 설치 | 중복 설치          | pnpm 심볼릭 링크   | 디스크 절약 |

## 📚 참고자료

- [Turborepo 공식 문서](https://turbo.build/repo/docs)
- [Vercel - Monorepos with Turborepo](https://vercel.com/docs/monorepos/turborepo)
- [Shadcn UI - Monorepo Guide](https://ui.shadcn.com/docs/monorepo)
- [Why Turborepo - Vercel Blog](https://vercel.com/blog/vercel-acquires-turborepo)
