import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AutoQuitDownloadCTA } from "@/components/autoquit-download-cta";
import { BlueprintBackground } from "@/components/blueprint-background";
import { ThemeToggle } from "@/components/theme-toggle";

const REPO_OWNER = "yan-vikng-dev";
const REPO_NAME = "AutoQuit";
const REPO = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const LATEST_RELEASE = `${REPO}/releases/latest`;
const BREW_COMMAND = "brew install --cask yan-vikng-dev/tap/autoquit";

// Floor values, baked into the HTML at build time. The client component
// refreshes these on hydration via a browser-side fetch to the GitHub API,
// so this only needs to be "some valid release" — bump it occasionally if
// build-time fetches are failing and the gap from latest gets too wide.
const FALLBACK_VERSION = "1.0.2";
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
      },
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const data = (await res.json()) as GithubRelease;
    const version = data.tag_name?.replace(/^v/, "");
    const dmgUrl = data.assets?.find((a) => a.name?.endsWith(".dmg"))?.browser_download_url;
    if (!version || !dmgUrl) throw new Error("Latest release is missing tag or DMG asset");
    return { version, dmgUrl };
  } catch (err) {
    console.warn("[autoquit] SSR fetch failed, client will refresh on hydration:", err);
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

            <AutoQuitDownloadCTA
              initialVersion={version}
              initialDmgUrl={dmgUrl}
              repoOwner={REPO_OWNER}
              repoName={REPO_NAME}
              latestReleaseUrl={LATEST_RELEASE}
              brewCommand={BREW_COMMAND}
            />
          </div>
        </section>

        {/* Demo */}
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
          <div className="project-image-shell project-image-shell-glass">
            <div className="project-image-frame project-image-frame-glass relative aspect-[63/29] w-full overflow-hidden rounded-lg border sm:w-[36rem]">
              <video
                src="/autoquit/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Before and after demo of AutoQuit closing an app when its last window closes"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Ever wanted to close an app and have it, well… close?
          </h2>
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
