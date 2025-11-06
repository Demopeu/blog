import { InfiniteMenu } from "@/shared/motion";
import { items } from "../consts/portfolio";
import type { View } from "../model/use-portfolio-view";

export function renderPortfolioView(id: View) {
  switch (id) {
    case 'Infinite':
      return <InfiniteMenu items={items} />;
    case 'Carousel':
      return <div>Carousel</div>;
  }
}