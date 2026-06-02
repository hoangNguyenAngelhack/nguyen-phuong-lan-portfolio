"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/common/reveal";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Character Design Series",
    category: "Character Design",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    description: "A collection of vibrant character designs for children's books.",
    year: "2024",
  },
  {
    id: 2,
    title: "Editorial Illustration",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
    description: "Magazine cover illustration about environmental awareness.",
    year: "2024",
  },
  {
    id: 3,
    title: "Brand Identity Artwork",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    description: "Custom illustrations for a sustainable fashion brand.",
    year: "2023",
  },
  {
    id: 4,
    title: "Book Cover Design",
    category: "Book Design",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop&auto=format",
    description: "Fantasy novel cover with mystical elements.",
    year: "2023",
  },
  {
    id: 5,
    title: "Digital Portrait Series",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format",
    description: "Contemporary portrait series exploring identity.",
    year: "2024",
  },
  {
    id: 6,
    title: "Product Illustration",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format",
    description: "Product illustrations for an artisanal coffee brand.",
    year: "2023",
  },
];

const CATEGORIES = [
  "All",
  "Character Design",
  "Editorial",
  "Branding",
  "Book Design",
  "Digital Art",
  "Commercial",
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Selected work
        </p>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
          Projects
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-white/55">
          A curated collection of illustrations, character designs and digital
          artwork — crafted with care.
        </p>
      </Reveal>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`rounded-full px-5 py-2 text-sm transition-all ${
              activeFilter === category
                ? "bg-white text-black"
                : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.button
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedProject(project)}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0b10] text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[var(--accent)]">{project.category}</span>
                  <span className="text-white/35">{project.year}</span>
                </div>
                <h3 className="flex items-center gap-1 text-lg font-medium text-white">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b10]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--accent)]">
                    {selectedProject.category}
                  </span>
                  <span className="text-white/35">{selectedProject.year}</span>
                </div>
                <h2 className="font-display text-3xl text-white">
                  {selectedProject.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/55">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <Reveal className="mt-28 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-3xl text-white">
          Interested in working together?
        </h2>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>
    </div>
  );
};

export default ProjectsPage;
