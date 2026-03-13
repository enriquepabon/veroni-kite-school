"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LineReveal({ className = "bg-ocean-teal/20" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return <div ref={ref} className={`h-px ${className} origin-left`} style={{ transform: "scaleX(0)" }} />;
}
