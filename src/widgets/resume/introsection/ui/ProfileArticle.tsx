import React from 'react';
import { SplitText } from '@/shared/motion';

export default function IntroArticle() {
  return (
    <article className="absolute top-1/2 mx-40 flex flex-col items-start gap-2">
      <SplitText text="김동현" tag="p" className="py-2 text-7xl font-black" />
      <SplitText
        text="Front-End 개발자"
        tag="p"
        className="flex-nowrap pl-2 text-3xl font-medium"
      />
      <SplitText
        text="#React #TypeScript #Next.js"
        tag="p"
        className="flex-nowrap pl-2 text-xl font-medium"
      />
    </article>
  );
}
