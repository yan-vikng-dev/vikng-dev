"use client";

import Link from "next/link";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { TypingWord } from "@/components/typing-word";
import { TechnologyMarquee } from "@/components/technology-marquee";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";
import { STATUS_BADGES, getFrameVariant } from "./constants";
import { ProjectImageFrame } from "./project-image-frame";
import { ProjectImagePreview, resolvePreview } from "./project-image-preview";

type ProjectItemProps = {
  project: Project;
  priority: boolean;
  expanded: boolean;
  onToggle: () => void;
  index: number;
  depth: number;
};

function ProjectItem({ project, priority, expanded, onToggle, index, depth }: ProjectItemProps) {
  const statusBadge = STATUS_BADGES[project.status];
  const StatusIcon = statusBadge.Icon;
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.25 });

  const frameVariant = getFrameVariant(project);
  const preview = resolvePreview(project);
  const expandedId = `${project.title}-details`;
  const hasExpandedContent =
    project.allTechnologies.length > 0 ||
    project.roles.length > 0 ||
    project.achievements.length > 0;
  const staggerDelay = `${index * 80}ms`;

  const techChipList = (items: Project["techHighlights"]) => (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-1 rounded-md border bg-background px-2 h-8 transition-colors hover:bg-foreground hover:text-background hover:border-foreground"
          aria-label={item.label}
        >
          <span className="grid place-items-center size-5 text-current">{item.icon}</span>
          <span className="text-sm font-medium text-current">{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <li
      ref={ref}
      className={cn(
        "grid gap-4 sm:grid-cols-[2fr_3fr] sm:gap-8",
        project.selfPreview ? "grid-cols-[1fr_2fr]" : "grid-cols-1",
      )}
    >
      <ProjectImageFrame variant={frameVariant}>
        <ProjectImagePreview
          preview={preview}
          priority={priority}
          depth={depth}
          inView={inView}
          imageFit={project.imageFit}
        />
      </ProjectImageFrame>

      <div
        data-in-view={inView}
        className="flex flex-col gap-2 h-full opacity-0 translate-y-4 transition-[opacity,transform] duration-500 data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0"
        style={{ transitionDelay: inView ? staggerDelay : "0ms" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {project.icon}
            <Link
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium hover:underline"
            >
              {project.title}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={statusBadge.className}>
              <StatusIcon className="size-3 shrink-0" aria-hidden="true" />
              {statusBadge.label}
            </Badge>
            {project.opensourceHref ? (
              <Link href={project.opensourceHref} target="_blank" rel="noreferrer">
                <Badge className="gap-1 bg-blue-500/15 text-blue-500 border-blue-500/35 hover:bg-blue-500/25 transition-colors cursor-pointer">
                  <SiGithub className="size-3 shrink-0" aria-hidden="true" />
                  open source
                </Badge>
              </Link>
            ) : null}
          </div>
          <p className="text-sm text-foreground/80">{project.description}</p>

          {project.techHighlights.length > 0 ? techChipList(project.techHighlights) : null}
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
              <ChevronDown
                className={
                  expanded
                    ? "mr-2 size-4 transition-transform duration-300 rotate-180"
                    : "mr-2 size-4 transition-transform duration-300"
                }
              />
              <span>See&nbsp;</span>
              <TypingWord text={expanded ? "less" : "more"} />
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
                <p className="text-sm uppercase tracking-wide text-foreground font-semibold">
                  All technologies
                </p>
                <TechnologyMarquee items={project.allTechnologies} />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wide text-foreground font-semibold">
                    Roles & responsibilities
                  </p>
                  <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
                    {project.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-foreground/30" />
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wide text-foreground font-semibold">
                    Major achievements
                  </p>
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
        />
      ))}
    </ul>
  );
}
