type CategoryProp = {
  name: string;
  href: string;
  slug?: string;
};

export const categories: CategoryProp[] = [
  { name: '전체', href: '/' },
  { name: 'TS', href: '/typescript', slug: 'typescript' },
  { name: 'React', href: '/react', slug: 'react' },
  { name: '문제풀이', href: '/problem-solving', slug: 'problem-solving' },
  { name: '개발', href: '/dev', slug: 'dev' },
  { name: '프로젝트', href: '/project', slug: 'project' },
];

export const VALID_CATEGORIES = [
  'dev',
  'problem-solving',
  'project',
  'typescript',
  'react',
];
