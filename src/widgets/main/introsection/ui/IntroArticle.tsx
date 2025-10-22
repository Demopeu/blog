import { SplitText, RotatingText } from '@/shared/motion';

export default function IntroArticle() {
  return (
    <article className="space-y-2 text-6xl font-bold">
      <SplitText
        text="오리엔탈 샐러드처럼"
        tag="h1"
        className="whitespace-nowrap"
      />
      <h1 className="flex flex-wrap items-baseline gap-3">
        <SplitText text="어우러지는" tag="span" />
        <SplitText
          text={
            <RotatingText
              texts={['팀을', '코드를', '결과물을', '사용자 경험을']}
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
      </h1>
      <SplitText text="만드는 개발자🥗" tag="span" />
      <div className="mt-8 ml-1 space-y-1 text-lg font-normal">
        <p>
          FRONT-END 개발자 <b>김동현</b>입니다.
        </p>
        <p>서비스의 흐름과 사용자 경험을 함께 설계하는 것을 지향합니다.</p>
      </div>
    </article>
  );
}
