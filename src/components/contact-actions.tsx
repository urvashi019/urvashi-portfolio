import { LINKEDIN_ICON } from "@/data/resume";

interface ContactActionsProps {
  email: string;
  linkedinUrl: string;
  resumeUrl: string;
  compact?: boolean;
}

export default function ContactActions({
  email,
  linkedinUrl,
  resumeUrl,
  compact = false,
}: ContactActionsProps) {
  const actionClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!compact && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LINKEDIN_ICON className="size-4" aria-hidden="true" />
        </a>
      )}
      <a href={`mailto:${email}`} className={actionClass}>
        Email
      </a>
      {!compact && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Resume
        </a>
      )}
      {compact && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
          LinkedIn
        </a>
      )}
    </div>
  );
}
