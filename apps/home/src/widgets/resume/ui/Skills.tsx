import { FlowingMenu } from '@repo/ui/react-bits';
import { SkillsGroups } from '../consts/skills';
import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './section-wrapper';

export function Skills() {
  return (
    <SectionWrapper>
      <SectionHeader title="Skills" />
      <FlowingMenu groups={SkillsGroups} className="h-96" enableLink={false} />
    </SectionWrapper>
  );
}
