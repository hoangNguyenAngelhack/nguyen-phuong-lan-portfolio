"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    // Drive ScrollTrigger from Lenis so pinned/scrubbed timelines stay in sync.
    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Late-loading media (gallery images, hero canvas) grow the document after
    // ScrollTriggers are created, leaving their start/end positions stale — so a
    // trigger near the bottom never fires while scrolling down (yet shows fine on
    // a fresh reload at that spot). Recompute positions once media settles.
    // refresh() only recalculates coordinates; it does not revert finished tweens.
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    // Each gallery image that finishes loading changes layout height.
    const imgs = Array.from(document.images).filter((img) => !img.complete);
    imgs.forEach((img) => {
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    });

    // A couple of safety passes for anything async (fonts, canvas mount).
    const timers = [400, 1200, 2500].map((ms) =>
      window.setTimeout(refresh, ms)
    );

    return () => {
      window.removeEventListener("load", refresh);
      imgs.forEach((img) => {
        img.removeEventListener("load", refresh);
        img.removeEventListener("error", refresh);
      });
      timers.forEach((t) => window.clearTimeout(t));
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
