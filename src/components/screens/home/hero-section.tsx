"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BEHANCE_IMAGES } from "@/mocks";

const featuredImages = BEHANCE_IMAGES.slice(0, 3);

export const HeroSection = () => {
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center px-4 py-12 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-72 h-72 bg-pink-100/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span
                className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm"
                style={{ fontFamily: "Patrick Hand, cursive" }}
              >
                Digital Artist & Illustrator
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Where imagination
              <br />
              <span className="text-pink-500">comes to life</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-500 mb-8 max-w-md leading-relaxed"
              style={{ fontFamily: "Patrick Hand, cursive" }}
            >
              Creating magical illustrations that tell stories, spark emotions,
              and bring your creative visions to reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-lg hover:bg-gray-800 transition-colors"
                style={{ fontFamily: "Patrick Hand, cursive" }}
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex px-6 py-3 text-gray-700 rounded-full text-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  Let&apos;s Talk
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Featured Art Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center" style={{ minHeight: "520px" }}>
              {/* Secondary Image - Behind left, tilted */}
              {featuredImages[1] && (
                <motion.div
                  initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ rotate: -2, scale: 1.05, zIndex: 20 }}
                  className="absolute left-0 top-6 w-[48%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-[1] cursor-pointer hidden md:block"
                >
                  <Image
                    src={featuredImages[1].url}
                    alt={featuredImages[1].name || "Artwork"}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm" style={{ fontFamily: "Patrick Hand, cursive" }}>
                      {featuredImages[1].name}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Main Featured Image - Center, on top */}
              {featuredImages[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative z-10 w-[75%] md:w-[65%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/20 border-4 border-white cursor-pointer"
                >
                  <Image
                    src={featuredImages[0].url}
                    alt={featuredImages[0].name || "Featured artwork"}
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-lg font-medium" style={{ fontFamily: "Patrick Hand, cursive" }}>
                      {featuredImages[0].name}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Third Image - Behind right, tilted */}
              {featuredImages[2] && (
                <motion.div
                  initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 7, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ rotate: 1, scale: 1.05, zIndex: 20 }}
                  className="absolute right-0 bottom-6 w-[48%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-[1] cursor-pointer hidden md:block"
                >
                  <Image
                    src={featuredImages[2].url}
                    alt={featuredImages[2].name || "Artwork"}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm" style={{ fontFamily: "Patrick Hand, cursive" }}>
                      {featuredImages[2].name}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-pink-200/40 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-200/40 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-100/30 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToGallery}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};
