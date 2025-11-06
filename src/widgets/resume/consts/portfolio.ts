export type PortfolioItem = {
  image: string;
  link: string;
  title: string;
  description: string;
};

export const items: PortfolioItem[] = [
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