"use client";

import { cn } from "@/lib/utils";

interface ShineBorderProps {
  className?: string;
  shineColor?: string | string[];
  duration?: number;
}

export function ShineBorder({
  className,
  shineColor = "#000000",
  duration = 14,
}: ShineBorderProps) {
  const color = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={
        {
          "--shine-border-width": "2px",
          "--shine-color": color,
          "--shine-duration": `${duration}s`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "var(--shine-border-width)",
          background: `conic-gradient(from 210deg at 50% 50%, transparent 0%, var(--shine-color) 10%, transparent 20%) border-box`,
          animation: `shine-border-rotate var(--shine-duration) linear infinite`,
        } as React.CSSProperties
      }
    />
  );
}
