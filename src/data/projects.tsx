import type { ReactNode } from "react";
import {
  Shield,
  Gamepad2,
  Wallet,
  Boxes,
  InfinityIcon,
  Cloud,
  Box,
  GitBranch,
  Server,
  Activity,
  Globe,
  Code2,
  Terminal,
} from "lucide-react";
import {
  SiReact,
  SiAmazon,
  SiAmazonapigateway,
  SiAwslambda,
  SiGooglecloud,
  SiDocker,
  SiTerraform,
  SiGodotengine,
  SiAndroid,
  SiEthereum,
  SiCloudflare,
  SiGithubactions,
  SiGoogleads,
  SiPosthog,
  SiSolidity,
  SiNextdotjs,
  SiWhatsapp,
  SiPython,
  SiTypescript,
  SiGoogleplay,
  SiAudacity,
} from "react-icons/si";
import { MacosIcon } from "@/components/icons/macos-icon";
import { SwiftIcon } from "@/components/icons/swift-icon";
import { TanstackIcon } from "@/components/icons/tanstack-icon";
import { XcodeIcon } from "@/components/icons/xcode-icon";
import { CloudflareWorkersIcon } from "@/components/icons/cloudflare-workers-icon";

export type ProjectImage = {
  src: string;
  alt: string;
  theme: "light" | "dark" | "any";
};

type TechItem = {
  label: string;
  icon: ReactNode;
};

type MonoSvgIconProps = {
  src: string;
  label: string;
};

const MonoSvgIcon = ({ src, label }: MonoSvgIconProps) => (
  <span
    className="inline-flex size-5 text-current"
    role="img"
    aria-label={label}
    style={{
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      backgroundColor: "currentColor",
    }}
  />
);

export type Project = {
  title: string;
  href: string;
  opensourceHref?: string;
  description: string;
  status: "in production" | "in development" | "sunset";
  imageFit?: "cover" | "contain";
  selfPreview?: boolean;
  techHighlights: TechItem[];
  allTechnologies: TechItem[];
  roles: string[];
  achievements: string[];
  images?: ProjectImage[];
  icon: ReactNode;
};

