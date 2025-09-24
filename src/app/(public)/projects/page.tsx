"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

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
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A curated collection of illustrations, character designs, and digital
          artworks created with passion and attention to detail.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === category
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                  {selectedProject.category}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedProject.year}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Project Details */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Project Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-800">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year:</span>
                    <span className="text-gray-800">
                      {selectedProject.year}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Medium:</span>
                    <span className="text-gray-800">Digital Illustration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Interested in working together?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          I&apos;m always excited to take on new projects and collaborate with
          creative minds. Let&apos;s bring your ideas to life!
        </p>
        <div className="space-x-4">
          <a
            href="/contact"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            Start a Project
          </a>
          <a
            href="/about"
            className="inline-block border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
