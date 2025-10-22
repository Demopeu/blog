import IntroArticle from './IntroArticle';
import { UseStackLogoLoop } from './UseStackLogoLoop';
import HoverImage from './HoverImage';

export default function IntroSection() {
  return (
    <section className="mx-40 mt-60 flex justify-between">
      <div className="space-y-20">
        <IntroArticle />
        <UseStackLogoLoop />
      </div>
      <HoverImage />
    </section>
  );
}
