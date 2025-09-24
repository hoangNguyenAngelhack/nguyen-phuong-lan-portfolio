"use client";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { CloudinaryImageList } from "@/app/(auth)/admin/page";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const HomeScreen = () => {
  const [images, setImages] = useState<CloudinaryImageList>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/list-images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Skeleton component for loading state
  const SkeletonCard = ({ height }: { height: string }) => (
    <div className={`mb-8 animate-pulse`}>
      <div
        className={`bg-gray-200 rounded-lg ${height}`}
        style={{ aspectRatio: "4/5" }}
      >
        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );

  // Generate skeleton items with random heights to mimic masonry layout
  const generateSkeletons = () => {
    const heights = ["h-64", "h-80", "h-72", "h-96", "h-60", "h-88"];
    return Array.from({ length: 9 }, (_, i) => (
      <SkeletonCard key={i} height={heights[i % heights.length]} />
    ));
  };

  return (
    <div className="max-w-[1200px] max-sm:max-w-[98%] mx-auto px-4 min-h-[700px]">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {isLoading
          ? generateSkeletons()
          : images.map((src, i) => (
              <div key={i} className="mb-8">
                <Image
                  src={`/api/proxy?url=${encodeURIComponent(
                    src?.secure_url as string
                  )}`}
                  alt={src?.display_name}
                  className="gallery-img w-full h-auto object-cover"
                  width={400}
                  height={500}
                  sizes="(max-width: 600px) 100vw, 400px"
                  priority={i < 2}
                />
              </div>
            ))}
      </Masonry>
    </div>
  );
};

export default HomeScreen;
