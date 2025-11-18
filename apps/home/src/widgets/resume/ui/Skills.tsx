import { SectionHeader } from './SectionHeader';
import { FlowingMenu } from '@/shared/motion';
import { SkillsGroups } from '../consts/skills';
import { SectionWrapper } from './section-wrapper';

export function Skills() {
  return (
    <SectionWrapper>
      <SectionHeader title="Skills" />
      <FlowingMenu groups={SkillsGroups} className="h-96" enableLink={false} />
    </SectionWrapper>
  );
}