export const projects: Project[] = [
  {
    title: "Threatlight",
    href: "https://threatlight.com",
    description: "Targeted Detection and Response",
    status: "in production",
    techHighlights: [
      { label: "Cloud Infrastructure", icon: <Cloud className="size-5" /> },
      { label: "Containers", icon: <Box className="size-5" /> },
      { label: "CI/CD", icon: <GitBranch className="size-5" /> },
    ],
    allTechnologies: [
      { label: "Cloud Infrastructure", icon: <Cloud className="size-5" /> },
      { label: "Containers", icon: <Box className="size-5" /> },
      { label: "CI/CD", icon: <GitBranch className="size-5" /> },
      { label: "Virtual Machines", icon: <Server className="size-5" /> },
      { label: "Monitoring & observability", icon: <Activity className="size-5" /> },
      { label: "Networking", icon: <Globe className="size-5" /> },
      { label: "Web application", icon: <Code2 className="size-5" /> },
      { label: "Backend services", icon: <Terminal className="size-5" /> },
    ],
    roles: [
      "Full-stack product development",
      "Cloud platform engineering",
      "DevOps & release automation",
      "Production operations & observability",
    ],
    achievements: [
      "Shipped production application end-to-end",
      "Built and maintained infrastructure as code",
      "Automated operational workflows to reduce manual overhead",
      "Established deployment and monitoring pipelines",
    ],
    images: [{ src: "/projects/threatlight.png", alt: "Threatlight product interface", theme: "any" }],
    icon: <Shield className="size-4" />,
  },
  {
    title: "Flowcost",
    href: "https://flowcost.co",
    opensourceHref: "https://github.com/yan-vikng-dev/flowcost",
    description: "Expense Tracker for Digital Nomads",
    status: "in production",
    techHighlights: [
      { label: "CloudFlare", icon: <SiCloudflare className="size-5" /> },
      { label: "WhatsApp Business", icon: <SiWhatsapp className="size-4" /> },
      { label: "Google Ads", icon: <SiGoogleads className="size-5" /> },
    ],
    allTechnologies: [
      { label: "PostHog", icon: <SiPosthog className="size-5" /> },
      { label: "WhatsApp Business", icon: <SiWhatsapp className="size-4" /> },
      { label: "TypeScript", icon: <SiTypescript className="size-5" /> },
      { label: "Tanstack Start", icon: <TanstackIcon className="size-5" /> },
      { label: "Google Ads", icon: <SiGoogleads className="size-5" /> },
      { label: "Cloudflare Workers", icon: <CloudflareWorkersIcon className="size-5" /> },
    ],
    roles: [
      "End to end development",
      "Landing page with SSR",
      "Develop web application",
      "Develop WhatsApp AI assistant",
    ],
    achievements: [
      "Ship solo project with google ads campaign",
      "Write-capable AI assistant in WhatsApp",
    ],
    images: [
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
    ],
    icon: <Wallet className="size-4" />,
  },
  {
    title: "AutoQuit",
    href: "/autoquit",
    opensourceHref: "https://github.com/yan-vikng-dev/AutoQuit",
    description: "MacOS cleanup utility",
    status: "in production",
    imageFit: "contain",
    techHighlights: [
      { label: "Swift", icon: <SwiftIcon className="size-5" /> },
      { label: "Xcode", icon: <XcodeIcon className="size-5" /> },
      { label: "MacOS", icon: <MacosIcon className="size-5" /> },
    ],
    allTechnologies: [],
    roles: [],
    achievements: [],
    images: [
      { src: "/projects/autoquit.png", alt: "AutoQuit macOS app icon", theme: "any" },
    ],
    icon: <MacosIcon className="size-4" />,
  },
  {
    title: "Ironfront",
    description: "Android Tank Game",
    status: "in development",
    href: "https://github.com/yan-vikng-dev/ironfront",
    opensourceHref: "https://github.com/yan-vikng-dev/ironfront",
    techHighlights: [
      { label: "Godot", icon: <SiGodotengine className="size-5" /> },
      { label: "Android", icon: <SiAndroid className="size-5" /> },
    ],
    allTechnologies: [
      { label: "Godot", icon: <SiGodotengine className="size-5" /> },
      { label: "GDScript", icon: <SiGodotengine className="size-5" /> },
      { label: "Android", icon: <SiAndroid className="size-5" /> },
      { label: "Google Play", icon: <SiGoogleplay className="size-5" /> },
      { label: "Audacity", icon: <SiAudacity className="size-5" /> },
      { label: "Aseprite", icon: <MonoSvgIcon src="/external_logos/aseprite.svg" label="Aseprite" /> },
      { label: "GCP", icon: <SiGooglecloud className="size-5" /> },
    ],
    roles: ["End to end development", "Mobile Play Store release", "Hand crafted pixel art"],
    achievements: ["Realistic physics and body interactions", "Created custom, adaptive audio"],
    images: [
      { src: "/projects/ironfront-light.png", alt: "Ironfront light theme gameplay", theme: "light" },
      { src: "/projects/ironfront-dark.png", alt: "Ironfront dark theme gameplay", theme: "dark" },
    ],
    icon: <Gamepad2 className="size-4" />,
  },
  {
    title: "Grix Finance",
    href: "https://grix.finance",
    description: "Web3 Options Aggregator",
    status: "sunset",
    techHighlights: [
      { label: "React", icon: <SiReact className="size-5" /> },
      { label: "AWS", icon: <SiAmazon className="size-5" /> },
      { label: "Web3", icon: <SiEthereum className="size-5" /> },
    ],
    allTechnologies: [
      { label: "React", icon: <SiReact className="size-5" /> },
      { label: "AWS", icon: <SiAmazon className="size-5" /> },
      { label: "Lambda", icon: <SiAwslambda className="size-5" /> },
      { label: "API Gateway", icon: <SiAmazonapigateway className="size-5" /> },
      { label: "TypeScript", icon: <SiTypescript className="size-5" /> },
      { label: "Web3", icon: <SiEthereum className="size-5" /> },
      { label: "Smart contracts", icon: <SiSolidity className="size-5" /> },
    ],
    roles: ["AI trade bot design", "REST API development", "Web UI development"],
    achievements: [
      "Reduced app load times by up to 80%",
      "Reduced AWS bill by 30%",
      "Created customizable trade bots",
    ],
    images: [
      { src: "/projects/grix-light.png", alt: "Grix finance trading dashboard", theme: "light" },
      { src: "/projects/grix-dark.png", alt: "Grix finance trading dashboard", theme: "dark" },
    ],
    icon: <Boxes className="size-4" />,
  },
  {
    title: "vikng.dev",
    href: "/",
    description: "this",
    status: "in production",
    selfPreview: true,
    techHighlights: [
      { label: "Next.js", icon: <SiNextdotjs className="size-5" /> },
      { label: "TypeScript", icon: <SiTypescript className="size-5" /> },
      { label: "Cloudflare", icon: <SiCloudflare className="size-5" /> },
    ],
    allTechnologies: [],
    roles: [],
    achievements: [],
    icon: <InfinityIcon className="size-4" />,
  },
];
