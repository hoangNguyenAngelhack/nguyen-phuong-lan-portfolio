"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
};

const ProjectsPage = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Character Design Series",
      category: "Character Design",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
      description:
        "A collection of vibrant character designs for children's book",
      year: "2024",
    },
    {
      id: 2,
      title: "Editorial Illustration",
      category: "Editorial",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
      description: "Magazine cover illustration about environmental awareness",
      year: "2024",
    },
    {
      id: 3,
      title: "Brand Identity Artwork",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
      description: "Custom illustrations for sustainable fashion brand",
      year: "2023",
    },
    {
      id: 4,
      title: "Book Cover Design",
      category: "Book Design",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop&auto=format",
      description: "Fantasy novel cover with mystical elements",
      year: "2023",
    },
    {
      id: 5,
      title: "Digital Portrait Series",
      category: "Digital Art",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format",
      description: "Contemporary portrait series exploring identity",
      year: "2024",
    },
    {
      id: 6,
      title: "Product Illustration",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format",
      description: "Product illustrations for artisanal coffee brand",
      year: "2023",
    },
  ]);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Character Design",
    "Editorial",
    "Branding",
    "Book Design",
    "Digital Art",
    "Commercial",
  ];

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter, projects]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/80 text-purple-600 rounded-full text-base font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          My Work
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            My Projects
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          A curated collection of illustrations, character designs, and digital
          artworks created with passion and attention to detail.
        </motion.p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === category
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white text-gray-800 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg hover:bg-gray-50 cursor-pointer"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {project.year}
                  </span>
                </div>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: "Pacifico, cursive" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-gray-600 text-base leading-relaxed"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-sm font-medium text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {selectedProject.category}
                  </span>
                  <span
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {selectedProject.year}
                  </span>
                </div>
                <h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  style={{ fontFamily: "Pacifico, cursive" }}
                >
                  {selectedProject.title}
                </h2>
                <p
                  className="text-gray-600 leading-relaxed mb-6 text-lg"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  {selectedProject.description}
                </p>

                {/* Project Details */}
                <div className="border-t pt-6">
                  <h3
                    className="font-semibold text-gray-800 mb-4"
                    style={{ fontFamily: "Pacifico, cursive" }}
                  >
                    Project Details
                  </h3>
                  <div
                    className="space-y-3 text-base"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-800">
                        {selectedProject.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year:</span>
                      <span className="text-gray-800">{selectedProject.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Medium:</span>
                      <span className="text-gray-800">Digital Illustration</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl blur-xl opacity-50" />
        <div className="relative text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-12">
          <h2
            className="text-2xl font-semibold mb-4 text-gray-800"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            Interested in working together?
          </h2>
          <p
            className="text-gray-600 mb-8 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            I&apos;m always excited to take on new projects and collaborate with
            creative minds. Let&apos;s bring your ideas to life!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
              style={{ fontFamily: "Patrick Hand, cursive", fontSize: "1.1rem" }}
            >
              Start a Project
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-colors"
              style={{ fontFamily: "Patrick Hand, cursive", fontSize: "1.1rem" }}
            >
              Learn More
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
