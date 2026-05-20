"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

type CopyCommandButtonProps = {
  command: string;
  variant?: "card" | "inline";
};

export function CopyCommandButton({ command, variant = "card" }: CopyCommandButtonProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={copyCommand}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={copied ? "Copied" : "Copy Homebrew command"}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copyCommand}
      className="inline-flex shrink-0 items-center gap-1.5 border-l px-3 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Copy Homebrew command"
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
