"use client";

import dynamic from "next/dynamic";

const HeroBackground = dynamic(() => import("@/components/hero-background"), {
  ssr: false,
  loading: () => (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-background-static" />
    </div>
  ),
});

export default function HeroBackgroundLoader() {
  return <HeroBackground />;
}
