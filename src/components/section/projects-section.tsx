import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex w-full items-center">
          <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="z-10 rounded-xl border bg-primary px-4 py-1">
            <span className="text-sm font-medium text-primary-foreground">
              Projects
            </span>
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-3">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Selected projects
          </h2>
          <p className="text-balance text-center text-sm text-muted-foreground md:text-base">
            Assistive electronics and embedded systems.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2">
        {DATA.projects.map((project, index) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * (17 + index)}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              details={project.details}
              dates={project.dates}
              tags={project.technologies}
              art={project.art}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
