"use client";

import { useEffect } from "react";

/**
 * Routes in-page hash links through scrollIntoView with smooth behaviour.
 * Nav clearance comes from each section's `scroll-mt-*`, not manual math.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function scrollToHash(hash: string) {
      const target = hash && document.querySelector<HTMLElement>(hash);
      if (!target) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }

    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement)?.closest?.(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      event.preventDefault();
      window.history.pushState(null, "", href);
      scrollToHash(href);
    }

    document.addEventListener("click", onClick);
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
