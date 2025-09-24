"use client";

import { useRef, useState, useEffect, Fragment } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";

import { ADMIN_PASS, ADMIN_USER } from "@/mocks";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export type CloudinaryImage = {
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  display_name: string;
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  secure_url: string;
  type: string;
  url: string;
  version: number;
  width: number;
};

export type CloudinaryImageList = CloudinaryImage[];

export default function AdminUpload() {
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [images, setImages] = useState<CloudinaryImageList>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  console.log(images);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogged = localStorage.getItem("admin_logged_in");
      if (isLogged === "true") setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) fetchImages();
  }, [loggedIn]);

  const fetchImages = async () => {
    const res = await fetch("/api/list-images");
    const data = await res.json();
    setImages(data.images || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      userRef.current?.value === ADMIN_USER &&
      passRef.current?.value === ADMIN_PASS
    ) {
      setLoggedIn(true);
      setMessage("");
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_logged_in", "true");
      }
    } else {
      setMessage("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setMessage("Please select an image file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setMessage("Upload thành công!");
      if (fileInput.current) fileInput.current.value = "";
      fetchImages();
    } else {
      setMessage("Upload thất bại!");
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-pink-50">
        <div className="mx-auto p-6 bg-white rounded shadow w-full max-w-[300px]">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              ref={userRef}
              className="border px-2 py-1 rounded"
              placeholder="Username"
            />
            <input
              ref={passRef}
              type="password"
              className="border px-2 py-1 rounded"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Login
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-pink-600">{message}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Admin: Upload Image</h1>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            className="border px-2 py-1 rounded"
            type="file"
            accept="image/*"
            ref={fileInput}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Upload
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-pink-600">{message}</div>
        )}
      </div>
      <div className="mt-8 w-full mx-auto p-4 bg-white rounded shadow">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map((img, i) => (
            <div key={i} className="mb-8 relative">
              <Image
                src={`/api/proxy?url=${encodeURIComponent(
                  img?.secure_url as string
                )}`}
                alt={img?.display_name}
                className="w-full h-auto object-cover"
                width={400}
                height={500}
                sizes="(max-width: 600px) 100vw, 400px"
                priority={i < 2}
              />
              <button
                onClick={async () => {
                  if (confirm("Xóa ảnh này?")) {
                    const res = await fetch("/api/delete-image", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ filename: img }),
                    });
                    if (res.ok) fetchImages();
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs"
                title="Xóa ảnh"
              >
                Xóa
              </button>
            </div>
          ))}
        </Masonry>
      </div>
    </Fragment>
  );
}
