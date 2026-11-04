import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import ContactActions from "@/components/contact-actions";
import ContactSection from "@/components/section/contact-section";
import AchievementsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-16">
      <section id="hero" aria-labelledby="hero-title">
        <div className="flex flex-col items-start gap-5">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1
                id="hero-title"
                className="hero-title font-display text-[2.4rem] leading-none tracking-tight text-foreground sm:text-5xl"
              >
                {DATA.name}
              </h1>
              <span className="hero-pronunciation text-xs tracking-wide text-muted-foreground sm:text-sm">
                {DATA.pronunciation}
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <span className="inline-flex rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              {DATA.tagline}
            </span>
          </BlurFade>
          <div className="space-y-2">
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 3}
              className="text-base font-medium leading-relaxed text-foreground sm:text-lg"
              text={DATA.introduction}
              yOffset={5}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {DATA.introductionDetail}
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <ContactActions
              email={DATA.contact.email}
              xUrl={DATA.contact.x}
              linkedinUrl={DATA.contact.linkedin}
              cvUrl={DATA.resumeUrl}
            />
          </BlurFade>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="max-w-full text-pretty font-sans leading-relaxed text-muted-foreground">
              {DATA.summary}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <div className="flex items-center gap-x-3 justify-between group">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <div aria-hidden="true" className="size-8 md:size-10 rounded-full border bg-muted flex-none" />
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                      <div className="font-sans text-xs text-muted-foreground">
                        {education.detail}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.period}
                    </span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="achievements">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <AchievementsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
