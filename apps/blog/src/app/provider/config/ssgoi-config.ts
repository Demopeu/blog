'use client';
import { drill } from '@ssgoi/react/view-transitions';

export const ssgoiConfig = {
  transitions: [
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
  ],
};
