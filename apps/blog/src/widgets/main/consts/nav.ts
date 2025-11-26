type CategoryProp = {
  name: string;
  href: string;
  slug?: string;
};

export const categories: CategoryProp[] = [
  { name: '전체', href: '/blog' },
  { name: 'TS', href: '/blog/typescript', slug: 'typescript' },
  { name: 'React', href: '/blog/react', slug: 'react' },
  { name: '문제풀이', href: '/blog/problem-solving', slug: 'problem-solving' },
  { name: '개발', href: '/blog/dev', slug: 'dev' },
  { name: '프로젝트', href: '/blog/project', slug: 'project' },
];

export const VALID_CATEGORIES = [
  'dev',
  'problem-solving',
  'project',
  'typescript',
  'react',
];
