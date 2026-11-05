"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label="Toggle dark and light mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon
        className="mode-toggle-sun h-full w-full dark:hidden"
        aria-hidden="true"
      />
      <MoonIcon
        className="mode-toggle-moon hidden h-full w-full dark:block"
        aria-hidden="true"
      />
    </Button>
  );
}
