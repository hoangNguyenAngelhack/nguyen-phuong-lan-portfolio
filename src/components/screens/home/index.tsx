"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { CloudinaryImageList } from "@/app/(auth)/admin/page";
import { HeroSection } from "./hero-section";

// Behance portfolio images
const BEHANCE_IMAGES = [
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/19ffcb215258247.Y3JvcCwxMDg3LDg1MSw5NCww.png",
    name: "Phim ngắn quảng cáo kẹo Meberi",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/958a93237036927.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    name: "Background Mizu ASMR",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/67f411225383483.Y3JvcCwxMTkyLDkzMywxMDMsMA.png",
    name: "Vẽ Commission",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/083811224191557.Y3JvcCwyMjUwLDE3NTksMCwyNDU.png",
    name: "Ấn phẩm truyền thông",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/6cb5ee221058433.Y3JvcCwxNzEyLDEzMzksMCw1NTk.png",
    name: "Bìa sách",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/cae886218427163.Y3JvcCwyODcxLDIyNDYsMjgsMA.png",
    name: "Minh họa truyện Mèo Mini",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/projects/404/e7ba77204989513.Y3JvcCw4NzMsNjgzLDE2Miww.png",
    name: "Minh họa bìa sách văn",
  },
];

type GalleryImage = {
  url: string;
  name: string;
  isCloudinary?: boolean;
};

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const HomeScreen = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch("/api/list-images")
      .then((res) => res.json())
      .then((data) => {
        const cloudinaryImages: GalleryImage[] = (data.images || []).map(
          (img: CloudinaryImageList[0]) => ({
            url: img.secure_url,
            name: img.display_name || "Artwork",
            isCloudinary: true,
          })
        );
        // Combine Cloudinary images with Behance images
        const behanceImages: GalleryImage[] = BEHANCE_IMAGES.map((img) => ({
          url: img.url,
          name: img.name,
          isCloudinary: false,
        }));
        setAllImages([...cloudinaryImages, ...behanceImages]);
        setIsLoading(false);
      })
      .catch(() => {
        // If fetch fails, show Behance images only
        setAllImages(
          BEHANCE_IMAGES.map((img) => ({
            url: img.url,
            name: img.name,
            isCloudinary: false,
          }))
        );
        setIsLoading(false);
      });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getImageSrc = (img: GalleryImage) => {
    if (img.isCloudinary) {
      return `/api/proxy?url=${encodeURIComponent(img.url)}`;
    }
    return img.url;
  };

  const lightboxSlides = allImages.map((img) => ({
    src: getImageSrc(img),
    alt: img.name,
  }));

  // Skeleton component for loading state
  const SkeletonCard = ({ height, index }: { height: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-8"
    >
      <div
        className={`bg-gray-200 rounded-2xl ${height} overflow-hidden`}
        style={{ aspectRatio: "4/5" }}
      >
        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      </div>
    </motion.div>
  );

  // Generate skeleton items with random heights to mimic masonry layout
  const generateSkeletons = () => {
    const heights = ["h-64", "h-80", "h-72", "h-96", "h-60", "h-88"];
    return Array.from({ length: 9 }, (_, i) => (
      <SkeletonCard key={i} height={heights[i % heights.length]} index={i} />
    ));
  };

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
          {isLoading
            ? generateSkeletons()
            : allImages.map((img, i) => (
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
                      src={getImageSrc(img)}
                      alt={img.name}
                      className="gallery-img w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      width={400}
                      height={500}
                      sizes="(max-width: 600px) 100vw, 400px"
                      priority={i < 2}
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
