# ADR-0005: Next.js 및 React 보안 업데이트

## 📣 상태

채택됨 (Accepted) - 2025-12-04

## 📋 상황

2025년 12월 3일, React Server Components 프로토콜에서 Remote Code Execution이 가능한 Critical 보안 취약점 발견됨.

### 보안 취약점 상세

**CVE-2025-66478 (Next.js) & CVE-2025-55182 (React)**

- **심각도**: Critical (최고 등급)
- **공격 유형**: Remote Code Execution (RCE)
- **취약점**: RSC 프로토콜에서 신뢰할 수 없는 입력이 서버 측 실행 동작에 영향을 줄 수 있음
- **위험성**: 공격자가 악의적으로 조작한 요청으로 서버에서 임의 코드 실행 가능

### 영향받는 버전

- Next.js 15.x 전체
- Next.js 16.0.0 ~ 16.0.6
- Next.js 14.3.0-canary.77 이후의 canary 릴리스
- App Router + React Server Components를 사용하는 모든 애플리케이션

### 안전하지 않은 버전

- ❌ Next.js 13.x, 14.x stable: 영향 없음
- ❌ Pages Router: 영향 없음
- ❌ Edge Runtime: 영향 없음

### 패치된 안전 버전

- ✅ Next.js: 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, **16.0.7**
- ✅ React: **19.2.1 이상**

### 문제 부분 (CVE-2025-66478 취약점 분석)

**만약 Next.js 16.0.0을 사용했다면 공격받을 수 있었던 지점:**

#### 🎯 취약 코드 위치

**파일:** `apps/blog/src/app/blog/post/[category]/[slug]/page.tsx`

```typescript
// ⚠️ Next.js 16.0.0에서는 취약했던 코드
export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params; // RSC 프로토콜을 통해 전달됨

  const post = await getPost(category, slug); // 조작된 값이 DB 쿼리로 직행
}
```

**연결된 DB 쿼리:** `apps/blog/src/entities/post/api/getPost.ts`

```typescript
export async function getPost(category: string, slug: string): Promise<Post> {
  const { data, error } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('status', 'published') // 이 필터가 우회될 수 있었음
    .eq('category', category) // 조작된 값
    .eq('slug', slug) // 조작된 값
    .maybeSingle();
}
```

#### 🔴 CVE-2025-66478의 실제 공격 시나리오

**취약점 원리:**

- Next.js 16.0.0의 RSC(React Server Components) 프로토콜에 결함이 있었음
- 악의적인 클라이언트가 **RSC payload를 조작**하여 서버에 전송 가능
- 서버가 조작된 `params` 객체를 신뢰하고 그대로 실행

**구체적인 공격 흐름:**

1. **정상적인 요청:**

```
GET /blog/post/dev/my-post
→ params = { category: 'dev', slug: 'my-post' }
→ DB: WHERE status='published' AND category='dev' AND slug='my-post'
→ 결과: 공개된 포스트만 반환 ✅
```

2. **RSC 프로토콜 조작 공격 (16.0.0 취약점):**

```javascript
// 공격자가 조작한 RSC payload
{
  "params": {
    "category": "dev",
    "slug": "draft-secret-post"  // 아직 공개 안 한 초안
  }
}
```

3. **서버 측 취약점 악용:**

```typescript
// 서버는 조작된 params를 신뢰
const { category, slug } = await params;  // ← RSC 프로토콜에서 받음

// Supabase 쿼리 실행
.eq('status', 'published')  // 이 필터가 있어도
.eq('category', 'dev')      // RSC 레벨에서 이미 조작됨
.eq('slug', 'draft-secret-post')
```

**결과:**

- ❌ `status='draft'`인 비공개 포스트 조회 가능
- ❌ 다른 사용자의 초안 데이터 접근 가능
- ❌ 권한 없이 민감한 정보 유출 가능

#### 🛡️ Next.js 16.0.7에서의 수정사항

**패치 내용:**

- RSC 프로토콜에서 `params` 객체의 무결성 검증 강화
- 클라이언트에서 조작한 payload를 서버가 거부하도록 개선
- Server Components에서 신뢰할 수 없는 입력을 안전하게 처리

**현재 코드가 안전한 이유:**

```typescript
// ✅ Next.js 16.0.7에서는 안전
const { category, slug } = await params;
// → RSC 프로토콜이 강화되어 조작된 값 차단
```

#### 📍 다른 영향받은 지점

**2번째 취약 지점:** `apps/blog/src/app/blog/(main)/[category]/page.tsx`

