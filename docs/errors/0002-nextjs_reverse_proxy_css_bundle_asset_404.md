# Error-0002: Nextjs reverse proxy css bundle asset 404

## 📣 해결 여부

해결 - 2025-11-19

## 📋 상황

### 1단계: 초기 문제 - CSS/JS 번들 404

home app에서 `vercel.json`만 작성하여 reverse proxy를 구성했을 때:

- HTML은 정상적으로 로드됨
- CSS와 JS 번들 파일이 404 에러 발생
- `_next/static/` 경로의 자산들이 잘못된 주소로 요청됨

```txt
GET https://demopeu.vercel.app/_next/... 404 (Not Found)
```

### 2단계: basePath 추가 후 새로운 문제

`basePath: '/blog'` 추가로 CSS/JS는 로드되었지만:

- **Vercel 프리뷰 기능 사용 불가** 발생
- blog 앱 단독 접속 시 경로 문제 (프리뷰 URL에서 `/blog` 중복)

### 3단계: redirects 추가 후 정적 자산 문제

`redirects`를 사용하여 루트 경로를 `/blog`로 리다이렉트했지만:

- **public 폴더의 정적 자산 경로 문제** 발생
- `Image src="/vercel.svg"` → 404 에러
- `basePath`가 적용되어 `/blog/vercel.svg`로 변경 필요

```txt
Request URL:
https://blog-blog-nwpjww3lq-dnanf12345-7713s-projects.vercel.app/blog/vercel.svg
Status Code: 404 Not Found
```

### 4단계: 모든 정적 자산 경로 수정 필요

모든 이미지와 정적 파일 참조를 `/blog/` prefix와 함께 수정해야 함:

- Before: `<Image src="/vercel.svg" />`
- After: `<Image src="/blog/vercel.svg" />`

## 🔨 해결 방법

1. vercel.json에 rewrites를 추가하여 reverse proxy시킴.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/blog",
      "destination": "https://blog-blog-theta.vercel.app/blog"
    },
    {
      "source": "/blog/:path*",
      "destination": "https://blog-blog-theta.vercel.app/blog/:path*"
    }
  ]
}
```

2. blog app의 next.config.ts에 basePath를 추가하여 reverse proxy된 주소로 public 폴더의 파일들을 요청할 수 있도록 했음.

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  basePath: '/blog',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
        basePath: false,
      },
    ];
  },
};
```

3. next/image 컴포넌트에서 /blog/를 추가하여 reverse proxy된 주소로 이미지 파일들을 요청할 수 있도록 했음.

## 📊 가정한 문제 원인

### 근본 원인: Next.js의 basePath와 Reverse Proxy 간 경로 불일치

1. **CSS/JS 번들 404 문제**
   - Next.js는 기본적으로 `/_next/static/` 경로에서 번들 파일 제공
   - Reverse proxy는 `/blog` prefix만 전달
   - `basePath` 미설정 시: blog 앱은 자신이 루트(`/`)에서 실행된다고 가정
   - 결과: `/_next/static/...` → `/blog/_next/static/...` 변환 실패

2. **Vercel 프리뷰 기능 불가 문제**
   - blog 앱에 `basePath: '/blog'` 설정
   - Vercel 프리뷰 URL: `https://blog-xxx.vercel.app/`
   - blog 앱이 `/blog` 경로를 기대하지만 프리뷰는 루트 경로 제공
   - 결과: 프리뷰 환경에서는 `/blog/blog/...` 같은 중복 경로 발생

3. **정적 자산 경로 문제**
   - `basePath` 설정 시 모든 라우팅이 `/blog` prefix 포함
   - Next.js의 자동 경로 처리는 페이지 라우팅에만 적용
   - `public/` 폴더 파일 참조는 개발자가 수동으로 prefix 추가 필요
   - `next/image`의 `src` prop도 `basePath` 인식하지 않음

4. **Turborepo 모노레포 특성**
   - 각 앱이 독립적으로 배포되지만 단일 도메인 제공 목표
   - 전통적인 monolith와 달리 앱 간 경로 조율 필요
   - 개발/프로덕션 환경의 URL 차이 (localhost vs 프로덕션 도메인)

## 📝 고려한 대안

### 1. 현재 방식: vercel.json in app (임시 해결)

**구조:**

```
apps/
  home/
    vercel.json  ← rewrites 설정
  blog/
    next.config.ts ← basePath: '/blog'
```

**장점:**

- 설정이 간단하고 직관적
- 추가 프로젝트 생성 불필요

**단점:**

- ❌ Vercel 프리뷰 기능 사용 불가
- ❌ 모든 정적 자산 경로를 수동으로 `/blog/` prefix 추가 필요
- ❌ 비표준 패턴 (Vercel 공식 권장 아님)
- ❌ 개발 환경에서 프록시 동작 안 함

---

### 2. Next.js Multi Zones (next.config rewrites)

**구조:**

