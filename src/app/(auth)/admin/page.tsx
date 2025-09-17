"use client";

import { ADMIN_PASS, ADMIN_USER } from "@/mocks";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

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
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Images đã upload:</h2>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.asset_id} className="relative group">
              <Image
                src={`/api/proxy?imageUrl=${encodeURIComponent(
                  img?.secure_url as string
                )}`}
                alt={img.display_name}
                className="w-full rounded shadow object-cover"
                width={400}
                height={500}
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
                className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                title="Xóa ảnh"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
