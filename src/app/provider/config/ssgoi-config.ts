'use client';
import { slide } from '@ssgoi/react/view-transitions';

export const ssgoiConfig = {
  transitions: [
    {
      from: '/',
      to: '/resume',
      transition: slide({
        direction: 'left',
        spring: { stiffness: 150, damping: 20 },
      }),
      symmetric: true,
    },
    {
      from: '/resume',
      to: '/',
      transition: slide({
        direction: 'right',
        spring: { stiffness: 150, damping: 20 },
      }),
      symmetric: true,
    },
  ],
};
