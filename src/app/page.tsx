import { ProjectList } from "@/components/project-list";
import { BlueprintBackground } from "@/components/blueprint-background";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="font-sans min-h-screen grid grid-rows-[1fr_auto] p-8 sm:p-16">
      <BlueprintBackground />
      <main className="mx-auto w-full max-w-4xl flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Yan Gurevich</h1>
            <ThemeToggle />
          </div>
          <a href="mailto:yan@vikng.dev" className="text-sm text-muted-foreground hover:underline ">yan@vikng.dev</a>
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
          <span>© {new Date().getFullYear()} vikng.dev</span>
        </div>
      </footer>
    </div>
  );
}
