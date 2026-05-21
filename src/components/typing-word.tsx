"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./typing-word.module.css";

type Phase = "idle" | "erasing" | "typing";

type TypingWordProps = {
  text: string;
  eraseMs?: number;
  typeMs?: number;
  className?: string;
};

export function TypingWord({ text, eraseMs = 200, typeMs = 240, className }: TypingWordProps) {
  const [display, setDisplay] = React.useState(text);
  const [phase, setPhase] = React.useState<Phase>("idle");
  const skipAnimation = React.useRef(true);

  React.useEffect(() => {
    if (skipAnimation.current) {
      skipAnimation.current = false;
      setDisplay(text);
      setPhase("idle");
      return;
    }

    setPhase("erasing");
    const eraseTimer = window.setTimeout(() => {
      setDisplay(text);
      setPhase("typing");
    }, eraseMs);
    const idleTimer = window.setTimeout(() => {
      setPhase("idle");
    }, eraseMs + typeMs);

    return () => {
      window.clearTimeout(eraseTimer);
      window.clearTimeout(idleTimer);
    };
  }, [text, eraseMs, typeMs]);

  return (
    <span
      className={cn(
        styles.word,
        phase === "erasing" && styles.erasing,
        phase === "typing" && styles.typing,
        phase === "idle" && styles.idle,
        className
      )}
      style={{
        ["--typing-chars" as never]: display.length,
        ["--typing-erase-ms" as never]: `${eraseMs}ms`,
        ["--typing-type-ms" as never]: `${typeMs}ms`,
      }}
    >
      {display}
    </span>
  );
}
