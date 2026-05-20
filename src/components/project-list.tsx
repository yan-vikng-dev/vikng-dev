"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ChevronDown, InfinityIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { useInView } from "@/hooks/use-in-view";
import { projects, type Project } from "@/data/projects";

const MAX_MIRROR_DEPTH = 4;

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

function MirrorPreview({ depth }: { depth: number }) {
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

type ProjectItemProps = {
  project: Project;
  priority: boolean;
  expanded: boolean;
  onToggle: () => void;
  index: number;
  depth: number;
};

function ProjectItem({ project, priority, expanded, onToggle, index, depth }: ProjectItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.25 });
  const [toggleLabel, setToggleLabel] = React.useState("more");
  const [togglePhase, setTogglePhase] = React.useState<"idle" | "erasing" | "typing">("idle");
  const firstToggleRender = React.useRef(true);

  const anyImage = React.useMemo(
    () => project.images.find((image) => image.theme === "any"),
    [project.images]
  );
  const lightImage = React.useMemo(
    () => project.images.find((image) => image.theme === "light"),
    [project.images]
  );
  const darkImage = React.useMemo(
    () => project.images.find((image) => image.theme === "dark"),
    [project.images]
  );
  const expandedId = `${project.title}-details`;
  const hasExpandedContent =
    project.allTechnologies.length > 0 ||
    project.roles.length > 0 ||
    project.achievements.length > 0;
  const isIconTile = project.imageFit === "contain";
  const imageClassName = isIconTile
    ? "object-contain drop-shadow-[0_10px_22px_rgba(2,6,23,0.18)] dark:drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)] transition-opacity duration-300"
    : "object-cover transition-opacity duration-300";
  const imageFrameClassName =
    project.imageFrameStyle === "glass"
      ? "project-image-frame project-image-frame-glass border rounded-sm"
      : isIconTile
      ? ""
      : "project-image-frame bg-muted border rounded-sm";
  const imageShellClassName =
    project.imageFrameStyle === "glass"
      ? "project-image-shell project-image-shell-glass"
      : isIconTile
      ? ""
      : "project-image-shell";
  const staggerDelay = `${index * 80}ms`;

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (project.imageFrameStyle !== "glass") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--glow-x", `${x}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y}%`);
    event.currentTarget.style.setProperty("--glow-alpha", "0.55");
  };

  const handleImagePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (project.imageFrameStyle !== "glass") return;
    event.currentTarget.style.setProperty("--glow-alpha", "0");
  };

  React.useEffect(() => {
    const nextLabel = expanded ? "less" : "more";
    if (firstToggleRender.current) {
      firstToggleRender.current = false;
      setToggleLabel(nextLabel);
      setTogglePhase("idle");
      return;
    }
    setTogglePhase("erasing");
    const eraseTimer = window.setTimeout(() => {
      setToggleLabel(nextLabel);
      setTogglePhase("typing");
    }, 200);
    const typeTimer = window.setTimeout(() => {
      setTogglePhase("idle");
    }, 440);
    return () => {
      window.clearTimeout(eraseTimer);
      window.clearTimeout(typeTimer);
    };
  }, [expanded]);
  const techChipList = (items: Project["techHighlights"]) => (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 h-8 transition-colors hover:bg-foreground hover:text-background hover:border-foreground" aria-label={item.label}>
          <span className="grid place-items-center size-5 text-current">
            {item.icon}
          </span>
          <span className="text-sm font-medium text-current">{item.label}</span>
        </div>
      ))}
    </div>
  );
  return (
    <li ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_3fr] sm:gap-8">
      <div
        className={imageShellClassName}
        onPointerMove={handleImagePointerMove}
        onPointerLeave={handleImagePointerLeave}
      >
        <div className={`relative aspect-[203/132] w-full overflow-hidden ${isIconTile ? "p-6 sm:p-8" : ""} ${imageFrameClassName}`}>
          {project.selfPreview ? (
            depth >= MAX_MIRROR_DEPTH ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
                <InfinityIcon className="size-6" />
                <span className="text-xs font-medium">vikng.dev</span>
              </div>
            ) : depth >= 1 || inView ? (
              // depth 0 (top page) waits until scrolled near; embedded levels
              // mount immediately — their IntersectionObserver can't fire,
              // since ancestor iframe clipping keeps them under-threshold.
              <MirrorPreview depth={depth} />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <InfinityIcon className="size-6 text-muted-foreground/40" />
              </div>
            )
          ) : anyImage ? (
            <Image
              src={anyImage.src}
              alt={anyImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px"
              priority={priority}
              className={imageClassName}
            />
          ) : lightImage && darkImage ? (
            <>
              <Image
                src={lightImage.src}
                alt={lightImage.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px"
                priority={priority}
                className={`${imageClassName} block dark:hidden`}
              />
              <Image
                src={darkImage.src}
                alt={darkImage.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px"
                priority={priority}
                className={`${imageClassName} hidden dark:block`}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              image coming soon
            </div>
          )}
        </div>
      </div>

      <div
        data-in-view={inView}
        className="flex flex-col gap-2 h-full opacity-0 translate-y-4 transition-[opacity,transform] duration-500 data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0"
        style={{ transitionDelay: inView ? staggerDelay : "0ms" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {project.icon}
            {project.href ? (
            <Link href={project.href} target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
              {project.title}
            </Link>
          ) : (
            <h3 className="text-lg font-medium">{project.title}</h3>
          )}
        </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                project.status === "in production"
                  ? "bg-green-500/15 text-green-600 border-green-500/30"
                  : "bg-amber-500/15 text-amber-700 border-amber-500/30"
              }
            >
              {project.status}
            </Badge>
            {project.opensourceHref ? (
              <Link href={project.opensourceHref} target="_blank" rel="noreferrer">
                <Badge className="bg-blue-500/15 text-blue-500 border-blue-500/35 hover:bg-blue-500/25 transition-colors cursor-pointer">
                  open source
                </Badge>
              </Link>
            ) : null}
          </div>
        <p className="text-sm text-foreground/80">{project.description}</p>

          {techChipList(project.techHighlights)}
        </div>

        {hasExpandedContent ? (
          <div className="mt-auto pt-2">
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center text-lg font-medium text-foreground/80 hover:text-foreground"
              aria-expanded={expanded}
              aria-controls={expandedId}
            >
              <ChevronDown className={expanded ? "mr-2 size-4 transition-transform duration-300 rotate-180" : "mr-2 size-4 transition-transform duration-300"} />
              <span>See&nbsp;</span>
              <span
                className={
                  togglePhase === "erasing"
                    ? "typing-text typing-erase"
                    : togglePhase === "typing"
                    ? "typing-text typing-type"
                    : "typing-text typing-idle"
                }
                style={{ ["--typing-chars" as never]: toggleLabel.length }}
              >
                {toggleLabel}
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {hasExpandedContent ? (
        <div
          id={expandedId}
          aria-hidden={!expanded}
          className={
            expanded
              ? "sm:col-span-2 grid transition-[grid-template-rows,opacity] duration-300 ease-out grid-rows-[1fr] opacity-100"
              : "sm:col-span-2 grid transition-[grid-template-rows,opacity] duration-300 ease-out grid-rows-[0fr] opacity-0"
          }
        >
          <div className="overflow-hidden">
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-foreground font-semibold">All technologies</p>
                <TechnologyMarquee items={project.allTechnologies} />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wide text-foreground font-semibold">Roles & responsibilities</p>
                  <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
                    {project.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-foreground/30" />
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wide text-foreground font-semibold">Major achievements</p>
                  <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
                    {project.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function ProjectList({ depth = 0 }: { depth?: number }) {
  const [openProject, setOpenProject] = React.useState<string | null>(null);

  return (
    <ul className="flex flex-col gap-12">
      {projects.map((p, i) => (
        <ProjectItem
          key={p.title}
          project={p}
          priority={i === 0}
          expanded={openProject === p.title}
          onToggle={() => setOpenProject((current) => (current === p.title ? null : p.title))}
          index={i}
          depth={depth}
        />)
      )}
    </ul>
  );
}
