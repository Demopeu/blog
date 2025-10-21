# 🧩 FSD 구조

- **shared(공유 컴포넌트)**  
  - slice 없음  
  - 공용 UI(shadcn), lib(유틸), config(env·상수), hooks, provider(전역 Context), 전역 api(fetch)

- **entities(데이터)**   
  - 도메인 단위(User, Product 등)의 타입·api·ui 구성

- **features(행동)**   
  - 로그인, 장바구니 담기 등 사용자 행위를 중심으로 구성
  - slice 폴더 이름 또한 동사로 제작

- **widgets(묶음)**  
  - feature의 묶음 / 어떻게 묶을지는 재사용 여부에 따라 페이지 섹션 단위(layout 포함 묶음 전부 포함)

## 🔁 규칙

### ⚙️ 의존성 규칙
```
widgets → features → entities → shared
```

- 상위 → 하위로만 import 가능  
- `shared`는 누구에게도 의존하지 않음

### 📦 폴더 구조 규칙

- index.ts로 export 하도록 구성(무조건 캡슐화)
