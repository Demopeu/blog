# Error-0001: React instrumentation encountered an error: Error: The children should not have changed if we pass in the same set.

## 📣 해결 여부

해결 - 2025-11-13

## 📋 상황

```typescript
"use client";
import { CarouselItem } from "../consts/portfolio";
import { CarouselCard } from "./CarouselCard";
import { useFlag } from "@/shared/hooks/use-flag";
import { Activity } from "react";
import Image from "next/image";
export function CarouselItemBox({ item }: { item: CarouselItem }) {
  const [flag, toggle] = useFlag();
  return (
    <article
      className="shrink-0 basis-9/11 sm:basis-6/8 md:basis-5/8 lg:basis-2/5 flex flex-col items-start shadow-[0_0_.6rem_0_rgb(68_68_68_/_82%)] m-4 rounded-lg bg-background text-foreground p-4 gap-2 whitespace-pre-wrap break-keep text-pretty hyphens-auto cursor-pointer"
      onClick={toggle}
    >
      <Activity mode={!flag ? "visible" : "hidden"}>
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
          <Image src={item.image} alt={item.title} fill className="object-contain" />
        </div>
      </Activity>
      <Activity mode={flag ? "visible" : "hidden"}>
        <CarouselCard item={item} />
      </Activity>
    </article>
  );
}
```

실행 시

```
React instrumentation encountered an error: Error: The children should not have changed if we pass in the same set.
```

## 🔨 해결 방법

일단 Activity를 사용하지 않고 css로 시각적으로 조절하도록함.

```typescript
'use client';

import { CarouselItem } from '../consts/portfolio';
import { Github } from '@/shared/icon';
import { useFlag } from '@/shared/hooks/use-flag';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

export function CarouselCard({ item }: { item: CarouselItem }) {
  const [flag, toggle] = useFlag();

  return (
    <article className="m-4 shrink-0 basis-9/11 sm:basis-6/8 md:basis-5/8 lg:basis-2/5">
      <div
        className={cn(
          'group text-foreground text-very-pretty relative h-full w-full rounded-lg',
          'transition-transform duration-700 transform-3d',
          'transform-gpu will-change-transform',
          'shadow-[0_0_.6rem_0_rgb(68_68_68_/_82%)]',
          flag && 'rotate-y-180'
        )}
        onClick={toggle}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_0_.6rem_0_rgb(68_68_68_/_82%)] backface-hidden">
          <Image
            src={item.image}
            alt="portfolio image"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 82vw, (max-width: 768px) 75vw, (max-width: 1024px) 62vw, 40vw"
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 z-10 flex items-center justify-center',
              'bg-black/70',
              'opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100'
            )}
          >
            <div className="pointer-events-none relative">
              <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/40" />
              <div className="relative px-3 py-1 text-xl font-bold text-white">
                View details
              </div>
            </div>
          </div>
        </div>
        <div className="flex rotate-y-180 flex-col gap-2 p-4 backface-hidden">
          <h1 className="bg-highlight mb-2 w-fit rounded-lg px-4 py-1 text-base font-extrabold text-white">
            {item.title}
            {item.subtitle && (
              <span className="text-sm font-medium"> - {item.subtitle}</span>
            )}
          </h1>
          <p className="text-foreground/50 w-full border-b-2 pb-1 text-sm">
            {item.date}
          </p>
          <p className="font-black">{item.description}</p>
          <ul className="mb-2 list-disc space-y-1 pl-3 text-sm">
            {item.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="border-border bg-muted text-foreground/80 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link href={item.link} className="ml-auto" aria-label="Demopeu's Github">
            <Github className="size-6" />
          </Link>
        </div>
      </div>
    </article>
  );
}

```

## 📊 가정한 문제 원인

1. React 19.2에서의 최적화 상황

- React 19.2에서 Activity를 트리에 추가할 때 내부적으로 복수 개의 Activity가 같은 것이라 생각하지 않음. 임의의 무언가로 표식을 둬서 mode만 바뀌고 그 밖의 것들(순서, key, 컴포넌트 타입등)은 그대로라고 가정하는 듯. 그래서 안의 데이터를 보존 하는 것으로 추정.

- 그리고 실제로 사용해보면 오류 없이 잘 작동함. 최적화를 완료한 느낌인데...

2. 실제로 오류 빈번하게 발생

- 이 파일 위에 다음과 같은 파일이 있음.

```typescript
"use client";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselItem } from "../consts/portfolio";
import { CarouselCard } from "./CarouselCard";

export function CarouselMenu({ items }: { items: CarouselItem[] }) {
  const [viewportRef] = useEmblaCarousel({
    axis: "x",
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: true,
    duration: 20,
  });

  return (
    <div className="overflow-hidden" ref={viewportRef}>
      <div className="flex gap-1">
        {items.map((item) => (
          <CarouselCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
```

- 첫번째 가정 : 상위 캐러셀 + key + diffing(reconciliation)
    - react는 diffing 알고리즘을 사용하여 트리의 변경사항을 확인하고 최적화를 수행함. 따라서 아래 key로 저장 중인 card의 children도 전부 동일 할 것이라고 생각함(변경 할 이유가 없음). 그런데 아래 children이 변화하니까  오류를 터트렸다. 즉 전체 트리 관점에서 리컨실리에이션(reconciliation)을 수행할 때 

- 두번째 가정: next/image 내부 DOM 구조 변화
    - next/Image 내부적으로 children 트리 변경. image가 랜더링 전에 살짝 상태를 변경함. 그때 오류를 내뿜음. 실제로 Stack overflow에서도 비슷한 오류 터진다고 글 확인함.

## 📝 고려한 대안

1. Activity에 정적인 key를 주는 방식 : 실제로 같은 set이라 판단하는 경우는 diffing 알고리즘에서 key나 memo한 게 같을 경우라 판단. 따라서 'front'와 'back'으로 key를 주면 다른 set으로 판단할 것 같다.   

2. Activity를 사용하지 않는 방식 : Activity를 사용하지 않는 방식으로 변경할 수 있음. 삼항 연산자 이용하면 됨. 그런데 image가 커서 unmount 시켰다가 다시 mount 시켜야 할때 자원과 시간이 낭비 될 것 같다.

## 📚 참고자료

- [React 공식 문서 - State를 보존하고 초기화하기](https://ko.react.dev/learn/preserving-and-resetting-state)
