import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type ProjectCardProps = {
  title: string;
  href: string;
  description: string;
  tech?: string[];
  imageSrc?: string;
  imageAlt?: string;
};

export function ProjectCard({ title, href, description, tech = [], imageSrc, imageAlt }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border bg-card text-card-foreground">
      <Link href={href} target="_blank" rel="noreferrer" className="block">
        <div className="relative aspect-[203/132] w-full bg-muted">
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt || title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              image coming soon
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={href} target="_blank" rel="noreferrer" className="hover:underline">
            <h3 className="text-base sm:text-lg font-medium tracking-tight">{title}</h3>
          </Link>
        </div>
        <p className="mt-1 text-sm text-foreground/80">{description}</p>

        {tech.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {tech.map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
