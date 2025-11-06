"use client";

import { SectionHeader } from "./SectionHeader";
import { SectionWrapper } from "./section-wrapper";
import { MultiActivityPane } from "@/shared/lib/multi-activity-pane";
import { usePortfolioView, PORTFOLIO_VIEW_TYPES } from "../model/use-portfolio-view";
import { renderPortfolioView } from "../lib/portfolio-views";

export function Portfolio() {
  const { view } = usePortfolioView();
  
  return (
    <SectionWrapper>
      <SectionHeader title="Portfolio" />
      <MultiActivityPane 
        active={view} 
        types={PORTFOLIO_VIEW_TYPES} 
        render={renderPortfolioView}
      />
    </SectionWrapper>
  );
}