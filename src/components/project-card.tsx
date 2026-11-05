import { BrailleArt } from "@/components/art/BrailleArt";
import { SrijanArt } from "@/components/art/SrijanArt";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description: string;
  details: string;
  dates: string;
  tags: readonly string[];
  art: "braille" | "srijan";
}

export function ProjectCard({
  title,
  description,
  details,
  dates,
  tags,
  art,
}: Props) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/70 transition-colors hover:bg-card">
      <div className="overflow-hidden border-b border-border/70">
        {art === "braille" ? <BrailleArt /> : <SrijanArt />}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{dates}</p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">{details}</p>
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
      </div>
    </article>
  );
}
