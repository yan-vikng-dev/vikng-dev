"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import { projects, type Project } from "@/data/projects";

function ProjectItem({ project, priority }: { project: Project; priority: boolean }) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.25 });
  const [mounted, setMounted] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [toggleLabel, setToggleLabel] = React.useState("more");
  const [togglePhase, setTogglePhase] = React.useState<"idle" | "erasing" | "typing">("idle");
  const firstToggleRender = React.useRef(true);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? (resolvedTheme ?? "light") : "light";
  const themedImages = React.useMemo(() => {
    const exact = project.images.filter((image) => image.theme === theme);
    const any = project.images.filter((image) => image.theme === "any");
    if (exact.length > 0) {
      return exact.concat(any);
    }
    return any.length > 0 ? any : project.images;
  }, [project.images, theme]);

  const active = themedImages[0];
  const expandedId = `${project.title}-details`;

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
        <div key={item.label} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 h-8" title={item.label} aria-label={item.label}>
          <span className="grid place-items-center size-5">
            {item.icon}
          </span>
          <span className="text-xs font-medium text-foreground/80">{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <li ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_3fr] sm:gap-8">
      <div className="relative aspect-[203/132] w-full overflow-hidden rounded-sm border bg-muted">
        {active ? (
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
            priority={priority}
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            image coming soon
          </div>
        )}
      </div>

      <div
        data-in-view={inView}
        className="flex flex-col gap-2 h-full opacity-0 translate-y-4 transition-[opacity,transform] duration-500 data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {project.icon}
            {project.href ? (
              <Link href={project.href} target="_blank" rel="noreferrer" className="text-base sm:text-lg font-medium hover:underline">
                {project.title}
              </Link>
            ) : (
              <h3 className="text-base sm:text-lg font-medium">{project.title}</h3>
            )}
          </div>
          <div>
            <Badge
              className={
                project.status === "in production"
                  ? "bg-green-500/15 text-green-600 border-green-500/30"
                  : "bg-amber-500/15 text-amber-700 border-amber-500/30"
              }
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-foreground/80">{project.description}</p>

          {techChipList(project.techHighlights)}
        </div>

        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center text-xs font-medium text-foreground/80 hover:text-foreground"
            aria-expanded={expanded}
            aria-controls={expandedId}
          >
            <ChevronDown className={expanded ? "mr-1 size-3 transition-transform duration-300 rotate-180" : "mr-1 size-3 transition-transform duration-300"} />
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
      </div>

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
          <div className="space-y-3 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">All technologies</p>
              {techChipList(project.allTechnologies)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Roles & responsibilities</p>
              <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Major achievements</p>
              <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProjectList() {
  return (
    <ul className="flex flex-col gap-12">
      {projects.map((p, i) => (
        <ProjectItem key={p.title} project={p} priority={i === 0} />)
      )}
    </ul>
  );
}
