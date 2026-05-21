"use client";

import * as React from "react";

// The vikng.dev card embeds the live home page, which embeds itself again, and
// so on. Each level renders the page at the real viewport size then scales it
// into the small card frame, and mirrors the parent's scroll position — a
// "camera pointed at its own monitor" feedback loop. MAX_MIRROR_DEPTH is the
// hard stop; without it this is an infinite render loop.
// The page scrolls inside a SimpleBar wrapper rather than the window, so the
// recursion mirror has to read/write its position on that element instead of
// window.scrollX/Y. The wrapper is tagged with data-site-scroll-root.
function getScrollRoot(doc: Document): HTMLElement | null {
  return doc.querySelector<HTMLElement>("[data-site-scroll-root]");
}

export function MirrorPreview({ depth }: { depth: number }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = React.useState(0);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const vw = window.innerWidth;
      if (vw > 0) setScale(wrap.clientWidth / vw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  React.useEffect(() => {
    const localRoot = getScrollRoot(document);
    if (!localRoot) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const iframeDoc = iframeRef.current?.contentDocument;
      const remoteRoot = iframeDoc ? getScrollRoot(iframeDoc) : null;
      if (!remoteRoot) return;
      remoteRoot.scrollTo(localRoot.scrollLeft, localRoot.scrollTop);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    localRoot.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      localRoot.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // After the iframe loads, the inner SimpleBar mounts asynchronously (its
  // useEffect runs after the document is parsed), so the scroll root may not
  // exist on the first tick. Retry for a handful of frames until it appears.
  const syncInitialScroll = React.useCallback(() => {
    const localRoot = getScrollRoot(document);
    if (!localRoot) return;
    let attempts = 0;
    const tryOnce = () => {
      const iframeDoc = iframeRef.current?.contentDocument;
      const remoteRoot = iframeDoc ? getScrollRoot(iframeDoc) : null;
      if (remoteRoot) {
        remoteRoot.scrollTo(localRoot.scrollLeft, localRoot.scrollTop);
        return;
      }
      if (attempts++ < 30) requestAnimationFrame(tryOnce);
    };
    tryOnce();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {scale > 0 ? (
        <iframe
          ref={iframeRef}
          src={`/?d=${depth + 1}`}
          title="Live recursive preview of vikng.dev"
          tabIndex={-1}
          aria-hidden
          onLoad={syncInitialScroll}
          style={{
            width: "100vw",
            height: "calc(100vw * 132 / 203)",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="pointer-events-none absolute left-0 top-0 border-0"
        />
      ) : null}
    </div>
  );
}
