"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

type DemoVideoProps = {
  src: string;
  poster?: string;
  label: string;
};

/**
 * A muted/looping product demo video that satisfies WCAG 2.2.2
 * (Pause, Stop, Hide) by:
 *   - exposing a pause/play button overlay, and
 *   - not autoplaying when the user prefers reduced motion.
 *
 * Used by /autoquit. Designed to be dropped inside the existing
 * `project-image-shell` / `project-image-frame` styling.
 */
export function DemoVideo({ src, poster, label }: DemoVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="project-image-shell project-image-shell-glass">
      <div className="project-image-frame project-image-frame-glass relative aspect-video w-full overflow-hidden rounded-lg border">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause demo video" : "Play demo video"}
          className="absolute bottom-3 right-3 inline-flex size-11 items-center justify-center rounded-md border bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          {playing ? (
            <Pause className="size-4" aria-hidden="true" />
          ) : (
            <Play className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
