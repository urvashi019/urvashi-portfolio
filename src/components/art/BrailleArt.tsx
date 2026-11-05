"use client";

import { motion, useReducedMotion } from "motion/react";

const CELLS = [
  { letter: "B", raised: [1, 2] },
  { letter: "R", raised: [1, 2, 3, 5] },
  { letter: "A", raised: [1] },
  { letter: "I", raised: [2, 4] },
  { letter: "L", raised: [1, 2, 3] },
  { letter: "L", raised: [1, 2, 3] },
  { letter: "E", raised: [1, 5] },
] as const;

export function BrailleArt() {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Animated Braille cells spelling BRAILLE"
      className="project-art aspect-[16/10] w-full"
    >
      <defs>
        <radialGradient id="braille-glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="var(--art-glow)" stopOpacity=".34" />
          <stop offset="100%" stopColor="var(--art-bg)" stopOpacity="0" />
        </radialGradient>
        <filter id="braille-dot-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="800" height="500" fill="var(--art-bg)" />
      <rect width="800" height="500" fill="url(#braille-glow)" />
      <g fill="none" stroke="var(--art-muted)" strokeWidth="1">
        <motion.circle
          cx="684"
          cy="105"
          r="17"
          initial={false}
          animate={reducedMotion ? undefined : { r: [17, 47], opacity: [0.34, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="684"
          cy="105"
          r="17"
          initial={false}
          animate={reducedMotion ? undefined : { r: [17, 47], opacity: [0.26, 0] }}
          transition={{ duration: 3.2, delay: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <path d="M672 91v28m0 0 22-14m-22 0 22 14" stroke="var(--art-accent)" />
      </g>
      {CELLS.map((cell, cellIndex) => (
        <g key={`${cell.letter}-${cellIndex}`}>
          {[1, 2, 3, 4, 5, 6].map((dot) => {
            const column = dot > 3 ? 1 : 0;
            const row = (dot - 1) % 3;
            const raised = (cell.raised as readonly number[]).includes(dot);
            const x = 168 + cellIndex * 68 + column * 23;
            const y = 206 + row * 37;

            return raised ? (
              <motion.circle
                key={dot}
                cx={x}
                cy={y}
                r="7.5"
                fill="var(--art-accent)"
                filter="url(#braille-dot-shadow)"
                initial={reducedMotion ? false : { opacity: 0, scale: 0.25 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                whileHover={
                  reducedMotion ? undefined : { scale: [1, 1.12, 1] }
                }
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  delay: cellIndex * 0.07 + dot * 0.018,
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ) : (
              <circle
                key={dot}
                cx={x}
                cy={y}
                r="6.5"
                fill="none"
                stroke="var(--art-muted)"
                strokeOpacity=".36"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}
      <text
        x="400"
        y="376"
        textAnchor="middle"
        fill="var(--art-text)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="17"
        letterSpacing="1"
      >
        PDF → TEXT → ⠃
      </text>
      <text
        x="400"
        y="409"
        textAnchor="middle"
        fill="var(--art-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="11"
        letterSpacing="2.5"
      >
        DIGITAL BRAILLE
      </text>
    </svg>
  );
}
