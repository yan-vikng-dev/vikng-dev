import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { BlueprintBackground } from "@/components/blueprint-background";
import { CopyCommandButton } from "@/components/copy-command-button";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = "force-dynamic";

const REPO_OWNER = "yan-vikng-dev";
const REPO_NAME = "AutoQuit";
const REPO = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const LATEST_RELEASE = `${REPO}/releases/latest`;
const BREW_COMMAND = "brew install --cask yan-vikng-dev/tap/autoquit";

const FALLBACK_VERSION = "1.0.0";
const FALLBACK_DMG_URL = `${REPO}/releases/download/v${FALLBACK_VERSION}/AutoQuit-v${FALLBACK_VERSION}.dmg`;

type ReleaseInfo = { version: string; dmgUrl: string };

type GithubRelease = {
  tag_name?: string;
  assets?: Array<{ name?: string; browser_download_url?: string }>;
};

async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "vikng.dev",
        },
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const data = (await res.json()) as GithubRelease;
    const version = data.tag_name?.replace(/^v/, "");
    const dmgUrl = data.assets?.find((a) => a.name?.endsWith(".dmg"))?.browser_download_url;
    if (!version || !dmgUrl) throw new Error("Latest release is missing tag or DMG asset");
    return { version, dmgUrl };
  } catch (err) {
    console.warn("[autoquit] Falling back to hardcoded release info:", err);
    return { version: FALLBACK_VERSION, dmgUrl: FALLBACK_DMG_URL };
  }
}

export const metadata: Metadata = {
  title: "AutoQuit - automatic quit for apps with no windows",
  description:
    "A tiny menu bar utility that closes macOS apps the instant their last window closes. Signed, notarized, free, and open source.",
  openGraph: {
    title: "AutoQuit - automatic quit for apps with no windows",
    description:
      "A tiny menu bar utility that closes macOS apps the instant their last window closes.",
    url: "https://vikng.dev/autoquit",
    type: "website",
    images: [
      { url: "/projects/autoquit.png", width: 1024, height: 1024, alt: "AutoQuit app icon" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoQuit - automatic quit for apps with no windows",
    description:
      "A tiny menu bar utility that closes macOS apps the instant their last window closes.",
    images: ["/projects/autoquit.png"],
  },
};

export default async function AutoQuitPage() {
  const { version, dmgUrl } = await getLatestRelease();

  return (
    <div className="font-sans min-h-screen grid grid-rows-[1fr_auto] p-8 sm:p-16">
      <BlueprintBackground />

      <main className="mx-auto w-full max-w-4xl flex flex-col gap-24">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group -mx-2 -my-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>vikng.dev</span>
          </Link>
          <ThemeToggle />
        </header>

        {/* Hero */}
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
          <div className="justify-self-start sm:justify-self-auto">
            <Image
              src="/projects/autoquit.png"
              alt="AutoQuit app icon"
              width={192}
              height={192}
              priority
              className="size-32 sm:size-48 object-contain drop-shadow-[0_18px_30px_rgba(2,6,23,0.25)] dark:drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
            />
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">AutoQuit</h1>
              <p className="text-lg text-foreground/80">
                Automatic quit for apps with no windows
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={dmgUrl}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 h-11 text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                <Download className="size-4" aria-hidden="true" />
                <span>Download for macOS</span>
              </a>
              <a
                href={LATEST_RELEASE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border bg-background px-5 h-11 text-foreground hover:bg-muted transition-colors"
              >
                <SiGithub className="size-4" aria-hidden="true" />
                <span>View on GitHub</span>
              </a>
            </div>

            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <p className="tabular-nums">
                v{version} · macOS 13+ · Universal
              </p>
              <div className="flex items-center gap-1.5 font-mono">
                <span aria-hidden="true" className="text-muted-foreground/60">$</span>
                <code className="select-all text-foreground/80">{BREW_COMMAND}</code>
                <CopyCommandButton command={BREW_COMMAND} variant="inline" />
              </div>
            </div>
          </div>
        </section>

        {/* A fix, not an app */}
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">A fix, not an app</h2>
            <p className="text-base text-foreground/80 leading-relaxed">
              Enable once, and hide it permanently from the menu bar.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-6 sm:w-auto sm:gap-8">
            <figure className="flex flex-col gap-3">
              <div className="project-image-shell project-image-shell-glass">
                <div className="project-image-frame project-image-frame-glass relative aspect-[15/11] w-full overflow-hidden rounded-lg border sm:w-56">
                  <Image
                    src="/autoquit/menu-hide.jpg"
                    alt="AutoQuit menu open with the Hide AutoQuit option highlighted"
                    fill
                    sizes="(max-width: 640px) 45vw, 224px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="text-center font-mono text-xs text-muted-foreground sm:text-sm">
                1. Hit Hide
              </figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="project-image-shell project-image-shell-glass">
                <div className="project-image-frame project-image-frame-glass relative aspect-[15/11] w-full overflow-hidden rounded-lg border sm:w-56">
                  <Image
                    src="/autoquit/menu-clean.jpg"
                    alt="macOS menu bar without the AutoQuit icon — hidden but still running"
                    fill
                    sizes="(max-width: 640px) 45vw, 224px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="text-center font-mono text-xs text-muted-foreground sm:text-sm">
                2. Out of sight
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="row-start-2 mt-12 text-sm text-muted-foreground">
        <div className="mx-auto w-full max-w-4xl flex items-center justify-between">
          <span>© {new Date().getFullYear()} vikng.dev</span>
        </div>
      </footer>
    </div>
  );
}
