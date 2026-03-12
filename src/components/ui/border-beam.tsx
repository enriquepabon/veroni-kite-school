"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  initialOffset?: number;
  reverse?: boolean;
}

export function BorderBeam({
  className,
  duration = 8,
  delay = 0,
  colorFrom = "#2A9D8F",
  colorTo = "#E9C46A",
  initialOffset = 0,
  reverse = false,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
      <motion.div
        className={cn(
          "absolute inset-[-1px] rounded-[inherit]",
          className
        )}
        style={{
          background: `conic-gradient(from ${initialOffset}deg at 50% 50%, transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 30%)`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
        animate={{
          rotate: reverse ? [-360, 0] : [0, 360],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
