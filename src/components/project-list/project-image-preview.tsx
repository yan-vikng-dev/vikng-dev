"use client";

import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectImage } from "@/data/projects";
import { MAX_MIRROR_DEPTH, PROJECT_IMAGE_SIZES } from "./constants";
import { MirrorPreview } from "./mirror-preview";

export type PreviewKind =
  | { type: "self" }
  | { type: "single"; image: ProjectImage }
  | { type: "themed"; light: ProjectImage; dark: ProjectImage };

export function resolvePreview(project: Project): PreviewKind {
  if (project.selfPreview) return { type: "self" };

  const images = project.images ?? [];
  const anyImage = images.find((image) => image.theme === "any");
  if (anyImage) return { type: "single", image: anyImage };

  const light = images.find((image) => image.theme === "light");
  const dark = images.find((image) => image.theme === "dark");
  if (light && dark) return { type: "themed", light, dark };

  throw new Error(`Project "${project.title}" is missing preview images`);
}

function imageClassName(imageFit: Project["imageFit"]) {
  return imageFit === "contain"
    ? "object-contain transition-opacity duration-300"
    : "object-cover transition-opacity duration-300";
}

function SelfPreviewContent({ depth, inView }: { depth: number; inView: boolean }) {
  if (depth >= MAX_MIRROR_DEPTH) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
        <InfinityIcon className="size-6" />
        <span className="text-xs font-medium">vikng.dev</span>
      </div>
    );
  }

  if (depth >= 1 || inView) {
    // depth 0 (top page) waits until scrolled near; embedded levels mount
    // immediately — their IntersectionObserver can't fire, since ancestor iframe
    // clipping keeps them under-threshold.
    return <MirrorPreview depth={depth} />;
  }

  return (
    <div className="absolute inset-0 grid place-items-center">
      <InfinityIcon className="size-6 text-muted-foreground/40" />
    </div>
  );
}

function SingleImageContent({
  image,
  priority,
  imageFit,
}: {
  image: ProjectImage;
  priority: boolean;
  imageFit: Project["imageFit"];
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={PROJECT_IMAGE_SIZES}
      priority={priority}
      className={imageClassName(imageFit)}
    />
  );
}

function ThemedImagesContent({
  light,
  dark,
  priority,
  imageFit,
}: {
  light: ProjectImage;
  dark: ProjectImage;
  priority: boolean;
  imageFit: Project["imageFit"];
}) {
  const fitClassName = imageClassName(imageFit);

  return (
    <>
      <Image
        src={light.src}
        alt={light.alt}
        fill
        sizes={PROJECT_IMAGE_SIZES}
        priority={priority}
        className={cn(fitClassName, "block dark:hidden")}
      />
      <Image
        src={dark.src}
        alt={dark.alt}
        fill
        sizes={PROJECT_IMAGE_SIZES}
        priority={priority}
        className={cn(fitClassName, "hidden dark:block")}
      />
    </>
  );
}

type ProjectImagePreviewProps = {
  preview: PreviewKind;
  priority: boolean;
  depth: number;
  inView: boolean;
  imageFit: Project["imageFit"];
};

export function ProjectImagePreview({
  preview,
  priority,
  depth,
  inView,
  imageFit,
}: ProjectImagePreviewProps) {
  switch (preview.type) {
    case "self":
      return <SelfPreviewContent depth={depth} inView={inView} />;
    case "single":
      return <SingleImageContent image={preview.image} priority={priority} imageFit={imageFit} />;
    case "themed":
      return (
        <ThemedImagesContent
          light={preview.light}
          dark={preview.dark}
          priority={priority}
          imageFit={imageFit}
        />
      );
  }
}
