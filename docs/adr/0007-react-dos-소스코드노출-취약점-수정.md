# ADR-0007: React Server Components DoS 및 소스 코드 노출 취약점 수정

## 📣 상태

채택됨 (Accepted) - 2025-12-12

## 📋 상황

2025년 12월 11일, React Server Components에서 **DoS(Denial of Service)** 및 **소스 코드 노출** 취약점이 추가로 발견됨.

### 보안 취약점 상세

이 취약점들은 이전 CVE-2025-55182(ADR-0005)와 동일한 패키지 및 버전에 존재함.

#### 1. **High Severity: Denial of Service (DoS)**

**CVE-2025-55184, CVE-2025-67779**

- **심각도**: 7.5 (High)
- **공격 유형**: Denial of Service
- **취약점**: 악의적으로 조작된 HTTP 요청이 Server Functions 엔드포인트로 전송되면, React가 역직렬화 과정에서 무한 루프에 빠져 서버 프로세스가 중단되고 CPU를 소진함
- **위험성**: Server Functions 엔드포인트가 없더라도 React Server Components를 지원하면 취약점 존재
- **영향**: 사용자의 서비스 접근 차단 및 서버 환경 성능 저하

**공격 시나리오:**

```
공격자가 조작한 HTTP 요청
→ React Server Component 엔드포인트
→ 역직렬화 과정에서 무한 루프 발생
→ CPU 100% 사용, 서버 응답 불가
→ 서비스 다운
```

#### 2. **Medium Severity: Source Code Exposure**

**CVE-2025-55183**

- **심각도**: 5.3 (Medium)
- **공격 유형**: Source Code Leakage
- **취약점**: 악의적인 HTTP 요청이 취약한 Server Function으로 전송되면, 인자를 문자열화할 때 Server Function의 소스 코드가 노출될 수 있음
- **전제 조건**: 명시적 또는 암시적으로 인자를 문자열화하는 Server Function 존재 필요

**취약한 코드 예시:**

```typescript
'use server';

export async function serverFunction(name) {
  const conn = db.createConnection('SECRET KEY');
  const user = await conn.createUser(name); // 암시적 문자열화, DB로 유출
  return {
    id: user.id,
    message: `Hello, ${name}!`, // 명시적 문자열화, 응답으로 유출
  };
}
```

**공격 시 유출 가능한 정보:**

```json
{
  "message": "Hello, async function(a){let b=i.createConnection(\"SECRET KEY\");return{id:(await b.createUser(a)).id}}!"
}
```

→ 서버 함수 소스 코드와 비밀 키가 그대로 노출됨

### 영향받는 버전

- React 19.0.0, 19.0.1, 19.0.2, 19.1.0, 19.1.1, 19.1.2, 19.2.0, 19.2.1, **19.2.2**
- 영향받는 패키지:
  - `react-server-dom-webpack`
  - `react-server-dom-parcel`
  - `react-server-dom-turbopack`

### 패치된 안전 버전

- ✅ React: 19.0.3, 19.1.4, **19.2.3**
- ✅ Next.js: 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7

### Timeline

- **12월 3일**: Andrew MacPherson가 소스 코드 유출 취약점 보고
- **12월 4일**: RyotaK가 초기 DoS 취약점 보고
- **12월 6일**: React 팀이 두 이슈 확인 및 조사 시작
- **12월 7일**: 초기 수정안 작성 및 검증 시작
- **12월 8일**: 영향받는 호스팅 제공업체 및 오픈소스 프로젝트에 통보
- **12월 10일**: 호스팅 제공업체 완화 조치 완료 및 패치 검증
- **12월 11일**: Shinsaku Nomura가 추가 DoS 취약점 보고
- **12월 11일**: 패치 배포 및 CVE-2025-55183, CVE-2025-55184 공개
- **12월 11일**: 내부에서 누락된 DoS 케이스 발견, CVE-2025-67779로 패치 및 공개

## ✋ 나의 생각

### 우리 프로젝트는 안전한가?

**✅ 결론: 현재 프로젝트는 안전함**

1. **React 19.2.3 업데이트 완료**
   - 이미 패치된 버전(19.2.3)을 사용 중
   - 모든 앱과 패키지에서 일관된 버전 유지

2. **Server Functions 미사용**
   - `'use server'` 지시어 사용 코드 없음
   - Server Actions 구현 없음
   - 따라서 소스 코드 노출 취약점(CVE-2025-55183)의 영향을 받지 않음

3. **React Server Components는 사용 중**
   - Next.js 16 App Router 사용으로 RSC 활성화
   - 하지만 Server Functions 엔드포인트가 없으므로 DoS 공격 표면 최소화
   - 그래도 RSC를 사용하면 일부 DoS 위험 존재 가능

