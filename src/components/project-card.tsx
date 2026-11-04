import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/70 transition-colors hover:bg-card",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="h-24 shrink-0 border-b border-border/70 bg-[radial-gradient(circle_at_1px_1px,var(--muted-foreground)_1px,transparent_1.5px)] bg-[size:9px_9px] opacity-40"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          {href?.startsWith("http") ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          ) : href ? (
            <span className="text-xs text-muted-foreground">
              Link: {href}
            </span>
          ) : null}
        </div>
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="h-6 w-fit border border-border px-2 text-[11px] font-medium"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
