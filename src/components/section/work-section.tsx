import { EducationLogo } from "@/components/education-logo";
import { DATA } from "@/data/resume";

export default function WorkSection() {
  return (
    <div className="grid gap-6">
      {DATA.work.map((work) => (
        <article
          key={work.company}
          className="flex items-start gap-3"
        >
          <EducationLogo
            src={work.logo || undefined}
            monogram={work.company
              .split(/[\s,]+/)
              .map((word) => word[0])
              .join("")
              .slice(0, 3)}
            name={work.company}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-semibold">{work.company}</h3>
              <span className="text-xs tabular-nums text-muted-foreground">
                {work.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{work.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {work.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
