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

    // Slide: /blog → /blog/reference (forward)
    {
      from: '/blog',
      to: '/blog/reference',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/reference',
      to: '/blog',
      transition: slide({ direction: 'right' }),
    },

    // Slide: /blog/reference → /blog/problem-solving
    {
      from: '/blog/reference',
      to: '/blog/problem-solving',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/problem-solving',
      to: '/blog/reference',
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

    // 건너뛰기: /blog → /blog/problem-solving (2칸)
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

    // 건너뛰기: /blog → /blog/talk (3칸)
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

    // 건너뛰기: /blog → /blog/dev (4칸)
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

    // 건너뛰기: /blog → /blog/project (5칸)
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

    // 중간 건너뛰기들 (reference 기준)
    {
      from: '/blog/reference',
      to: '/blog/talk',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/talk',
      to: '/blog/reference',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/reference',
      to: '/blog/dev',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/dev',
      to: '/blog/reference',
      transition: slide({ direction: 'right' }),
    },
    {
      from: '/blog/reference',
      to: '/blog/project',
      transition: slide({ direction: 'left' }),
    },
    {
      from: '/blog/project',
      to: '/blog/reference',
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
