"use client";

import { SectionHeader } from "./SectionHeader";
import { SectionWrapper } from "./section-wrapper";
import { MultiActivityPane } from "@/shared/lib/multi-activity-pane";
import { usePortfolioView, PORTFOLIO_VIEW_TYPES } from "../model/use-portfolio-view";
import { renderPortfolioView } from "../lib/portfolio-views";
import { Switch } from "@/shared/ui/shadcn/switch";

export function Portfolio() {
  const { view, setView } = usePortfolioView();
  
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between pr-3">
        <SectionHeader title="Portfolio" />
        <Switch
  className="[--switch-w:2.5rem] [--switch-h:1.25rem] [--thumb:1.1rem]"
  checked={view === 'Carousel'}
  onCheckedChange={(checked) => setView(checked ? 'Carousel' : 'Infinite')}
  aria-label="Portfolio View"
/>
      </div>
      <MultiActivityPane 
        active={view} 
        types={PORTFOLIO_VIEW_TYPES} 
        render={renderPortfolioView}
      />
    </SectionWrapper>
  );
}