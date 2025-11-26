# Error-0003: GET https://demopeu.vercel.app/blog/problem-solving?_rsc=1r34m 404 (Not Found)

## 📣 해결 여부

해결 - 2025-11-26

## 📋 상황

### 1단계: RSC 요청 404 에러

**환경 설정:**

- home 앱 (`demopeu.vercel.app`): Next.js 16.0.0
- blog 앱 (`blog-blog-theta.vercel.app`): Next.js 16.0.3, `basePath: '/blog'` 설정
- home의 `vercel.json`으로 `/blog` 경로를 blog 앱으로 프록시

**문제 증상:**

- 초기 페이지 로드는 정상 작동 (`https://demopeu.vercel.app/blog/typescript` ✅)
- blog 앱에 직접 접속도 정상 작동 (`https://blog-blog-theta.vercel.app/blog/typescript` ✅)
- 하지만 **RSC(React Server Components) 요청이 404 에러 발생** ❌

**에러 로그:**

```txt
GET https://demopeu.vercel.app/blog/typescript?_rsc=1r34m 404 (Not Found)
GET https://demopeu.vercel.app/blog/dev?_rsc=1r34m 404 (Not Found)
GET https://demopeu.vercel.app/blog/post/dev/next16-blog-setup-2?_rsc=1r34m 404 (Not Found)
```

**현재 설정:**

```json
// apps/home/vercel.json
{
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

```typescript
// apps/blog/next.config.ts
{
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
}
```

## 🔨 해결 방법

### 1. Vercel Microfrontends 패키지 설치

```bash
pnpm add @vercel/microfrontends
```

### 2. microfrontends.json 설정

```json
// apps/home/microfrontends.json
{
  "$schema": "https://openapi.vercel.sh/microfrontends.json",
  "applications": {
    "blog-home": {
      "development": {
        "task": "dev",
        "local": 3000,
        "fallback": "https://demopeu.vercel.app"
      }
    },
    "blog-blog": {
      "routing": [{ "paths": ["/blog", "/blog/:path*"] }],
      "development": {
        "task": "dev",
        "local": 3001
      }
    }
  }
}
```

### 3. Next.js 설정에 withMicrofrontends 적용

```typescript
// apps/home/next.config.ts
import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
};

export default withMicrofrontends(nextConfig);
```

```typescript
// apps/blog/next.config.ts
import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  // basePath 제거됨
};

export default withMicrofrontends(nextConfig);
```

### 4. Cross-Zone Navigation 컴포넌트 설정

**Provider 추가:**

```typescript
// apps/home/src/app/provider/cross-zone-links-provider.tsx
import { PrefetchCrossZoneLinksProvider } from '@vercel/microfrontends/next/client';

export function CrossZoneLinksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrefetchCrossZoneLinksProvider>{children}</PrefetchCrossZoneLinksProvider>
  );
}
```

**Layout에 적용:**

```typescript
// apps/home/src/app/layout.tsx
import { PrefetchCrossZoneLinks } from '@vercel/microfrontends/next/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  );
}
```

### 5. Link 컴포넌트 교체

크로스존 네비게이션이 필요한 곳에서 `@vercel/microfrontends/next/client`의 `Link` 사용:

```typescript
// 로컬 라우팅
import NextLink from 'next/link';

// 크로스존 라우팅
import { Link as MicroLink } from '@vercel/microfrontends/next/client';