### 만약 19.2.2였다면?

**잠재적 위험:**

| 취약점                          | 위험도     | 우리 프로젝트 영향                                  |
| ------------------------------- | ---------- | --------------------------------------------------- |
| DoS (CVE-2025-55184, 67779)     | **Medium** | RSC 사용으로 일부 위험 존재 (Server Functions 없음) |
| 소스 코드 노출 (CVE-2025-55183) | **Low**    | Server Functions 미사용으로 영향 없음               |

**DoS 공격 가능성:**

- Server Functions를 구현하지 않았지만, RSC 프로토콜 자체에 DoS 취약점 존재
- 악의적인 요청으로 RSC 역직렬화 과정에서 무한 루프 유발 가능
- 서버 다운 및 사용자 접근 차단 가능

**소스 코드 노출 가능성:**

- ❌ **영향 없음**: 'use server'를 사용한 Server Functions가 없음
- 따라서 소스 코드 유출 공격 표면 자체가 없음

### 왜 즉시 업데이트했나?

1. **RSC 사용으로 DoS 위험 존재**
   - Server Functions가 없어도 RSC만으로 DoS 가능
   - 프로덕션 환경에서 서비스 다운은 치명적

2. **예방적 보안**
   - 향후 Server Actions 도입 가능성
   - 미리 패치하여 안전한 기반 확보

3. **최소한의 비용**
   - 패치 버전 업그레이드(19.2.2 → 19.2.3)로 Breaking Changes 없음
   - 즉시 적용 가능

## 🔨 결정

**React 19.2.3 및 React-DOM 19.2.3으로 즉시 업데이트하여 모든 취약점 패치 적용**

### 패치 내용

1. **DoS 취약점 수정**
   - 무한 루프를 유발하는 역직렬화 케이스 차단
   - RSC 프로토콜에서 악의적인 payload 처리 개선

2. **소스 코드 노출 수정**
   - Server Function 소스 코드의 문자열화 방지
   - 인자 직렬화 과정에서 함수 코드 유출 차단

### 현재 프로젝트 버전 현황

| 패키지    | apps/blog | apps/home | packages/ui | 상태    | 변경사항              |
| --------- | --------- | --------- | ----------- | ------- | --------------------- |
| react     | 19.2.3    | 19.2.3    | ^19.2.3     | ✅ 안전 | 19.2.2 → 19.2.3       |
| react-dom | 19.2.3    | 19.2.3    | ^19.2.1     | ✅ 안전 | 19.2.2 → 19.2.3       |
| next      | 16.0.7    | 16.0.7    | -           | ✅ 안전 | 변경 없음 (이미 안전) |

## 📊 영향

### 📈 긍정적 영향

- **DoS 공격 방어**: 무한 루프 유발 공격 차단
- **서비스 안정성**: 프로덕션 환경에서 예기치 않은 다운타임 방지
- **소스 코드 보호**: Server Functions 도입 시에도 안전한 기반 확보
- **컴플라이언스**: 최신 보안 패치 적용으로 보안 감사 통과 가능
- **예방적 보안**: 향후 Server Actions 도입 시에도 안전

### 📉 부정적 영향

- **없음**: 패치 버전 업그레이드로 Breaking Changes 없음
- 기존 코드와 100% 호환

## 📝 고려한 대안

### 1. **React 19.2.2 유지**

**장점:**

- 변경 없음

**단점:**

- DoS 공격에 취약
- 서비스 다운 위험
- ❌ **채택 안 함**: 보안 위험이 너무 큼

### 2. **React 19.2.3 업데이트 (선택됨)**

**장점:**

- ✅ 모든 취약점 패치
- ✅ Breaking Changes 없음
- ✅ Server Functions 도입 준비 완료
- ✅ 최소 비용으로 최대 보안

**단점:**

- 없음

**✅ 채택함**: 가장 안전하고 효과적인 방법

## 📚 참고자료

- [React Blog: DoS and Source Code Exposure in RSC (2025-12-11)](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components)
- [CVE-2025-55183 (Source Code Exposure)](https://www.cve.org/CVERecord?id=CVE-2025-55183)
- [CVE-2025-55184 (Denial of Service)](https://www.cve.org/CVERecord?id=CVE-2025-55184)
- [CVE-2025-67779 (Additional DoS Case)](https://www.cve.org/CVERecord?id=CVE-2025-67779)
- [React 19.2.3 Release Notes](https://github.com/facebook/react/releases/tag/v19.2.3)
- [ADR-0005: Next.js 및 React 보안 업데이트 (CVE-2025-55182)](./0005-nextjs_react-보안-업데이트.md)
