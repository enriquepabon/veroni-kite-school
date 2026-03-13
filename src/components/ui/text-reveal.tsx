"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
};

export function TextReveal({ children, className, as: Tag = "h2", stagger = 0.04 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-inner");
    const tween = gsap.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-inner inline-block" style={{ opacity: 0 }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
