import type { ReactNode } from "react";
import { Shield, Gamepad2, Wallet, Boxes } from "lucide-react";
import {
  SiReact,
  SiAmazon,
  SiAwslambda,
  SiGooglecloud,
  SiDocker,
  SiTerraform,
  SiGodotengine,
  SiAndroid,
  SiEthereum,
  SiCloudflare,
  SiWhatsapp,
} from "react-icons/si";
import { TanstackIcon } from "@/components/icons/tanstack-icon";

type ProjectImage = {
  src: string;
  alt: string;
  theme: "light" | "dark" | "any";
};

type TechItem = {
  label: string;
  icon: ReactNode;
};

export type Project = {
  title: string;
  href: string | null;
  description: string;
  status: "in production" | "in development";
  techHighlights: TechItem[];
  allTechnologies: TechItem[];
  roles: string[];
  achievements: string[];
  images: ProjectImage[];
  icon: ReactNode;
};

export const projects: Project[] = [
  {
    title: "threatlight.com",
    href: "https://threatlight.com",
    description: "Targeted Detection and Response",
    status: "in production",
    techHighlights: [
      { label: "GCP", icon: <SiGooglecloud className="size-5" /> },
      { label: "Docker", icon: <SiDocker className="size-5" /> },
      { label: "Terraform", icon: <SiTerraform className="size-5" /> },
    ],
    allTechnologies: [
      { label: "GCP", icon: <SiGooglecloud className="size-5" /> },
      { label: "Docker", icon: <SiDocker className="size-5" /> },
      { label: "Terraform", icon: <SiTerraform className="size-5" /> },
      { label: "Compute Engine", icon: <span className="text-[10px] leading-none">C</span> },
      { label: "VPC", icon: <span className="text-[10px] leading-none">V</span> },
      { label: "IAM", icon: <span className="text-[10px] leading-none">I</span> },
      { label: "Monitoring", icon: <span className="text-[10px] leading-none">M</span> },
      { label: "Logging", icon: <span className="text-[10px] leading-none">L</span> },
    ],
    roles: ["Security architecture", "Detection rule tuning", "Infrastructure-as-code", "Deployment automation"],
    achievements: [
      "Built repeatable cloud security environments with automated provisioning",
      "Improved signal coverage for targeted threat scenarios",
      "Hardened access controls across critical services",
    ],
    images: [
      { src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" },
      { src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" },
      { src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" },
      { src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" },
      { src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" },
    ],
    icon: <Shield className="size-4" />,
  },
  {
    title: "flowcost.co",
    href: "https://flowcost.co",
    description: "Expense Tracker for Digital Nomads",
    status: "in production",
    techHighlights: [
      { label: "Tanstack Start", icon: <TanstackIcon className="size-5" /> },
      { label: "CloudFlare", icon: <SiCloudflare className="size-5" /> },
      { label: "WhatsApp Business", icon: <SiWhatsapp className="size-4" /> },
    ],
    allTechnologies: [
      { label: "Tanstack Start", icon: <TanstackIcon className="size-5" /> },
      { label: "CloudFlare", icon: <SiCloudflare className="size-5" /> },
      { label: "WhatsApp Business", icon: <SiWhatsapp className="size-4" /> },
      { label: "TypeScript", icon: <span className="text-[10px] leading-none">TS</span> },
      { label: "Webhooks", icon: <span className="text-[10px] leading-none">W</span> },
      { label: "REST APIs", icon: <span className="text-[10px] leading-none">R</span> },
      { label: "Analytics", icon: <span className="text-[10px] leading-none">A</span> },
    ],
    roles: ["Full-stack product development", "Messaging automation", "Spending insights and categorization"],
    achievements: [
      "Shipped a WhatsApp-first UX for fast expense capture",
      "Automated expense parsing and tagging from chat inputs",
      "Designed multi-currency budgeting views for travelers",
    ],
    images: [
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
    ],
    icon: <Wallet className="size-4" />,
  },
  {
    title: "ironfront",
    description: "Android Tank Game",
    status: "in development",
    href: null,
    techHighlights: [
      { label: "Godot", icon: <SiGodotengine className="size-5" /> },
      { label: "Android", icon: <SiAndroid className="size-5" /> },
    ],
    allTechnologies: [
      { label: "Godot", icon: <SiGodotengine className="size-5" /> },
      { label: "GDScript", icon: <span className="text-[10px] leading-none">G</span> },
      { label: "Android", icon: <SiAndroid className="size-5" /> },
      { label: "2D physics", icon: <span className="text-[10px] leading-none">2D</span> },
      { label: "Input handling", icon: <span className="text-[10px] leading-none">I</span> },
      { label: "Level tooling", icon: <span className="text-[10px] leading-none">L</span> },
    ],
    roles: ["Gameplay programming", "Level design", "Mobile performance tuning"],
    achievements: [
      "Prototyped core combat loop and controls",
      "Built modular levels for rapid iteration",
      "Optimized gameplay for mid-range Android devices",
    ],
    images: [
      { src: "/projects/ironfront-light.png", alt: "Ironfront light theme gameplay", theme: "light" },
      { src: "/projects/ironfront-light.png", alt: "Ironfront light theme gameplay", theme: "light" },
      { src: "/projects/ironfront-light.png", alt: "Ironfront light theme gameplay", theme: "light" },
      { src: "/projects/ironfront-dark.png", alt: "Ironfront dark theme gameplay", theme: "dark" },
      { src: "/projects/ironfront-dark.png", alt: "Ironfront dark theme gameplay", theme: "dark" },
      { src: "/projects/ironfront-dark.png", alt: "Ironfront dark theme gameplay", theme: "dark" },
    ],
    icon: <Gamepad2 className="size-4" />,
  },
  {
    title: "app.grix.finance",
    href: "https://app.grix.finance",
    description: "Web3 Options Aggregator",
    status: "in production",
    techHighlights: [
      { label: "React", icon: <SiReact className="size-5" /> },
      { label: "AWS", icon: <SiAmazon className="size-5" /> },
      { label: "Lambda", icon: <SiAwslambda className="size-5" /> },
      { label: "Web3", icon: <SiEthereum className="size-5" /> },
    ],
    allTechnologies: [
      { label: "React", icon: <SiReact className="size-5" /> },
      { label: "AWS", icon: <SiAmazon className="size-5" /> },
      { label: "Lambda", icon: <SiAwslambda className="size-5" /> },
      { label: "API Gateway", icon: <span className="text-[10px] leading-none">AP</span> },
      { label: "TypeScript", icon: <span className="text-[10px] leading-none">TS</span> },
      { label: "Web3", icon: <SiEthereum className="size-5" /> },
      { label: "Smart contracts", icon: <span className="text-[10px] leading-none">SC</span> },
      { label: "Options analytics", icon: <span className="text-[10px] leading-none">OA</span> },
    ],
    roles: ["Frontend architecture", "Trading workflow automation", "Backend integrations"],
    achievements: [
      "Unified multi-venue quotes into a single trading UI",
      "Built options analytics surfaces for decision support",
      "Automated trade execution flows with guardrails",
    ],
    images: [
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
    ],
    icon: <Boxes className="size-4" />,
  },
];
