import { SectionHeader } from "./SectionHeader";
import { FlowingMenu } from "@/shared/motion";
import { SkillGroup } from "@/widgets/resume/model/skills-config";

export function Skills({skillsGroups}: {skillsGroups: SkillGroup[]}) {
  return (
    <section className="space-y-2 md:space-y-6">
      <SectionHeader title="Skills" />
      <FlowingMenu groups={skillsGroups} className="h-96" enableLink={false} />
    </section>
  );
}
