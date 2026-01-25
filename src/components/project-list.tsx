"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Gamepad2, Wallet, Boxes } from "lucide-react";
import {
  SiReact,
  SiAmazon,
  SiAwslambda,
  SiNextdotjs,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiTerraform,
  SiGodotengine,
  SiAndroid,
  SiEthereum,
  SiCloudflare,
  SiWhatsapp,
} from "react-icons/si";
import { FirestoreIcon } from "@/components/icons/firestore-icon";
import { TanstackIcon } from "@/components/icons/tanstack-icon";

export type Project = {
  title: string;
  href?: string;
  description: string;
  status: "in production" | "in development";
  tech: string[];
  skills: string[];
  imageSrc?: string;
  imageSrcLight?: string;
  imageSrcDark?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
};

const projects: Project[] = [
  {
    title: "threatlight.com",
    href: "https://threatlight.com",
    description: "Targeted Detection and Response",
    status: "in production",
    tech: ["GCP", "Docker", "Terraform"],
    skills: ["Security environment", "VM orchestration"],
    imageSrc: "/projects/threatlight.png",
    icon: <Shield className="size-4" />,
  },
  {
    title: "flowcost.co",
    href: "https://flowcost.co",
    description: "Expense tracker for digital nomads",
    status: "in production",
    tech: ["Tanstack Start", "CloudFlare", "WhatsApp Business"],
    skills: ["WhatsApp AI Assistant", "Budgeting and Finance"],
    imageSrcLight: "/projects/flowcost-light.png",
    imageSrcDark: "/projects/flowcost-dark.png",
    icon: <Wallet className="size-4" />,
  },
  {
    title: "ironfront",
    description: "android tank game — passion project",
    status: "in development",
    tech: ["Godot", "Android"],
    skills: ["Gameplay and level design", "Android development"],
    imageSrcLight: "/projects/ironfront-light.png",
    imageSrcDark: "/projects/ironfront-dark.png",
    icon: <Gamepad2 className="size-4" />,
  },
  {
    title: "app.grix.finance",
    href: "https://app.grix.finance",
    description: "web3 options aggregator for ethereum options protocols",
    status: "in production",
    tech: ["React", "AWS", "Lambda", "Web3"],
    skills: ["AI‑driven trade execution", "Options pricing algorithms"],
    imageSrc: "/projects/grix.png",
    icon: <Boxes className="size-4" />,
  },
];

const techIconMap: Record<string, React.ReactNode> = {
  "React": <SiReact className="size-5" />,
  "AWS": <SiAmazon className="size-5" />,
  "Lambda": <SiAwslambda className="size-5" />,
  "Next.js": <SiNextdotjs className="size-5" />,
  "Firebase": <SiFirebase className="size-5" />,
  "Firestore": <FirestoreIcon className="size-5" />,
  "GCP": <SiGooglecloud className="size-5" />,
  "Docker": <SiDocker className="size-5" />,
  "Terraform": <SiTerraform className="size-5" />,
  "Godot": <SiGodotengine className="size-5" />,
  "Android": <SiAndroid className="size-5" />,
  "Web3": <SiEthereum className="size-5" />,
  "CloudFlare": <SiCloudflare className="size-5" />,
  "WhatsApp Business": <SiWhatsapp className="size-4" />,
  "Tanstack Start": <TanstackIcon className="size-5" />,
};

function ProjectItem({ project, priority }: { project: Project; priority?: boolean }) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.25 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? (resolvedTheme ?? "light") : "light";
  const imageSrc = project.imageSrc ?? (theme === "dark" ? project.imageSrcDark : project.imageSrcLight);

  return (
    <li ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_3fr] sm:gap-8">
      <div className="relative aspect-[203/132] w-full overflow-hidden rounded-sm border bg-muted">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
            priority={priority}
            className="object-cover"
          />
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

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {project.tech.map((t) => (
            <div key={t} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 h-8" title={t} aria-label={t}>
              <span className="grid place-items-center size-5">
                {techIconMap[t] ?? <span className="text-[10px] leading-none">{t[0]}</span>}
              </span>
              <span className="text-xs font-medium text-foreground/80">{t}</span>
            </div>
          ))}
        </div>

        {project.skills.length > 0 && (
          <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80 space-y-1">
            {project.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
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
