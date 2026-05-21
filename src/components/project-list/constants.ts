import { Hammer, Ship } from "lucide-react";
import type * as React from "react";
import { SunsetIcon } from "@/components/icons/sunset-icon";
import type { Project } from "@/data/projects";

export const MAX_MIRROR_DEPTH = 4;

export const PROJECT_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px";

export const STATUS_BADGES: Record<
  Project["status"],
  {
    label: string;
    className: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  "in production": {
    label: "in production",
    className: "gap-1 bg-green-500/15 text-green-600 border-green-500/30",
    Icon: Ship,
  },
  "in development": {
    label: "in development",
    className: "gap-1 bg-amber-500/15 text-amber-700 border-amber-500/30",
    Icon: Hammer,
  },
  sunset: {
    label: "sunset",
    className: "gap-1 bg-gray-500/15 text-gray-600 border-gray-500/30 dark:text-gray-400",
    Icon: SunsetIcon,
  },
};

export const IMAGE_FRAME_VARIANTS = {
  icon: {
    shell: "",
    frame: "",
    padding: "p-6 sm:p-8",
  },
  default: {
    shell: "project-image-shell",
    frame: "project-image-frame bg-muted border rounded-sm",
    padding: "",
  },
} as const;

export type ImageFrameVariant = (typeof IMAGE_FRAME_VARIANTS)[keyof typeof IMAGE_FRAME_VARIANTS];

export function getFrameVariant(project: Project): ImageFrameVariant {
  if (project.imageFit === "contain") return IMAGE_FRAME_VARIANTS.icon;
  return IMAGE_FRAME_VARIANTS.default;
}
