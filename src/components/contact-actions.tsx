"use client";

import { LINKEDIN_ICON, X_ICON } from "@/data/resume";
import CopyEmailButton from "@/components/copy-email-button";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ContactActionsProps {
  email: string;
  xUrl: string;
  linkedinUrl: string;
  cvUrl: string;
}

export default function ContactActions({
  email,
  xUrl,
  linkedinUrl,
  cvUrl,
}: ContactActionsProps) {
  const [cvOpen, setCvOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cvButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cvOpen) return;

    const previousOverflow = document.body.style.overflow;
    const cvButton = cvButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      cvButton?.focus();
    };
  }, [cvOpen]);

  const socialLink = (href: string, label: string, Icon: typeof X_ICON) => {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={isExternal ? href : "#contact"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon className="size-4" aria-hidden="true" />
      </Link>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/80 p-2 shadow-lg shadow-black/5 backdrop-blur">
        {socialLink(xUrl, "X", X_ICON)}
        {socialLink(linkedinUrl, "LinkedIn", LINKEDIN_ICON)}
        <CopyEmailButton
          email={email}
          className="inline-flex h-9 min-w-20 items-center justify-center gap-2 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          ref={cvButtonRef}
          type="button"
          onClick={() => setCvOpen(true)}
          className="inline-flex h-9 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          CV
        </button>
      </div>

      {cvOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCvOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-dialog-title"
            className="flex h-[min(90dvh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <h2 id="cv-dialog-title" className="text-sm font-medium">
                CV
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setCvOpen(false)}
                aria-label="Close CV"
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>
            <iframe
              src={cvUrl}
              title="Urvashi Vishwakarma CV"
              className="min-h-0 flex-1 bg-white"
            />
            <p className="sr-only">
              If the CV does not appear, open the PDF directly at {cvUrl}.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
