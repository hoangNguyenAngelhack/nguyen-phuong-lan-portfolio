"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BEHANCE_IMAGES } from "@/mocks";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
});

const featured = BEHANCE_IMAGES.slice(0, 3);

export const HeroSection = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          ".hero-line",
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.2"
        )
        .from(
          ".hero-sub",
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ".hero-card",
          { y: 60, opacity: 0, scale: 0.92, duration: 1, stagger: 0.12 },
          "-=0.8"
        );

      // Floating loop on the cards
      gsap.to(".hero-card", {
        y: "+=14",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: "random" },
      });
    },
    { scope: root }
  );

  const scrollToGallery = () =>
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={root}
      className="relative flex min-h-[80vh] items-center overflow-hidden px-6 pb-20 md:min-h-[92vh] md:pb-0"
    >
      {/* 3D particle background */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <HeroCanvas />
      </div>
      {/* Vignette to keep text legible */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#07070a_85%)]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left — copy */}
        <div className="lg:col-span-6">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/70 sm:px-4 sm:text-xs sm:tracking-[0.25em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            Illustration & Visual Storytelling
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] text-white sm:mt-7 sm:text-6xl sm:leading-[1.05] lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Where imagination</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-gradient">
                comes to life
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-md text-lg leading-relaxed text-white/55">
            I craft illustrations and visual worlds that tell stories, spark
            emotion, and turn ideas into art — for books, brands and beyond.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToGallery}
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <Link
              href="/contact"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>

        {/* Right — floating art collage */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto h-[360px] w-full max-w-sm sm:h-[540px] sm:max-w-md">
            {featured[1] && (
              <ArtCard
                src={featured[1].url}
                name={featured[1].name}
                className="absolute left-0 top-8 w-[52%] -rotate-6"
              />
            )}
            {featured[2] && (
              <ArtCard
                src={featured[2].url}
                name={featured[2].name}
                className="absolute bottom-4 right-0 w-[52%] rotate-6"
              />
            )}
            {featured[0] && (
              <ArtCard
                src={featured[0].url}
                name={featured[0].name}
                priority
                className="absolute left-1/2 top-1/2 z-10 w-[64%] -translate-x-1/2 -translate-y-1/2 glow-accent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToGallery}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/40 transition-colors hover:text-white animate-float-slow"
        aria-label="Scroll to gallery"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
};

function ArtCard({
  src,
  name,
  className,
  priority,
}: {
  src: string;
  name: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`hero-card group aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={name}
        fill
        sizes="400px"
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm text-white/90">{name}</span>
      </div>
    </div>
  );
}
