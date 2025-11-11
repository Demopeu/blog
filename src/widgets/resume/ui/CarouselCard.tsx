'use client'

import { CarouselItem } from "../consts/portfolio";
import { Github } from "@/shared/icon";
import { useFlag } from "@/shared/hooks/use-flag";
import Link from "next/link";
import { FlipFaceImage } from "./FlipFaceImage";
import { cn } from "@/shared/lib/utils";

export function CarouselCard({ item }: { item: CarouselItem }) {

  const [flag, toggle] = useFlag();

  return (
    <article className="group [perspective:1000px] h-170 sm:h-120 md:h-120 lg:h-140 xl:h-120 shrink-0 basis-9/11 sm:basis-6/8 md:basis-5/8 lg:basis-2/5 m-4">
      <div
        className={cn(
          "relative w-full h-full text-foreground whitespace-pre-wrap break-keep text-pretty hyphens-auto",
          "transition-transform duration-700 [transform-style:preserve-3d]",
          "will-change-transform transform-gpu",
          flag && "rotate-y-180"
        )}
      >
       {/* 앞면: flag=false일 때 보이도록 (회전 없이) */}
        <div className="p-4 flex flex-col gap-2" onClick={toggle}>
        <h1 className="rounded-lg bg-highlight text-white font-extrabold px-4 py-1 text-base mb-2 w-fit">{item.title}{item.subtitle && <span className="text-sm font-medium"> - {item.subtitle}</span>}</h1>
        <p className="pb-1 border-b-2 w-full text-sm text-foreground/50">{item.date}</p>
        <p className="font-black">{item.description}</p>
        <ul className="list-disc pl-3 space-y-1 text-sm mb-2">
          {item.contribution.map((c) => (
          <li key={c}>{c}</li>
        ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span
            key={tech}
            className="whitespace-nowrap rounded-full border border-border bg-muted text-foreground/80 px-2 py-0.5 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link href={item.link} className="ml-auto">
        <Github className="size-6" />
      </Link>    
      </div>

        {/* 뒷면: flag=true일 때 보이도록 (면 자체를 180도) */}
        <FlipFaceImage src={item.image} alt="Back" back onClick={toggle} />
      </div>
    </article>





      // <div className="p-4 flex flex-col gap-2">
      //   <h2>굿</h2>
      // </div>
  )
}
