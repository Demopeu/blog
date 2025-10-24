import { SplitText, RotatingText } from '@/shared/motion';

export function HeroText({
  heroText,
}: {
  heroText: {
    name: string;
    firstLine: string;
    secondLine: string;
    thirdLine: string[];
    fourthLine: string;
    fifthLine: string[];
    sixthLine: string;
  };
}) {
  return (
    <article className="space-y-2 text-4xl font-bold lg:text-5xl xl:text-6xl">
      <SplitText
        text={heroText.firstLine}
        tag="h1"
        className="whitespace-nowrap"
      />
      <h1 className="flex flex-wrap items-baseline gap-3">
        <SplitText text={heroText.secondLine} tag="span" />
        <SplitText
          text={
            <RotatingText
              texts={heroText.thirdLine}
              initial={{ y: '200%' }}
              exit={{ y: '-230%' }}
              staggerDuration={0.05}
              staggerFrom="last"
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              rotationInterval={3000}
            />
          }
          tag="span"
          className="bg-highlight-active flex items-center justify-center rounded-lg px-2 pt-0.5 pb-2"
        />
      </h1>
      <SplitText text={heroText.fourthLine} tag="span" />
      <div className="mt-8 ml-1 space-y-1 text-lg font-normal">
        <p>
          {heroText.fifthLine[0]}
          <b className="ml-1">{heroText.name}</b>
          {heroText.fifthLine[1]}
        </p>
        <p>{heroText.sixthLine}</p>
      </div>
    </article>
  );
}
