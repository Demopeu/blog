import { SplitText, RotatingText } from '@/shared/motion';

export default function IntroArticle() {
  return (
    <article className="space-y-2">
      <SplitText
        text="오리엔탈 샐러드처럼"
        tag="h1"
        className="text-6xl font-bold whitespace-nowrap"
      />
      <h1 className="flex flex-wrap items-baseline gap-3 text-6xl font-bold">
        <SplitText text="어우러지는" tag="span" />
        <SplitText
          text={
            <RotatingText
              texts={['코드를', '팀을', '사용자 경험을', '결과물을']}
              initial={{ y: '200%' }}
              exit={{ y: '-230%' }}
              staggerDuration={0.05}
              staggerFrom="last"
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              rotationInterval={3000}
            />
          }
          tag="span"
          className="flex items-center justify-center rounded-lg bg-indigo-600 px-2 pt-0.5 pb-2"
        />
        <SplitText text="만드는 개발자🥗" tag="span" />
      </h1>
      <p className="mt-8 ml-1">React / Next.js 기반 사용자 경험 중심 개발자</p>
    </article>
  );
}
