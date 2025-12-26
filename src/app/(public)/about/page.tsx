"use client";

import { EMAIL_USER } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AboutPage = () => {
  const specialties = [
    "Digital Illustration",
    "Character Design",
    "Editorial Artwork",
    "Book Illustration",
  ];

  const processSteps = [
    {
      icon: "💭",
      title: "Inspiration",
      description:
        "I find inspiration in daily life, nature, and cultural stories that deserve to be told.",
      color: "bg-pink-200",
    },
    {
      icon: "✏️",
      title: "Sketching",
      description:
        "Every piece begins with rough sketches and concept development on paper.",
      color: "bg-purple-200",
    },
    {
      icon: "🎨",
      title: "Digital Magic",
      description:
        "I bring sketches to life using digital tools, adding colors, textures, and details.",
      color: "bg-pink-200",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100/80 text-pink-600 rounded-full text-base font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          About Me
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Hello, I&apos;m Lan
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          A passionate illustrator and digital artist based in Vietnam, creating
          vibrant artworks that tell stories and capture emotions.
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
        {/* Artist Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="relative aspect-[4/5] bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Artist Photo"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                width={400}
                height={500}
              />
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2 space-y-6"
        >
          <div>
            <h2
              className="text-2xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              My Journey
            </h2>
            <p
              className="text-gray-600 leading-relaxed mb-4 text-lg"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              My artistic journey began with a simple love for colors and
              storytelling. What started as childhood sketches has evolved into a
              professional practice of creating illustrations that bridge the gap
              between imagination and reality.
            </p>
            <p
              className="text-gray-600 leading-relaxed text-lg"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              I specialize in digital illustration, character design, and
              editorial artwork. My work is inspired by everyday moments, cultural
              heritage, and the beauty found in ordinary life.
            </p>
          </div>

          <div>
            <h3
              className="text-xl font-semibold mb-4 text-gray-800"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Specialties
            </h3>
            <motion.ul
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {specialties.map((specialty, index) => (
                <motion.li
                  key={specialty}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center group"
                >
                  <motion.span
                    whileHover={{ scale: 1.5 }}
                    className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:bg-pink-500 transition-colors"
                  />
                  <span
                    className="text-gray-600 text-lg group-hover:text-pink-500 transition-colors"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {specialty}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* Skills & Process */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mb-16"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl blur-xl opacity-50" />
        <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h2
            className="text-3xl font-semibold text-center mb-12 text-gray-800"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            My Creative Process
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <span className="text-2xl">{step.icon}</span>
                </motion.div>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ fontFamily: "Pacifico, cursive" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-gray-600 text-base"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2
          className="text-2xl font-semibold mb-4 text-gray-800"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          Let&apos;s Create Something Beautiful Together
        </h2>
        <p
          className="text-gray-600 mb-8 max-w-xl mx-auto text-lg"
          style={{ fontFamily: "Patrick Hand, cursive" }}
        >
          Whether you&apos;re looking for custom illustrations, character designs,
          or editorial artwork, I&apos;d love to hear about your project and bring
          your vision to life.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href={`mailto:${EMAIL_USER}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
            style={{ fontFamily: "Patrick Hand, cursive", fontSize: "1.1rem" }}
          >
            Get In Touch
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-colors"
              style={{ fontFamily: "Patrick Hand, cursive", fontSize: "1.1rem" }}
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
