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
          "relative aspect-[203/132] w-full overflow-hidden",
          variant.padding,
          variant.frame
        )}
      >
        {children}
      </div>
    </div>
  );
}
