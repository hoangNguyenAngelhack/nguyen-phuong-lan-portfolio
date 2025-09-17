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
  useEffect(() => {
    fetch("/api/list-images")
      .then((res) => res.json())
      .then((data) => setImages(data.images || []));
  }, []);

  return (
    <div className="max-w-[1200px] max-sm:max-w-[98%] mx-auto px-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {images.map((src, i) => (
          <div key={i} className="mb-8">
            <Image
              src={`/${src?.secure_url}`}
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
