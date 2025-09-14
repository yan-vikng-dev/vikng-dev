"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function BlueprintBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 opacity-80 dark:opacity-60",
        className
      )}
      style={{
        backgroundImage: [
          "repeating-linear-gradient(0deg, transparent 0, transparent 23px, var(--border) 24px)",
          "repeating-linear-gradient(90deg, transparent 0, transparent 23px, var(--border) 24px)"
        ].join(","),
        backgroundSize: "24px 24px, 24px 24px",
        backgroundPosition: "0 0, 0 0",
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100" y2="100" stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="var(--border)" strokeOpacity="0.4" strokeWidth="0.2" />
        <circle cx="80" cy="20" r="6" fill="none" stroke="var(--border)" strokeOpacity="0.35" strokeWidth="0.2" />
      </svg>
    </div>
  );
}
