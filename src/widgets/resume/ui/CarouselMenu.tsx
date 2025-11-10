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
          <article key={item.title} className="shrink-0 basis-9/11 sm:basis-6/8 md:basis-5/8 lg:basis-2/5 flex flex-col items-start shadow-[0_0_.6rem_0_rgb(68_68_68_/_82%)] m-4 rounded-lg bg-background text-foreground p-4 gap-2 whitespace-pre-wrap break-keep text-pretty hyphens-auto">
            <CarouselCard item={item} />
          </article>
        ))}
      </div>
    </div>
  );
}
