"use client";

import Image from "next/image";
import { useState } from "react";

interface EducationLogoProps {
  src?: string;
  monogram: string;
  name: string;
}

export function EducationLogo({ src, monogram, name }: EducationLogoProps) {
  const [imageAvailable, setImageAvailable] = useState(Boolean(src));

  return (
    <span
      className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white text-[10px] font-semibold text-slate-600 shadow-sm"
      aria-label={`${name} logo`}
      role="img"
    >
      {imageAvailable && src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="48px"
          className="object-contain p-1.5"
          onError={() => setImageAvailable(false)}
        />
      ) : (
        <span aria-hidden="true">{monogram}</span>
      )}
    </span>
  );
}
