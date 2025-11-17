import { useState } from 'react';

export type View = 'Infinite' | 'Carousel';

export const PORTFOLIO_VIEW_TYPES = ['Infinite', 'Carousel'] as const;

export function usePortfolioView() {
  const [view, setView] = useState<View>('Infinite');
  return { view, setView };
}