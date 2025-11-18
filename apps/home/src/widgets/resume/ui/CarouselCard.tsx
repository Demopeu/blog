'use client';

import { CarouselItem } from '../consts/portfolio';
import { Github } from '@/shared/icon';
import { useFlag } from '@/shared/hooks/use-flag';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

export function CarouselCard({ item }: { item: CarouselItem }) {
  const [flag, toggle] = useFlag();

  return (
    <article className="basis-9/11 sm:basis-6/8 md:basis-5/8 m-4 shrink-0 lg:basis-2/5">
      <div
        className={cn(
          'text-foreground text-very-pretty group relative h-full w-full rounded-lg',
          'transform-3d transition-transform duration-700',
          'transform-gpu will-change-transform',
          'shadow-[0_0_.6rem_0_rgb(68_68_68/82%)]',
          flag && 'rotate-y-180'
        )}
        onClick={toggle}
      >
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-lg shadow-[0_0_.6rem_0_rgb(68_68_68/82%)]">
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
        <div className="rotate-y-180 backface-hidden flex flex-col gap-2 p-4">
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
                className="border-border bg-muted text-foreground/80 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={item.link}
            className="ml-auto"
            aria-label="Demopeu's Github"
          >
            <Github className="size-6" />
          </Link>
        </div>
      </div>
    </article>
  );
}
