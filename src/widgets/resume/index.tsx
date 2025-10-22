import { IntroSection } from './introsection';
import { AboutMe } from './aboutme';
import { Skill } from './skill';

export function Resume() {
  return (
    <section className="space-y-30">
      <IntroSection />
      <AboutMe />
      <Skill />
    </section>
  );
}
