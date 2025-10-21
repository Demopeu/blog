'use client';
import { scroll } from '@ssgoi/react/view-transitions';

export const ssgoiConfig = {
  transitions: [
    { from: '/', to: '/about', transition: scroll({ direction: 'up' }) },
    { from: '/about', to: '/', transition: scroll({ direction: 'down' }) },
  ],
};
