import { DATA } from "@/data/resume";
import {
  Timeline,
  TimelineConnectItem,
  TimelineItem,
} from "@/components/timeline";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex w-full items-center">
            <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="z-10 rounded-xl border bg-primary px-4 py-1">
              <span className="text-sm font-medium text-primary-foreground">
                Achievements
              </span>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Milestones &amp; goals
            </h2>
            <p className="text-balance text-center text-muted-foreground md:text-lg/relaxed">
              Achievements and current academic goals.
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.achievements.map((achievement) => (
            <TimelineItem
              key={achievement.title}
              className="flex w-full items-start justify-between gap-6"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                <div
                  aria-hidden="true"
                  className="z-10 size-4 shrink-0 rounded-full border-2 border-primary bg-background"
                />
              </TimelineConnectItem>
              <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                {achievement.dates && (
                  <time className="text-xs text-muted-foreground">
                    {achievement.dates}
                  </time>
                )}
                <h3 className="font-semibold leading-none">
                  {achievement.title}
                </h3>
                {achievement.location && (
                  <p className="text-sm text-muted-foreground">
                    {achievement.location}
                  </p>
                )}
                {achievement.description && (
                  <p className="wrap-break-word text-sm leading-relaxed text-muted-foreground">
                    {achievement.description}
                  </p>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