export function NavBar({ navItems, local = true }) {
  const Link = local ? NextLink : MicroLink;

  return (
    <nav>
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
```

### 6. 개발 서버 실행

```bash
pnpm dev
```

Microfrontends 프록시가 자동으로 시작되며 `http://localhost:3024` (또는 지정한 포트)에서 접속 가능합니다.

## 📊 가정한 문제 원인

### Next.js App Router의 RSC Prefetch 동작

Next.js 13+ App Router는 기본적으로 **React Server Components(RSC)**를 사용하며, 링크에 마우스를 올리거나 viewport에 들어올 때 자동으로 prefetch를 수행한다.

**문제의 핵심:**

1. **Prefetch 요청 경로**
   - Next.js는 prefetch 시 `?_rsc=xxx` 쿼리 파라미터를 포함한 RSC 요청 생성
   - 예: `https://demopeu.vercel.app/blog/typescript?_rsc=1r34m`

2. **Reverse Proxy의 한계**
   - `vercel.json`의 rewrites는 정적 경로만 처리
   - RSC prefetch 요청은 브라우저 단에서 발생하며, Next.js 내부 로직으로 처리됨
   - 일반 HTTP 프록시로는 Next.js의 RSC 메커니즘을 가로챌 수 없음

3. **basePath의 문제**
   - `basePath: '/blog'` 설정 시, blog 앱은 자신이 `/blog` 경로에서 실행된다고 가정
   - 하지만 RSC prefetch는 원본 도메인(`demopeu.vercel.app`)으로 요청
   - blog 앱은 자신의 도메인(`blog-blog-theta.vercel.app`)에서만 RSC를 제공
   - 결과: Cross-origin RSC 요청 실패

### 나의 결론

**App Router의 RSC는 클라이언트 단에서 직접 처리되므로, 서버 레벨 프록시만으로는 해결 불가능**했다.

## 📝 고려한 대안

### 1. Prefetch 비활성화 (임시 해결)

모든 크로스존 Link에서 `prefetch={false}` 설정:

```typescript
<Link href="/blog" prefetch={false}>
  Blog
</Link>
```

**장점:**

- ✅ RSC 404 에러 즉시 해결
- ✅ 설정 간단

**단점:**

- ❌ 사용자 경험 저하 (페이지 전환 속도 느려짐)
- ❌ Next.js의 성능 최적화 기능 상실
- ❌ 근본적인 해결책 아님

### 2. 시도했으나 실패한 방법들

다음 방법들은 **RSC prefetch 요청을 가로챌 수 없었음**:

1. **vercel.json rewrites 조정**
   - RSC 요청은 브라우저에서 직접 발생하여 서버 프록시 우회

2. **Next.js rewrites 사용**
   - 동일한 이유로 RSC prefetch 처리 불가

3. **assetPrefix 설정**
   - 정적 자산 경로만 변경, RSC 로직은 미적용

4. **Custom Server**
   - Vercel 환경에서 사용 불가, RSC 메커니즘 직접 제어 어려움

### 최종 해결: Vercel Microfrontends

**유일한 근본 해결책**은 Vercel의 공식 Microfrontends 패키지 사용뿐이였다.

- `@vercel/microfrontends`는 Next.js의 RSC 메커니즘을 이해하고 처리
- Cross-zone prefetch를 네이티브 지원
- `PrefetchCrossZoneLinks`로 RSC 요청을 올바른 앱으로 라우팅

## 📚 참고자료

### 공식 문서

- [Vercel Microfrontends - Managing Microfrontends](https://vercel.com/docs/microfrontends/managing-microfrontends?framework=nextjs-app)
- [Vercel Microfrontends](https://vercel.com/docs/microfrontends)
- [Next.js Multi Zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones)

### 예제 및 템플릿

- [Vercel Microfrontends Starter](https://vercel.com/templates/next.js/microfrontends-multi-zones)

### @vercel/microfrontends의 동작 원리

일반 프록시와 달리, `@vercel/microfrontends`는 다음과 같이 동작한다:

#### 1. Next.js 내부 통합

```typescript
// withMicrofrontends가 Next.js 빌드 프로세스에 개입
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
export default withMicrofrontends(nextConfig);
```

- Next.js 빌드 시점에 microfrontends 설정 주입
- 각 앱이 다른 앱의 존재와 경로를 인식하도록 설정

#### 2. 클라이언트 사이드 라우팅 인터셉트

```typescript
import { Link } from '@vercel/microfrontends/next/client';
import { PrefetchCrossZoneLinks } from '@vercel/microfrontends/next/client';
```

- 일반 `next/link`를 대체하는 커스텀 Link 컴포넌트
- **브라우저 단에서 RSC 요청을 가로채서 올바른 앱 도메인으로 변경**
- `PrefetchCrossZoneLinks`가 모든 크로스존 링크의 prefetch를 관리

#### 3. Vercel 인프라 레벨 지원

- Vercel 배포 시 `microfrontends.json` 기반으로 자동 라우팅 설정
- Edge Network에서 각 앱으로의 요청을 최적화
- RSC 요청 헤더를 분석하여 올바른 origin으로 프록시

#### 핵심 차이점

| 방식                       | 처리 레벨                      | RSC 요청                               |
| -------------------------- | ------------------------------ | -------------------------------------- |
| vercel.json rewrites       | 서버 프록시                    | ❌ 브라우저가 직접 요청하여 우회       |
| Next.js rewrites           | 서버 사이드                    | ❌ 클라이언트 prefetch는 미처리        |
| **@vercel/microfrontends** | **클라이언트 + 서버 + 인프라** | ✅ **브라우저 단에서 가로채서 라우팅** |

**결론**: 서버 레벨이 아닌 **클라이언트 레벨에서 RSC 요청을 가로채는 것**이 핵심이다.
