"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { CopyCommandButton } from "@/components/copy-command-button";

type GithubRelease = {
  tag_name?: string;
  assets?: Array<{ name?: string; browser_download_url?: string }>;
};

type Props = {
  /** Version + DMG URL baked at build time. Used as the initial render
   *  value and as a fallback if the client-side refresh fails. */
  initialVersion: string;
  initialDmgUrl: string;
  repoOwner: string;
  repoName: string;
  latestReleaseUrl: string;
  brewCommand: string;
};

export function AutoQuitDownloadCTA({
  initialVersion,
  initialDmgUrl,
  repoOwner,
  repoName,
  latestReleaseUrl,
  brewCommand,
}: Props) {
  const [version, setVersion] = React.useState(initialVersion);
  const [dmgUrl, setDmgUrl] = React.useState(initialDmgUrl);

  React.useEffect(() => {
    // Fetch from the visitor's browser, not from our server. Each visitor's
    // own IP gets the unauthenticated 60 req/hr GitHub limit, instead of the
    // shared Cloudflare Workers outbound pool blowing the budget instantly.
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<GithubRelease>) : null))
      .then((data) => {
        if (!data) return;
        const v = data.tag_name?.replace(/^v/, "");
        const u = data.assets?.find((a) => a.name?.endsWith(".dmg"))?.browser_download_url;
        if (v && u) {
          setVersion(v);
          setDmgUrl(u);
        }
      })
      .catch(() => {
        // Network error, rate-limit, blocked — keep the SSR fallback.
      });
    return () => controller.abort();
  }, [repoOwner, repoName]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={dmgUrl}
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 h-11 text-background font-medium hover:bg-foreground/90 transition-colors"
        >
          <Download className="size-4" aria-hidden="true" />
          <span>Download for macOS</span>
        </a>
        <a
          href={latestReleaseUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border bg-background px-5 h-11 text-foreground hover:bg-muted transition-colors"
        >
          <SiGithub className="size-4" aria-hidden="true" />
          <span>View on GitHub</span>
        </a>
      </div>

      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
        <p className="tabular-nums">v{version} · macOS 13+ · Universal</p>
        <div className="flex items-center gap-1.5 font-mono">
          <span aria-hidden="true" className="text-muted-foreground/60">
            $
          </span>
          <code className="select-all text-foreground/80">{brewCommand}</code>
          <CopyCommandButton command={brewCommand} variant="inline" />
        </div>
      </div>
    </>
  );
}
