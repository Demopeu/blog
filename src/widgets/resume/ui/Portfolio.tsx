import { SectionHeader } from "./SectionHeader";
import { SectionWrapper } from "./section-wrapper";
import { InfiniteMenu } from "@/shared/motion";
import { items } from "../consts/portfolio";

export function Portfolio() {
  return (
    <SectionWrapper>
      <SectionHeader title="Portfolio" />
      <InfiniteMenu items={items}/>
    </SectionWrapper>
  )
}
