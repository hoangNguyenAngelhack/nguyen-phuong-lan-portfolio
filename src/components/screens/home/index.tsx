"use client";
import { IMAGE_HOME } from "@/mocks";
import Image from "next/image";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const HomeScreen = () => {
  return (
    <div className="max-w-[1200px] max-sm:max-w-[98%] mx-auto px-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {IMAGE_HOME.map((src, i) => (
          <div key={i} className="mb-8">
            <Image
              src={src}
              alt="Artwork"
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
