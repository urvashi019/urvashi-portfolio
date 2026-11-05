"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  className: string;
}

export default function CopyEmailButton({
  email,
  className,
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<"Email" | "Copied" | "Copy failed">(
    "Email",
  );
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const copyEmail = async () => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied");
    } catch (error) {
      console.error("Could not copy the email address to the clipboard.", error);
      setStatus("Copy failed");
    }

    resetTimer.current = window.setTimeout(() => {
      setStatus("Email");
      resetTimer.current = null;
    }, 3000);
  };

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-live="polite"
      className={className}
    >
      {status === "Copied" ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {status}
    </button>
  );
}
