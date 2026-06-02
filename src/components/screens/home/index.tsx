"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { BEHANCE_IMAGES, SERVICES, STATS, MARQUEE_WORDS } from "@/mocks";
import { Reveal } from "@/components/common/reveal";
import { HeroSection } from "./hero-section";

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

const HomeScreen = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = BEHANCE_IMAGES.map((img) => ({
    src: img.url,
    alt: img.name,
  }));

  return (
    <>
      <HeroSection />

      <Marquee />

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-28">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            What I do
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            Turning ideas into art that people remember
          </h2>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:mt-16 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.no}
              className="group bg-[#0b0b10] p-6 transition-colors hover:bg-[#101017] sm:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-white/30">{s.no}</span>
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 text-2xl font-medium text-white">{s.title}</h3>
              <p className="mt-3 text-white/50">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-12 sm:py-20">
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Selected work
            </p>
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              The Portfolio
            </h2>
          </div>
          <p className="max-w-sm text-white/50">
            A living collection of illustrations, book covers and visual stories.
          </p>
        </Reveal>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {BEHANCE_IMAGES.map((img, i) => (
            <div
              key={i}
              className="group relative mb-6 cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06]"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.url}
                alt={img.name}
                width={600}
                height={750}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                priority={i < 3}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-white">{img.name}</span>
              </div>
            </div>
          ))}
        </Masonry>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-24">
        <Reveal
          stagger
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0b0b10] p-6 text-center sm:p-8">
              <div className="font-display text-4xl text-gradient sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-white/45">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: "rgba(5, 5, 8, 0.96)" } }}
      />
    </>
  );
};

function Marquee() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="relative flex overflow-hidden border-y border-white/[0.06] py-6">
      <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl text-white/30">{w}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        aria-hidden
      >
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl text-white/30">{w}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
