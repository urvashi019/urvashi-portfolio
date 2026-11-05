"use client";

import { motion, useReducedMotion } from "motion/react";

export function SrijanArt() {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Line illustration of a person walking with a cane and sensing obstacles"
      className="project-art aspect-[16/10] w-full"
    >
      <rect width="800" height="500" fill="var(--art-bg)" />
      <g
        fill="none"
        stroke="var(--art-muted)"
        strokeOpacity=".22"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M37 68h58v24h30v28h34m-122 0h18m105 0h24v25h28" />
        <path d="M800 375h-66v-26h-36v-28h-28m130 0h-24m-106 0h-18v-24h-26" />
        <path d="M38 85v-17m87 52v18m566 211v18m-70-64v22" />
      </g>
      <g fill="var(--art-pad)" opacity=".75">
        <circle cx="95" cy="68" r="3" />
        <circle cx="159" cy="120" r="3" />
        <circle cx="734" cy="375" r="3" />
        <circle cx="667" cy="321" r="3" />
      </g>

      <path
        d="M76 382H724"
        fill="none"
        stroke="var(--art-muted)"
        strokeOpacity=".5"
        strokeWidth="1.5"
      />
      <path
        d="M110 382h72m42 0h64m52 0h82m43 0h70m54 0h80"
        fill="none"
        stroke="var(--art-accent)"
        strokeOpacity=".28"
        strokeWidth="1.5"
      />

      <g fill="none" stroke="var(--art-accent)" strokeWidth="2">
        <motion.path
          d="M352 224C410 247 410 315 352 338"
          initial={false}
          animate={reducedMotion ? undefined : { opacity: [0.12, 0.8, 0.12] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M370 206C455 238 455 324 370 356"
          initial={false}
          animate={reducedMotion ? undefined : { opacity: [0.08, 0.58, 0.08] }}
          transition={{ duration: 3.2, delay: 0.55, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M389 188C500 228 500 334 389 374"
          initial={false}
          animate={reducedMotion ? undefined : { opacity: [0.05, 0.35, 0.05] }}
          transition={{ duration: 3.2, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>

      <motion.g
        fill="none"
        stroke="var(--art-ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="250" cy="177" r="21" />
        <path d="M243 201 231 255l-41 45m41-45 44 31 27 38" />
        <path d="m231 255-8 54-41 45m52-68 42 39-12 57" />
        <path d="m230 217 49 17 42 26 15 20" />
        <rect
          x="340"
          y="274"
          width="22"
          height="15"
          rx="4"
          fill="var(--art-bg)"
          stroke="var(--art-accent)"
        />
        <path d="m353 289 3 62" stroke="var(--art-accent)" />
        <path d="m182 354-10 5m95-1-2 8" />
      </motion.g>

      <motion.circle
        cx="442"
        cy="302"
        r="5"
        fill="var(--art-accent)"
        initial={false}
        animate={reducedMotion ? undefined : { opacity: [0.24, 1, 0.24], scale: [0.75, 1.35, 0.75] }}
        transition={{ duration: 1.4, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="518"
        cy="326"
        r="4"
        fill="var(--art-accent)"
        initial={false}
        animate={reducedMotion ? undefined : { opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.45, 0.8] }}
        transition={{ duration: 1.7, delay: 1.25, repeat: Infinity, ease: "easeInOut" }}
      />
      <text
        x="400"
        y="435"
        textAnchor="middle"
        fill="var(--art-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="12"
        letterSpacing="2"
      >
        SRIJAN · WALKING ASSISTANCE
      </text>
    </svg>
  );
}
