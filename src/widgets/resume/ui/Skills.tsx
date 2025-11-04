import { SectionHeader } from './SectionHeader';
import { FlowingMenu } from '@/shared/motion';
import { SkillGroup } from '@/widgets/resume/model/skills-config';
import { SectionWrapper } from './section-wrapper';

export function Skills({ skillsGroups }: { skillsGroups: SkillGroup[] }) {
  return (
    <SectionWrapper>
      <SectionHeader title="Skills" />
      <FlowingMenu groups={skillsGroups} className="h-96" enableLink={false} />
    </SectionWrapper>
  );
}
