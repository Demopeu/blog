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


# 공부했던 것

## FSD 구조

1. 과연 3개의 깊이로 모든것이 표현 될까? 이것이 의문이였고 슬라이스의 명확한 정의를 모르겠다.

- 슬라이스에서 index.ts로 export 하도록 구성(무조건 캡슐화). 이유는 그 아래 뎁스에서 ui,model,api들도 안꺼내 쓸꺼 있으니까.
- 만약 header가 많으면 widgets/header/mainheader가 아니라 바로 widgets/main-header이런식으로 계속 계속 늘리는거. 그리고 합치는 건 pages에서 하면 됨. 
- 이러는 이유가 어짜피 엄청 늘어나도 그냥 widget에서 찾으면 되니까 무한하게 컨포넌트가 늘어나면 어디로 계속 들어가는 뎁스 찾을 빠에는 선형적으로 늘어나는 구조니까

2. export든 export default든 뭔 상관이냐?

- 그냥 import 차이 인줄 알았음. 실제로도 그냥 중괄호 느낌이라고 생각했다. 하지만, FSD에서는 named export 권장. 명세 느낌? 그리고 경고/오류 잡히는 횟수가 틀리다고 한다.

- app에서 page,layout은 확실히 default가 맞음. lazy에서는 default원하드라.

```
왜 default가 필요한가?
- 원래 라이브러리는 메인 기능 단 1개 내보내는 패턴 많았음
- 이름 마음대로 붙이기도 편했음
- Node.js의 CommonJS는 module.exports = ...로 하나 내보내는게 기본. 그래서 자연스럽게 매핑하는 규칙 만듬.

- es6초반에는 default가 자주 쓰였다는데 지금은 대규모 코드가 많아지고 바렐 구조를 따르는 이곳에는 named export가 더 적합해졌다고 함
```

## provider에 대한 생각

1. provider가 많아지면 계속 붙일 수도 없고 어쩌면 좋음?

- 사실 이 질문 네이버 기술면접에서 받아봄. 그런데 보통 현업에서도 provider 그냥 붙여쓰는 걸로 아는데.

- 그래서 이번엔 묶어봄. 생각보다 깔끔한데 가독성은 떨어질듯.

- 다른 방법으로는 useSyncExternalStore로 외부 스토어 이용하는 방법. 

  - 나도 저번 과제 테스트 때 알게 되었음. react 18때 나온 훅

  - 값이 드물게 바뀌는 전역 설정에는 Context가 정답.

## 반응형 css에 대한 생각