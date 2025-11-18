import { SectionHeader } from "./SectionHeader";
import { SectionWrapper } from "./section-wrapper";
import { CarouselMenu } from "./CarouselMenu";
import { carouselItems } from "../consts/portfolio";

export function Portfolio() {
  return (
    <SectionWrapper>
      <SectionHeader title="Portfolio" />
      <CarouselMenu items={carouselItems} />
    </SectionWrapper>
  );
}