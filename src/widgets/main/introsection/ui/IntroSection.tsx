import IntroArticle from './IntroArticle';
import UseStackLogoLoop from './UseStackLogoLoop';
import HoverImage from './HoverImage';

export function IntroSection() {
  return (
    <section className="mt-60 flex justify-between">
      <div className="space-y-10">
        <IntroArticle />
        <UseStackLogoLoop />
      </div>
      <HoverImage />
    </section>
  );
}
