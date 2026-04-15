import { InfiniteMenu } from '@repo/ui/react-bits';
import { carouselItems, infiniteItems } from '../consts/portfolio';
import type { View } from '../model/use-portfolio-view';
import { CarouselMenu } from '../ui/CarouselMenu';

export function renderPortfolioView(id: View) {
  switch (id) {
    case 'Infinite':
      return <InfiniteMenu items={infiniteItems} />;
    case 'Carousel':
      return <CarouselMenu items={carouselItems} />;
  }
}
