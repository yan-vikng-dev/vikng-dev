import type { ReactNode } from "react";
import { Shield, Gamepad2, Wallet, Boxes } from "lucide-react";
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

type ProjectImage = {
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
  href: string | null;
  opensourceHref?: string;
  description: string;
  status: "in production" | "in development";
  imageFit?: "cover" | "contain";
  imageFrameStyle?: "default" | "glass";
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
      { label: "Next.js", icon: <SiNextdotjs className="size-5" /> },
      { label: "Compute Engine", icon: <MonoSvgIcon src="/external_logos/gcp-compute-engine.svg" label="Compute Engine" /> },
      { label: "Monitoring", icon: <MonoSvgIcon src="/external_logos/gcp-monitoring.svg" label="Monitoring" /> },
      { label: "DNS", icon: <SiCloudflare className="size-5" /> },
      { label: "CI/CD", icon: <SiGithubactions className="size-5" /> },
      { label: "Python", icon: <SiPython className="size-5" /> },
      { label: "TypeScript", icon: <SiTypescript className="size-5" /> },
    ],
    roles: ["Infrastructure as code", "Deployment automation", "Web-based application", "Landing page"],
    achievements: [
      "Automated L1 Triage with AI ",
      "Developed web app from start to finish",
      "Integrated web app with existing security tools",
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
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-light.png", alt: "Flowcost light theme interface", theme: "light" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
      { src: "/projects/flowcost-dark.png", alt: "Flowcost dark theme interface", theme: "dark" },
    ],
    icon: <Wallet className="size-4" />,
  },
  {
    title: "AutoQuit",
    href: "https://github.com/yan-vikng-dev/AutoQuit",
    opensourceHref: "https://github.com/yan-vikng-dev/autoquit",
    description: "MacOS cleanup utility",
    status: "in development",
    imageFit: "contain",
    imageFrameStyle: "glass",
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
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
      { src: "/projects/grix.png", alt: "Grix finance trading dashboard", theme: "any" },
    ],
    icon: <Boxes className="size-4" />,
  },
];
