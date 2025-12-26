"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Behance images for fallback
const BEHANCE_FEATURED = [
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/cae886218427163.Y3JvcCwyODcxLDIyNDYsMjgsMA.png",
    name: "Minh họa truyện Mèo Mini",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/67f411225383483.Y3JvcCwxMTkyLDkzMywxMDMsMA.png",
    name: "Vẽ Commission",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/6cb5ee221058433.Y3JvcCwxNzEyLDEzMzksMCw1NTk.png",
    name: "Bìa sách",
  },
];

type FeaturedImage = {
  url: string;
  name: string;
  isCloudinary?: boolean;
};

export const HeroSection = () => {
  const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>([]);

  useEffect(() => {
    fetch("/api/list-images")
      .then((res) => res.json())
      .then((data) => {
        const cloudinaryImages = (data.images || []).slice(0, 3).map(
          (img: { secure_url: string; display_name: string }) => ({
            url: img.secure_url,
            name: img.display_name || "Artwork",
            isCloudinary: true,
          })
        );
        // If we have cloudinary images, use them; otherwise use Behance
        if (cloudinaryImages.length >= 3) {
          setFeaturedImages(cloudinaryImages);
        } else {
          // Fill remaining slots with Behance images
          const remaining = 3 - cloudinaryImages.length;
          setFeaturedImages([
            ...cloudinaryImages,
            ...BEHANCE_FEATURED.slice(0, remaining).map((img) => ({
              url: img.url,
              name: img.name,
              isCloudinary: false,
            })),
          ]);
        }
      })
      .catch(() => {
        // On error, use Behance images
        setFeaturedImages(
          BEHANCE_FEATURED.map((img) => ({
            url: img.url,
            name: img.name,
            isCloudinary: false,
          }))
        );
      });
  }, []);

  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    gallery?.scrollIntoView({ behavior: "smooth" });
  };

  const getImageSrc = (img: FeaturedImage) => {
    if (img.isCloudinary) {
      return `/api/proxy?url=${encodeURIComponent(img.url)}`;
    }
    return img.url;
  };

  return (
    <section className="relative min-h-[80vh] flex items-center px-4 py-12 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-72 h-72 bg-pink-100/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
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

          {/* Right Side - Featured Art */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Featured Image */}
              {featuredImages[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/10"
                >
                  <Image
                    src={getImageSrc(featuredImages[0])}
                    alt={featuredImages[0].name || "Featured artwork"}
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              )}

              {/* Secondary Image - Behind left */}
              {featuredImages[1] && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -left-8 top-12 w-32 h-40 rounded-xl overflow-hidden shadow-xl -z-0 hidden md:block"
                >
                  <Image
                    src={getImageSrc(featuredImages[1])}
                    alt={featuredImages[1].name || "Artwork"}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}

              {/* Third Image - Behind right */}
              {featuredImages[2] && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -right-6 bottom-16 w-28 h-36 rounded-xl overflow-hidden shadow-xl -z-0 hidden md:block"
                >
                  <Image
                    src={getImageSrc(featuredImages[2])}
                    alt={featuredImages[2].name || "Artwork"}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl" />
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
