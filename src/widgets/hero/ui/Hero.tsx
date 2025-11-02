import { HeroText } from './HeroText';
import { UseStackLogoLoop } from './UseStackLogoLoop';
import { HoverImage } from './HoverImage';
import { techLogos } from '@/widgets/hero/model/tech-logo';
import { heroText } from '@/widgets/hero/model/hero-text';

export function Hero() {
  return (
    <section className="flex items-center justify-between">
      <div className="space-y-10">
        <HeroText heroText={heroText} />
        <UseStackLogoLoop techLogos={techLogos} />
      </div>
      <HoverImage src="/dummy.png" srcHover="/dummy2.png" />
    </section>
  );
}
