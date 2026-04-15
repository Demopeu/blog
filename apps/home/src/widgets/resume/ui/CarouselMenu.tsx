"use client";
import useEmblaCarousel from "embla-carousel-react";
import type { CarouselItem } from "../consts/portfolio";
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
