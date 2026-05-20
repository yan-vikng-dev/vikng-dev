"use client";

import { useEffect, useRef, type ComponentRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// Wraps the page in SimpleBar so the site uses a single, custom scrollbar
// instead of the native one. Because body scrolling is disabled, native
// hash-link navigation no longer works; we intercept same-page anchor clicks
// (and the initial location hash) and scroll inside SimpleBar manually.
export function SiteScrollbar({ children }: { children: React.ReactNode }) {
  const ref = useRef<ComponentRef<typeof SimpleBar>>(null);

  useEffect(() => {
    const scrollEl = ref.current?.getScrollElement?.();
    if (!scrollEl) return;

    const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
      const target = document.getElementById(id);
      if (!target) return false;
      const targetRect = target.getBoundingClientRect();
      const rootRect = scrollEl.getBoundingClientRect();
      scrollEl.scrollTo({
        top: targetRect.top - rootRect.top + scrollEl.scrollTop,
        behavior,
      });
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      const samePath =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname;
      if (!samePath || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;
      if (scrollToId(id)) {
        e.preventDefault();
        history.replaceState(null, "", `#${id}`);
      }
    };
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      requestAnimationFrame(() => scrollToId(id, "auto"));
    }

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <SimpleBar
      ref={ref}
      className="site-scrollbar"
      scrollableNodeProps={{ "data-site-scroll-root": "" }}
    >
      {children}
    </SimpleBar>
  );
}
