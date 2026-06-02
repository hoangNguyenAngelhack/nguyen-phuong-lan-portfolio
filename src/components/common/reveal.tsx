"use client";

import { useRef, ReactNode, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** delay in seconds */
  delay?: number;
  /** vertical offset to animate from, px */
  y?: number;
  /** stagger children (direct element children) instead of the wrapper */
  stagger?: boolean;
};

/**
 * Scroll-triggered reveal. Animates the element (or its direct children when
 * `stagger` is set) into view once, with a cinematic ease.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  stagger = false,
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : [el];
      if (!targets.length) return;

      const anim = gsap.from(targets, {
        opacity: 0,
        y,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    },
    { scope: ref }
  );

  return (
    // @ts-expect-error — dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
