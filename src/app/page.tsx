import { ProjectList } from "@/components/project-list";
import { BlueprintBackground } from "@/components/blueprint-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
  return (
    <div className="font-sans min-h-screen grid grid-rows-[1fr_auto] p-8 sm:p-16">
      <BlueprintBackground />
      <main className="mx-auto w-full max-w-4xl flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Yan Gurevich</h1>
            <div className="flex items-center gap-2">
              <a
                href="mailto:yan@vikng.dev"
                aria-label="Send email"
                className="group relative inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted"
              >
                <MdEmail className="size-6" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-background px-2 py-1 text-[10px] text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                >
                  yan@vikng.dev
                </span>
              </a>
              <a
                href="https://github.com/yan-vikng-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                className="group relative inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted"
              >
                <SiGithub className="size-5" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-background px-2 py-1 text-[10px] text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                >
                  github.com/yan-vikng-dev
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/yan-gurevich/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
                className="group relative inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted"
              >
                <SiLinkedin className="size-5" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-background px-2 py-1 text-[10px] text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                >
                  linkedin.com/in/yan-gurevich
                </span>
              </a>
              <div className="mx-2 h-7 w-px bg-foreground/30" />
              <ThemeToggle />
            </div>
          </div>
          <p className="text-base sm:text-lg text-foreground/80">true fullstack engineer</p>
          <p className="text-base sm:text-lg text-foreground/80">idea → deployment → scale</p>
        </header>

        <section className="flex flex-col gap-5">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Projects</h2>
          <ProjectList />
        </section>
      </main>

      <footer className="row-start-2 mt-12 text-xs text-muted-foreground">
        <div className="mx-auto w-full max-w-4xl flex items-center justify-between">
          <span>© {CURRENT_YEAR} vikng.dev</span>
        </div>
      </footer>
    </div>
  );
}
