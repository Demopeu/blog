# Error-0003: GET https://demopeu.vercel.app/blog/problem-solving?_rsc=1r34m 404 (Not Found)

## 📣 해결 여부

해결중 - 2025-11-26

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

## 📝 고려한 대안

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
