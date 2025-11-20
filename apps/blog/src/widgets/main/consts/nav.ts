type Category = {
  name: string;
  href: string;
};

export const categories: Category[] = [
  { name: '전체', href: '/' },
  { name: '개발', href: '/dev' },
  { name: '문제풀이', href: '/problem-solving' },
  { name: '프로젝트', href: '/project' },
];
