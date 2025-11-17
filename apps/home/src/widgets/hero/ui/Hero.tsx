import { HeroText } from './HeroText';
import { UseStackLogoLoop } from './UseStackLogoLoop';
import { HoverImage } from './HoverImage';
import { techLogos } from '../consts/tech-logo';
import { heroText } from '../consts/hero-text';

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
