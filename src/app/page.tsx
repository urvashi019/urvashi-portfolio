import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { EducationLogo } from "@/components/education-logo";
import ContactActions from "@/components/contact-actions";
import AchievementsSection from "@/components/section/achievements-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { DATA } from "@/data/resume";

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
              className="max-w-xl text-base font-medium leading-relaxed text-foreground sm:text-lg"
              text={DATA.introduction}
              yOffset={5}
            />
            {DATA.introductionDetails.map((line, index) => (
              <BlurFade key={line} delay={BLUR_FADE_DELAY * (4 + index)}>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {line}
                </p>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <ContactActions
              email={DATA.contact.email}
              linkedinUrl={DATA.contact.linkedin}
              resumeUrl={DATA.resumeUrl}
            />
          </BlurFade>
        </div>
      </section>

      <section id="work" aria-labelledby="work-title">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 id="work-title" className="text-xl font-bold">
              Work Experience
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education" aria-labelledby="education-title">
        <div className="flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 id="education-title" className="text-xl font-bold">
              Education
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 10 + index * 0.05}
              >
                <div className="group flex items-center justify-between gap-x-3">
                  <div className="flex min-w-0 flex-1 items-center gap-x-3">
                    <EducationLogo
                      src={education.logo}
                      monogram={education.monogram}
                      name={education.school}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="font-semibold leading-tight">
                        {education.school}
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                      {education.detail && (
                        <div className="font-sans text-xs text-muted-foreground">
                          {education.detail}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-none text-right text-xs tabular-nums text-muted-foreground">
                    {education.period}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-title">
        <div className="flex flex-col gap-y-7">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <h2 id="skills-title" className="text-xl font-bold">
              Skills
            </h2>
          </BlurFade>
          {DATA.skills.map((group, groupIndex) => (
            <div key={group.name} className="flex flex-col gap-3">
              <BlurFade delay={BLUR_FADE_DELAY * (13 + groupIndex)}>
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {group.name}
                </h3>
              </BlurFade>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, index) => (
                  <BlurFade
                    key={skill}
                    delay={BLUR_FADE_DELAY * (14 + groupIndex + index * 0.1)}
                  >
                    <span className="flex h-8 w-fit items-center rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground ring-2 ring-border/20">
                      {skill}
                    </span>
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" aria-label="Projects">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="achievements" aria-label="Achievements">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <AchievementsSection />
        </BlurFade>
      </section>

      <section id="contact" aria-label="Contact">
        <BlurFade delay={BLUR_FADE_DELAY * 20}>
          <div className="rounded-xl border border-border bg-card/70 p-6 sm:p-8">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Reach out or connect.
            </p>
            <div className="mt-5">
              <ContactActions
                email={DATA.contact.email}
                linkedinUrl={DATA.contact.linkedin}
                resumeUrl={DATA.resumeUrl}
                compact
              />
            </div>
          </div>
        </BlurFade>
      </section>

      <footer className="border-t border-border pt-5 text-center text-xs text-muted-foreground">
        {DATA.footerCredit}
      </footer>
    </main>
  );
}
