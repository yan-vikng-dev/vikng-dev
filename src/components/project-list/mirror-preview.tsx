"use client";

import * as React from "react";

// The vikng.dev card embeds the live home page recursively. On desktop (≥640px)
// the iframe sits in the standard landscape card slot like every other project —
// no device shell; hall-of-mirrors aligns because desktop viewports are roughly
// landscape. On mobile the phone-shaped device mockup sits beside the title/data
// (project-list uses grid-cols-[1fr_2fr] for selfPreview items). The iframe
// aspect matches the viewport so recursion lines up at every depth on portrait
// phones. Scroll is mirrored in pixels via SimpleBar's data-site-scroll-root.
// MAX_MIRROR_DEPTH is the recursion stop (handled upstream in project-image-preview).
function getScrollRoot(doc: Document): HTMLElement | null {
  return doc.querySelector<HTMLElement>("[data-site-scroll-root]");
}

function syncScrollPosition(localRoot: HTMLElement, remoteRoot: HTMLElement) {
  remoteRoot.scrollTo(localRoot.scrollLeft, localRoot.scrollTop);
}

function useScrollMirror(iframeRef: React.RefObject<HTMLIFrameElement | null>): () => void {
  React.useEffect(() => {
    const localRoot = getScrollRoot(document);
    if (!localRoot) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const iframeDoc = iframeRef.current?.contentDocument;
      const remoteRoot = iframeDoc ? getScrollRoot(iframeDoc) : null;
      if (!remoteRoot) return;
      syncScrollPosition(localRoot, remoteRoot);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    localRoot.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      localRoot.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [iframeRef]);

  return React.useCallback(() => {
    const localRoot = getScrollRoot(document);
    if (!localRoot) return;
    let attempts = 0;
    const tryOnce = () => {
      const iframeDoc = iframeRef.current?.contentDocument;
      const remoteRoot = iframeDoc ? getScrollRoot(iframeDoc) : null;
      if (remoteRoot) {
        syncScrollPosition(localRoot, remoteRoot);
        return;
      }
      if (attempts++ < 30) requestAnimationFrame(tryOnce);
    };
    tryOnce();
  }, [iframeRef]);
}

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

type MirrorMetrics = {
  cardW: number;
  cardH: number;
  vw: number;
  vh: number;
  scale: number;
};

function DesktopMirror({ depth }: { depth: number }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = React.useState(0);
  const syncInitialScroll = useScrollMirror(iframeRef);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const w = wrap.clientWidth;
      const vw = window.innerWidth;
      if (w <= 0 || vw <= 0) return;
      setScale(w / vw);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden [contain:strict]">
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

function MobileMirror({ depth }: { depth: number }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [metrics, setMetrics] = React.useState<MirrorMetrics | null>(null);
  const syncInitialScroll = useScrollMirror(iframeRef);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const cardW = wrap.clientWidth;
      const cardH = wrap.clientHeight;
      const vw = window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      if (cardW <= 0 || cardH <= 0 || vw <= 0 || vh <= 0) return;
      const scale = Math.min(cardW / vw, cardH / vh);
      if (scale <= 0) return;
      setMetrics({ cardW, cardH, vw, vh, scale });
    };
    measure();
    window.addEventListener("resize", measure);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => {
      window.removeEventListener("resize", measure);
      vv?.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const m = metrics;
  const show = m && m.scale > 0;
  const cardW = show ? m.cardW : 0;
  const cardH = show ? m.cardH : 0;
  const bezelPx = show ? Math.max(2, Math.min(10, cardW * 0.025)) : 0;
  const innerRadiusPx = show ? Math.max(2, Math.min(14, cardW * 0.035)) : 0;
  const outerRadiusPx = innerRadiusPx + bezelPx;
  const screenW = Math.max(0, cardW - bezelPx * 2);
  const screenH = Math.max(0, cardH - bezelPx * 2);
  const iframeScale = show ? Math.min(screenW / m.vw, screenH / m.vh) : 0;
  const iframeOffsetX = show ? (screenW - m.vw * iframeScale) / 2 : 0;
  const iframeOffsetY = show ? (screenH - m.vh * iframeScale) / 2 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden [contain:strict]"
      style={{ aspectRatio: m ? `${m.vw} / ${m.vh}` : "203 / 132" }}
    >
      {show ? (
        <div
          style={{ padding: bezelPx, borderRadius: outerRadiusPx }}
          className="absolute inset-0 bg-zinc-900 shadow-md dark:bg-zinc-800 dark:shadow-black/40"
        >
          <div
            style={{ borderRadius: innerRadiusPx }}
            className="relative h-full w-full overflow-hidden bg-background"
          >
            <iframe
              ref={iframeRef}
              src={`/?d=${depth + 1}`}
              title="Live recursive preview of vikng.dev"
              tabIndex={-1}
              aria-hidden
              onLoad={syncInitialScroll}
              style={{
                width: `${m.vw}px`,
                height: `${m.vh}px`,
                transform: `translate(${iframeOffsetX}px, ${iframeOffsetY}px) scale(${iframeScale})`,
                transformOrigin: "top left",
              }}
              className="pointer-events-none absolute left-0 top-0 block border-0"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function MirrorPreview({ depth }: { depth: number }) {
  const isDesktop = useIsDesktop();
  return isDesktop ? <DesktopMirror depth={depth} /> : <MobileMirror depth={depth} />;
}
