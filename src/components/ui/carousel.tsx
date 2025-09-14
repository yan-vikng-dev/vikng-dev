"use client";

import * as React from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import { cn } from "@/lib/utils";

export type CarouselProps = React.PropsWithChildren<{
  className?: string;
  options?: EmblaOptionsType;
  controls?: boolean;
  indicators?: boolean;
}>;

export function Carousel({ className, options, controls = true, indicators = true, children }: CarouselProps) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start", ...options });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
          {React.Children.map(children, (child, i) => (
            <div className="min-w-0 shrink-0 basis-full pl-4" key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {controls && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between p-2">
          <button
            aria-label="Previous"
            onClick={() => embla?.scrollPrev()}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 backdrop-blur text-foreground hover:bg-background"
          >
            <span className="sr-only">Previous</span>
            ←
          </button>
          <button
            aria-label="Next"
            onClick={() => embla?.scrollNext()}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 backdrop-blur text-foreground hover:bg-background"
          >
            <span className="sr-only">Next</span>
            →
          </button>
        </div>
      )}

      {indicators && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full border",
                i === selectedIndex ? "bg-foreground" : "bg-transparent"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