```typescript
export default async function Page({ params }) {
  const { category } = await params; // RSC로 전달

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const posts = await getPosts(category); // DB 쿼리
}
```

**공격 가능성:**

- `category` 값 조작으로 허용되지 않은 카테고리의 포스트 조회
- 하지만 `VALID_CATEGORIES` 검증이 있어서 부분적으로 방어됨
- RSC 프로토콜 레벨에서는 여전히 취약했을 가능성

#### 🚨 심각도 평가

**만약 16.0.0이었다면:**

| 항목                 | 위험도     | 설명                                  |
| -------------------- | ---------- | ------------------------------------- |
| 정보 유출            | **High**   | 초안/비공개 블로그 포스트 노출        |
| 권한 우회            | **Medium** | `status='published'` 필터 우회 가능   |
| SQL Injection        | **Low**    | Supabase parameterized query로 방어됨 |
| RCE (원격 코드 실행) | **Low**    | 직접적인 코드 실행은 없음             |

**실제 피해 가능성:**

- 블로그 특성상 민감한 개인정보는 적지만
- 작성 중인 초안이나 예정된 발표 내용이 사전 유출될 수 있었음
- 비즈니스 블로그라면 치명적

#### ✅ 현재 안전한 이유

1. **Next.js 16.0.7 패치 적용**
   - RSC 프로토콜 강화로 params 조작 불가능
2. **올바른 params 처리**
   - `await params` 패턴 사용으로 안전하게 처리
3. **추가 검증 로직**
   - `VALID_CATEGORIES` 검증
   - Supabase RLS 정책 (있다면)

## ✋ 나의 생각

- Critical 보안 이슈라서 즉시 대응이 필수라고 판단
- Next.js 16.0.7과 React 19.2.1으로 즉시 업데이트 해야함
- 하지만 문서화를 통해 왜 이 버전을 사용하는지 명확히 할 필요가 있음
- RSC를 사용하는 App Router 기반 프로젝트이기 때문에 직접적인 영향권에 있었음
- 만약 늦게 알았다면 실제 공격에 노출될 수 있었던 심각한 상황

## 🔨 결정

프로젝트 전체를 보안 패치가 적용된 버전으로 유지하고, 최소 버전 요구사항을 문서화함.

### 최소 버전 요구사항

```json
{
  "next": "16.0.7",
  "react": "19.2.1",
  "react-dom": "19.2.1"
}
```

### 현재 프로젝트 버전 현황

| 패키지           | apps/blog | apps/home | packages/ui | 상태    |
| ---------------- | --------- | --------- | ----------- | ------- |
| next             | 16.0.7    | 16.0.7    | -           | ✅ 안전 |
| react            | 19.2.1    | 19.2.1    | ^19.2.1     | ✅ 안전 |
| react-dom        | 19.2.1    | 19.2.1    | ^19.2.1     | ✅ 안전 |
| @types/react     | 19.2.5    | 19.2.5    | ^19.2.0     | ✅ 안전 |
| @types/react-dom | 19.2.2    | 19.2.2    | ^19.2.0     | ✅ 안전 |

## 📊 영향

### 📈 긍정적 영향

- **보안 강화**: Remote Code Execution 취약점 완전 차단
- **RSC 안정화**: 강화된 React Server Components 프로토콜 적용
- **신뢰성**: 프로덕션 환경에서 안전한 서비스 제공 가능
- **컴플라이언스**: 보안 감사 통과 가능한 상태 유지

### 📉 부정적 영향

- React 19와 Next.js 16은 메이저 버전이라 Breaking Changes 존재
- 하지만 이미 사용 중이므로 추가 마이그레이션 비용 없음
- babel-plugin-react-compiler 1.0과의 호환성은 검증 완료

## 📝 고려한 대안

### 1. **Next.js 15.5.7로 다운그레이드**

**장점:**

- 보안 패치 적용됨
- Next.js 15의 안정성

**단점:**

- Next.js 16의 혁신적 기능들 누락
- 이미 16을 사용 중이라 다운그레이드 작업 필요
- ❌ **채택 안 함**: 굳이 다운그레이드할 이유 없음

## 📚 참고자료

- [Next.js Security Advisory (CVE-2025-66478)](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp)
- [React Security Advisory (CVE-2025-55182)](https://www.cve.org/CVERecord?id=CVE-2025-55182)
- [React Blog: Critical Security Vulnerability in RSC](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)
- [Next.js Blog: CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478)
