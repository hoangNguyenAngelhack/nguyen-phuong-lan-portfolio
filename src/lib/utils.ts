import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FeaturedImage = {
  url: string;
  name: string;
  isCloudinary?: boolean;
};

export const getImageSrc = (img: FeaturedImage) => {
  if (img.isCloudinary) {
    return `/api/proxy?url=${encodeURIComponent(img.url)}`;
  }
  return img.url;
};
