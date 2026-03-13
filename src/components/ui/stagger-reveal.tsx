"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  childSelector?: string;
};

export function StaggerReveal({ children, className, stagger = 0.1, childSelector = ":scope > *" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(childSelector);
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, childSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
