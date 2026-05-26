"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import type { ImageFrameVariant } from "./constants";

type ProjectImageFrameProps = {
  variant: ImageFrameVariant;
  children: React.ReactNode;
};

export function ProjectImageFrame({ variant, children }: ProjectImageFrameProps) {
  return (
    <div className={variant.shell}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          variant.aspect,
          variant.padding,
          variant.frame
        )}
      >
        {children}
      </div>
    </div>
  );
}
