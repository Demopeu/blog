import { drill, slide } from '@ssgoi/react/view-transitions';

export const ssgoiConfig = {
  transitions: [
    // Drill: /blog/* ↔ /post/*
    {
      from: '/blog/*',
      to: '/post/*',
      transition: drill({ direction: 'enter' }),
    },
    {
      from: '/post/*',
      to: '/blog/*',
      transition: drill({ direction: 'exit' }),
    },

    // Slide: /blog → /blog/typescript (forward)
    {
      from: '/blog',
      to: '/blog/typescript',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/typescript',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/typescript → /blog/react
    {
      from: '/blog/typescript',
      to: '/blog/react',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/react',
      to: '/blog/typescript',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/react → /blog/problem-solving
    {
      from: '/blog/react',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/problem-solving',
      to: '/blog/react',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/problem-solving → /blog/talk
    {
      from: '/blog/problem-solving',
      to: '/blog/talk',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/talk',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/talk → /blog/dev
    {
      from: '/blog/talk',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog/talk',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/dev → /blog/project
    {
      from: '/blog/dev',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/dev',
      transition: slide({ direction: 'right' }),
    },

    // 건너뛰기: /blog → /blog/react (2칸)
    {
      from: '/blog',
      to: '/blog/react',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/react',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // 건너뛰기: /blog → /blog/problem-solving (3칸)
    {
      from: '/blog',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/problem-solving',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // 건너뛰기: /blog → /blog/talk (4칸)
    {
      from: '/blog',
      to: '/blog/talk',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/talk',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // 건너뛰기: /blog → /blog/dev (5칸)
    {
      from: '/blog',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // 건너뛰기: /blog → /blog/project (6칸)
    {
      from: '/blog',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // 중간 건너뛰기들 (typescript 기준)
    {
      from: '/blog/typescript',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/problem-solving',
      to: '/blog/typescript',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/typescript',
      to: '/blog/talk',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/talk',
      to: '/blog/typescript',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/typescript',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog/typescript',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/typescript',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/typescript',
      transition: slide({ direction: 'right' }),
    },

    // 중간 건너뛰기들 (react 기준)
    {
      from: '/blog/react',
      to: '/blog/talk',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/talk',
      to: '/blog/react',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/react',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog/react',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/react',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/react',
      transition: slide({ direction: 'right' }),
    },

    // 중간 건너뛰기들 (problem-solving 기준)
    {
      from: '/blog/problem-solving',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/problem-solving',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'right' }),
    },

    // 중간 건너뛰기들 (talk 기준)
    {
      from: '/blog/talk',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/talk',
      transition: slide({ direction: 'right' }),
    },
  ],
};
