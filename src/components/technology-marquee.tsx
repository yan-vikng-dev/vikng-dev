"use client";

import * as React from "react";

export type TechnologyItem = {
  label: string;
  icon: React.ReactNode;
};

type TechnologyMarqueeProps = {
  items: TechnologyItem[];
};

const TECHNOLOGY_CHIP_CLASSNAME =
  "inline-flex items-center gap-1 rounded-md border bg-background px-2 h-8 transition-colors hover:bg-foreground hover:text-background hover:border-foreground";

function TechnologyChip({
  item,
  ariaHidden,
}: {
  item: TechnologyItem;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={TECHNOLOGY_CHIP_CLASSNAME}
      aria-label={ariaHidden ? undefined : item.label}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <span className="grid place-items-center size-5 text-current">{item.icon}</span>
      <span className="text-sm font-medium text-current">{item.label}</span>
    </div>
  );
}

function useShouldMarquee(items: TechnologyItem[]) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const primaryTrackRef = React.useRef<HTMLDivElement>(null);
  const [shouldMarquee, setShouldMarquee] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    const primaryTrack = primaryTrackRef.current;
    if (!container || !primaryTrack) return;

    const updateMarqueeState = () => {
      const containerWidth = container.clientWidth;
      const trackWidth = primaryTrack.scrollWidth;
      setShouldMarquee(trackWidth > containerWidth + 8);
    };

    updateMarqueeState();
    const observer = new ResizeObserver(updateMarqueeState);
    observer.observe(container);
    observer.observe(primaryTrack);
    return () => observer.disconnect();
  }, [items]);

  return { containerRef, primaryTrackRef, shouldMarquee };
}

export function TechnologyMarquee({ items }: TechnologyMarqueeProps) {
  const { containerRef, primaryTrackRef, shouldMarquee } = useShouldMarquee(items);

  if (!shouldMarquee) {
    return (
      <div className="mt-2 mb-4" ref={containerRef}>
        <div ref={primaryTrackRef} className="flex flex-wrap items-center gap-2" aria-label="All technologies">
          {items.map((item, index) => (
            <TechnologyChip key={`static-${item.label}-${index}`} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 mb-4 tech-marquee" ref={containerRef}>
      <div className="tech-marquee-track" aria-label="All technologies">
        <div ref={primaryTrackRef} className="flex items-center gap-2">
          {items.map((item, index) => (
            <TechnologyChip key={`primary-${item.label}-${index}`} item={item} />
          ))}
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          {items.map((item, index) => (
            <TechnologyChip key={`dupe-${item.label}-${index}`} item={item} ariaHidden />
          ))}
        </div>
      </div>
    </div>
  );
}