```typescript
// apps/home/next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog-blog-theta.vercel.app/blog/:path*',
      },
    ];
  },
};

// apps/blog/next.config.ts
const nextConfig = {
  basePath: '/blog',
};
```

**장점:**

- ✅ Vercel 공식 권장 표준 패턴
- ✅ Next.js 네이티브 기능으로 타입 안전성
- ✅ 개발 환경에서도 로컬 프록시 가능
- ✅ 공식 문서 및 예제 풍부

**단점:**

- ⚠️ 여전히 정적 자산 경로 수동 관리 필요
- ⚠️ Vercel 프리뷰 문제는 동일하게 발생

**참고:**

- https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones
- https://github.com/vercel/next.js/tree/canary/examples/with-zones

---

### 3. Proxy Project (순수 프록시)

**구조:**

```
/
├── project-proxy/       # vercel.json만 존재
│   └── vercel.json
├── apps/
│   ├── home/           # home.domain.com
│   └── blog/           # blog.domain.com (basePath 없음)
```

```json
// project-proxy/vercel.json
{
  "rewrites": [
    {
      "source": "/blog/:path*",
      "destination": "https://blog.domain.com/:path*"
    },
    {
      "source": "/:path*",
      "destination": "https://home.domain.com/:path*"
    }
  ]
}
```

**장점:**

- ✅ 각 앱이 완전히 독립적으로 배포
- ✅ **basePath 불필요** - 정적 자산 경로 문제 해결
- ✅ **Vercel 프리뷰 정상 작동**
- ✅ 라우팅 로직이 한 곳에 집중
- ✅ 앱 간 의존성 최소화

**단점:**

- ⚠️ 추가 Vercel 프로젝트 필요 (총 3개)
- ⚠️ 초기 설정 복잡도 증가

**참고:**

- https://vercel.com/guides/how-can-i-serve-multiple-projects-under-a-single-domain
- https://drew.tech/posts/vercel-multiple-repos-same-domain

---

### 4. Vercel Microfrontends (최신 권장)

**구조:**

```typescript
// apps/home/next.config.ts
import { withMicrofrontends } from '@vercel/microfrontends'

const nextConfig = {}
export default withMicrofrontends(nextConfig)

// apps/home/microfrontends.json
{
  "applications": {
    "blog": {
      "development": {
        "url": "http://localhost:3001"
      },
      "production": {
        "url": "https://blog-blog-theta.vercel.app"
      }
    }
  }
}
```

**장점:**

- ✅ **Vercel 최신 권장 방식** (2024+)
- ✅ 자동 프록싱 (개발/프로덕션)
- ✅ Turborepo와 완벽 통합
- ✅ TypeScript 지원
- ✅ 개발 환경 자동 구성

**단점:**

- ⚠️ 상대적으로 새로운 기술 (문서 부족)
- ⚠️ basePath 문제는 동일 가능성
- ⚠️ 추가 학습 곡선

**참고:**

- https://vercel.com/docs/microfrontends
- https://vercel.com/templates/next.js/microfrontends-multi-zones

---

## 🎯 권장 솔루션 비교

| 방식                   | 복잡도 | Vercel 프로젝트 수 | 프리뷰 지원 | 정적 자산   | 표준성  |
| ---------------------- | ------ | ------------------ | ----------- | ----------- | ------- |
| **현재 (vercel.json)** | 낮음   | 2개                | ❌          | 수동        | 비표준  |
| **Multi Zones**        | 낮음   | 2개                | ❌          | 수동        | ⭐ 표준 |
| **Proxy Project**      | 중간   | 3개                | ✅          | ✅ 자동     | 표준    |
| **Microfrontends**     | 높음   | 2개                | ⚠️ 확인필요 | ⚠️ 확인필요 | ⭐ 최신 |

### 최종 권장

1. **단기 해결**: Multi Zones 방식 (표준 패턴)
2. **장기 확장**: Proxy Project (완전한 독립성) 또는 Microfrontends (최신 기술)

## 📚 참고자료

### 공식 문서

- [Next.js Multi Zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones)
- [Vercel Monorepos Guide](https://vercel.com/docs/monorepos/turborepo)
- [Vercel Multiple Projects Single Domain](https://vercel.com/guides/how-can-i-serve-multiple-projects-under-a-single-domain)
- [Vercel Microfrontends](https://vercel.com/docs/microfrontends)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [Next.js assetPrefix](https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix)

### 예제 및 템플릿

- [Next.js Multi Zones Example](https://github.com/vercel/next.js/tree/canary/examples/with-zones)
- [Vercel Microfrontends Starter](https://vercel.com/templates/next.js/microfrontends-multi-zones)

### 관련 이슈

- [Vercel Discussion - Monorepo subdirectories](https://github.com/vercel/vercel/discussions/8662)
- [Next.js Multi-Zone Discussion](https://github.com/vercel/next.js/discussions/81225)
