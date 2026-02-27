type SkillEntry = {
  link?: string;
  text: string;
  image: string;
};

export type SkillGroup = {
  title?: string;
  entries: SkillEntry[];
};

export const SkillsGroups: SkillGroup[] = [
  {
    title: 'Core Stack',
    entries: [
      {
        link: '#',
        text: 'HTML5',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        link: '#',
        text: 'CSS3',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        link: '#',
        text: 'JavaScript',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        link: '#',
        text: 'TypeScript',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        link: '#',
        text: 'React',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        link: '#',
        text: 'Next.js',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
    ],
  },
  {
    title: 'Specialties',
    entries: [
      {
        link: '#',
        text: 'Next.js',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
      {
        link: '#',
        text: 'TailwindCSS',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      },
      { link: '#', text: 'Turborepo', image: '/logo/turborepo-logo.png' },
    ],
  },
  {
    title: 'Etc.',
    entries: [
      { link: '#', text: 'Django', image: '/logo/django-logo.png' },
      { link: '#', text: 'Prettier', image: '/logo/prettier-logo.png' },
      {
        link: '#',
        text: 'Supabase',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      },
      {
        link: '#',
        text: 'ESLint',
        image:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
      },
      { link: '#', text: 'Husky', image: '/logo/husky-logo.png' },
    ],
  },
];
