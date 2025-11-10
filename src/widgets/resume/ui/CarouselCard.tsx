import { CarouselItem } from "../consts/portfolio";
import { Github } from "@/shared/icon";
import Link from "next/link";

export function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <>
      <h1 className="rounded-lg bg-highlight text-white font-extrabold px-3 py-1 text-base mb-2">{item.title}{item.subtitle && <span className="text-sm font-medium"> - {item.subtitle}</span>}</h1>
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
    </>
  )
}
