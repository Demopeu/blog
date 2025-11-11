type PortfolioItem = {
  image: string;
  link: string;
  title: string;
  description: string;
};

export interface CarouselItem extends PortfolioItem {
  date: string;
  stack: string[];
  subtitle?: string;
  contribution : string[];
}

export interface InfiniteItem extends PortfolioItem {
  image: string;
}


export const infiniteItems: InfiniteItem[] = [
  {
    image: '/portfolio/twm.png',
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%98%81%ED%99%94-%EC%B6%94%EC%B2%9C-%EC%84%9C%EB%B9%84%EC%8A%A4---twmtravel-with-movies',
    title: '영화\n추천 서비스\nTWM',
    description: '- Vue.js 3\n- 구조 설계\n- UI 구현'
  },
  {
    image: '/portfolio/pansite.png',
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B2%84%EC%B8%84%EC%96%BC-%EC%95%84%EC%9D%B4%EB%8F%8C-%ED%8C%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%9C%EC%9E%91',
    title: '버츄얼\n아이돌\n팬 페이지',
    description: '- React + Firebase\n- react-router-dom\n- Firebase Hosting'
  },
  {
    image: '/portfolio/zip.png',
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%8C%93%EA%B8%80-%EC%9A%94%EC%95%BD-ai-%ED%94%8C%EB%9E%AB%ED%8F%BC-ssafy-%EA%B8%B0%EC%97%85-%EC%97%B0%EA%B3%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8',
    title: '실시간\n댓글 요약\nAI 플랫폼',
    description: '- Next.js 14\n- 무한 대댓글\n- 댓글 페이징\n- UI 성능 최적화'
  },
  {
    image: '/portfolio/vybz.png',
    link: 'https://github.com/Demopeu/vybz-frontend',
    title: '실시간\n소통 기반\n팬 플랫폼\nVYBZ',
    description: '- 모노레포 구조\n- 협업/품질 자동화\n- Next.js 15\n- SEO 최적화\n- WebRTC,HLS,알림\n- TanStack Query'
  },
  {
    image: '/portfolio/starbucks.png',
    link: 'https://github.com/Demopeu/FE-Starbucks-Renewal',
    title: '스타벅스\n리뉴얼\n프로젝트',
    description: '- Next.js 15 캐시 전략\n- re-rendering 최적화\n- Zustand\n- useOptimistic\n- useFunnel'
  },
];

export const carouselItems: CarouselItem[] = [
  {
    link: 'https://github.com/Demopeu/vybz-frontend',
    title: 'VYBZ',
    subtitle: '실시간 소통 기반 팬 플랫폼',
    description: '버스킹 공연 홍보 공간의 부재 / 홍보 어려움을 해결하기 위한 생태계 제작 프로젝트',
    contribution: [
      'Turborepo로 모노레포 구성 및 공통 UI/설정 분리',
      '서버 액션, Parallel Routes, 캐싱 전략 등 Next.js 심화 구조 도입',
      'WebRTC, HLS, SSE, FCM 등 실시간/스트리밍/알림 기능 구현',
      'TanStack Query를 활용한 상태 관리',
      'NextAuth.js 기반 인증 시스템',
      'SEO 최적화'
    ],
    date: '2025.05 ~ 2025.07',
    stack: ['Turborepo', 'Next.js 15', 'TypeScript','Tailwind CSS', 'TanStack Query', 'stomp', 'hls','NextAuth.js'],
    image: '/portfolio/vybz.png'
  },
  {
    link: 'https://github.com/Demopeu/FE-Starbucks-Renewal',
    title: '스타벅스 리뉴얼 프로젝트',
    description: '초기 로딩 속도와 SEO를 개선한 스타벅스 온라인 쇼핑몰 리뉴얼 프로젝트',
    contribution: ['SSR/CSR 혼합 구조 설계로 초기 로딩 최적화 및 SEO 대응','shadcn UI + Zustand 조합으로 디자인 일관성과 상태 분리 구조 구현','Optimistic UI, 태그 기반 캐싱, 전역 상태 관리 등 실제 서비스와 동일한 사용자 경험 설계','Next.js 15 캐시 전략 및 React 리렌더링 최적화 '],
    date: '2025.03 ~ 2025.04',
    stack: ['Next.js 15', 'TypeScript','Tailwind CSS', 'Zustand','Zod','NextAuth.js'],
    image: '/portfolio/starbucks.png'
  },
  {
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%8C%93%EA%B8%80-%EC%9A%94%EC%95%BD-ai-%ED%94%8C%EB%9E%AB%ED%8F%BC-ssafy-%EA%B8%B0%EC%97%85-%EC%97%B0%EA%B3%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8',
    title: 'Zip현전',
    subtitle: '실시간 댓글 요약 AI 플랫폼',
    description: '무한 댓글 쓰레드를 제공하고 각 요약 정보를 AI가 실시간 생성하여 보여주는 기능을 구현한 프로젝트',
    contribution: ['flat 댓글 데이터를 parent-child 트리 구조로 변환하여 UI 성능 최적화','페이지 리셋 없이 댓글 추가, localStorage 활용으로 UX 개선','Skeleton UI, refetch, append 등 전략 테스트를 통해 사용성과 유지보수성 간 균형 달성'],
    date: '2024.10 ~ 2025.11',
    stack: ['Next.js 14', 'TypeScript','Tailwind CSS'],
    image: '/portfolio/zip.png'
  },
  {
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B2%84%EC%B8%84%EC%96%BC-%EC%95%84%EC%9D%B4%EB%8F%8C-%ED%8C%AC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%9C%EC%9E%91',
    title: '버츄얼 아이돌 팬 페이지',
    description: '유튜브 영상 캘린더를 제공하여 날짜별로 영상을 확인할 수 있는 팬페이지',
    contribution: ['react-router-dom을 활용해 월 단위 라우팅 처리 및 UI 상태 유지 구현','Firebase Hosting을 통한 서버리스 배포 환경 구성'],
    date: '2024.09 ~ 2024.09',
    stack: ['React', 'JavaScript','react-router-dom','Firebase Hosting','sweetalert2'],
    image: '/portfolio/pansite.png'
  },
  {
    link: 'https://github.com/Demopeu#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%98%81%ED%99%94-%EC%B6%94%EC%B2%9C-%EC%84%9C%EB%B9%84%EC%8A%A4---twmtravel-with-movies',
    title: 'TWM(Travel With Movies)',
    subtitle: '영화 추천 서비스',
    description: '국가별 영화를 탐색하고, 위시리스트/감상 목록 관리, 리뷰 작성이 가능한 커뮤니티',
    contribution: ['Vue.js + Bootstrap으로 반응형 웹 구현','slot/prop 방식의 컴포넌트화 설계','NavBar, Selector, Card 등 재사용 가능한 구조로 구성'],
    date: '2024.05 ~ 2024.05',
    stack: ['Vue.js', 'JavaScript','Django','axios','bootstrap','pinia'],
    image: '/portfolio/twm.png'
  },
];
