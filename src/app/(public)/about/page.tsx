"use client";

import { EMAIL_USER } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const specialties = [
  "Digital Illustration",
  "Character Design",
  "Editorial Artwork",
  "Book Illustration",
];

const processSteps = [
  {
    no: "01",
    title: "Inspiration",
    description:
      "I find inspiration in daily life, nature, and cultural stories that deserve to be told.",
  },
  {
    no: "02",
    title: "Sketching",
    description:
      "Every piece begins with rough sketches and concept development on paper.",
  },
  {
    no: "03",
    title: "Digital Magic",
    description:
      "I bring sketches to life with digital tools — colors, textures and detail.",
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Intro */}
      <Reveal className="max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          About
        </p>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
          Hello, I&apos;m <span className="text-gradient">Lan</span>
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/55">
          A passionate illustrator and digital artist based in Vietnam, creating
          vibrant artwork that tells stories and captures emotion.
        </p>
      </Reveal>

      {/* Bio + photo */}
      <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/profile.jpg"
                alt="Nguyen Phuong Lan"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal className="space-y-6">
          <h2 className="font-display text-3xl text-white">My Journey</h2>
          <p className="text-lg leading-relaxed text-white/55">
            My artistic journey began with a simple love for colors and
            storytelling. What started as childhood sketches has grown into a
            professional practice — creating illustrations that bridge
            imagination and reality.
          </p>
          <p className="text-lg leading-relaxed text-white/55">
            I specialize in digital illustration, character design and editorial
            artwork, inspired by everyday moments, cultural heritage and the
            beauty in ordinary life.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Process */}
      <section className="mt-28">
        <Reveal>
          <h2 className="mb-12 font-display text-4xl text-white">
            My Creative Process
          </h2>
        </Reveal>
        <Reveal
          stagger
          className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-3"
        >
          {processSteps.map((step) => (
            <div key={step.no} className="bg-[#0b0b10] p-8">
              <span className="text-sm text-white/30">{step.no}</span>
              <h3 className="mt-5 text-2xl font-medium text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-white/50">{step.description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal className="mt-28 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl text-white">
            Let&apos;s create something beautiful
          </h2>
          <p className="mt-2 max-w-lg text-white/50">
            Custom illustration, character design or editorial work — I&apos;d
            love to hear about your project.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${EMAIL_USER}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            View portfolio
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default AboutPage;
