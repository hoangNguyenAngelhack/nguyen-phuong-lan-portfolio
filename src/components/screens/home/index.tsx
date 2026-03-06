"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { BEHANCE_IMAGES } from "@/mocks";
import { HeroSection } from "./hero-section";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

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

      <div id="gallery" className="max-w-[1200px] max-sm:max-w-[98%] mx-auto px-4 min-h-[700px] pt-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            My Portfolio
          </h2>
          <p
            className="text-lg text-gray-500"
            style={{ fontFamily: "Patrick Hand, cursive" }}
          >
            A collection of my latest illustrations and artwork
          </p>
        </motion.div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {BEHANCE_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="mb-8 group cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={img.url}
                  alt={img.name}
                  className="gallery-img w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  width={600}
                  height={750}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  priority={i < 3}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span
                    className="text-white text-lg"
                    style={{ fontFamily: "Patrick Hand, cursive" }}
                  >
                    {img.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
      />
    </>
  );
};

export default HomeScreen;
