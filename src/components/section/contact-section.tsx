import Link from "next/link";
import { DATA } from "@/data/resume";
import CopyEmailButton from "@/components/copy-email-button";

export default function ContactSection() {
  const linkedinUrl = DATA.contact.linkedin.startsWith("http")
    ? DATA.contact.linkedin
    : "#";

  return (
    <div className="relative rounded-xl border border-border bg-card/70 p-6 sm:p-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="mt-1 text-sm text-muted-foreground">Reach out or connect.</p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <CopyEmailButton
          email={DATA.contact.email}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Link
          href={linkedinUrl}
          target={linkedinUrl.startsWith("http") ? "_blank" : undefined}
          rel={linkedinUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="rounded-lg border border-border px-3 py-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          LinkedIn: {DATA.contact.linkedin}
        </Link>
      </div>
    </div>
  );
}
