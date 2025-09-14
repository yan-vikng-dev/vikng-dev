"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Brain, Cloud, Database, Gamepad2, Wallet, Boxes } from "lucide-react";

export type Project = {
  title: string;
  href?: string;
  description: string;
  bullets: string[];
  tech: string[];
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
};

const projects: Project[] = [
  {
    title: "app.grix.finance",
    href: "https://app.grix.finance",
    description: "web3 options aggregator for ethereum options protocols",
    bullets: [
      "frontend React work as part of a 4‑dev team",
      "backend financial algorithms for options pricing/aggregation",
      "AWS Lambda based backend & data pipelines",
      "AI agent platform for configurable trade simulation",
    ],
    tech: ["React", "AWS", "Lambda", "Web3", "AI"],
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: "threatlight.com",
    href: "https://threatlight.com",
    description: "complete security system: detection → response",
    bullets: [
      "functional EDR dashboard shipped fast",
      "automated deployments & update distribution system",
      "hands‑on security improvements across the stack",
      "built on GCP with Docker, VMs, Terraform",
    ],
    tech: ["GCP", "Docker", "VMs", "Terraform", "Security"],
    icon: <Shield className="h-4 w-4" />,
  },
  {
    title: "ironfront",
    description: "android tank game — passion project",
    bullets: [
      "built with Godot + GDScript",
      "art direction, gameplay design, branding",
      "mobile performance & feel tuned by hand",
    ],
    tech: ["Godot", "GDScript", "Android"],
    icon: <Gamepad2 className="h-4 w-4" />,
  },
  {
    title: "driftlog.work",
    href: "https://driftlog.work",
    description: "digital nomad cost tracking",
    bullets: [
      "built with Next.js + Firebase + Firestore",
      "AI integration for smart categorization",
      "focused UX for travelers",
    ],
    tech: ["Next.js", "Firebase", "Firestore", "AI"],
    icon: <Boxes className="h-4 w-4" />,
  },
];

function ProjectItem({ project }: { project: Project }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <li ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_3fr] sm:gap-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
        {project.imageSrc ? (
          <Image src={project.imageSrc} alt={project.imageAlt || project.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            image coming soon
          </div>
        )}
      </div>

      <div
        data-in-view={inView}
        className="flex flex-col gap-2 opacity-0 translate-y-4 transition-[opacity,transform] duration-500 data-[in-view=true]:opacity-100 data-[in-view=true]:translate-y-0"
      >
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
        <p className="text-sm text-foreground/80">{project.description}</p>

        <ul className="mt-1 space-y-1 text-sm text-foreground/80 list-disc pl-4">
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </div>
      </div>
    </li>
  );
}

export function ProjectList() {
  return (
    <ul className="flex flex-col gap-12">
      {projects.map((p) => (
        <ProjectItem key={p.title} project={p} />)
      )}
    </ul>
  );
}
