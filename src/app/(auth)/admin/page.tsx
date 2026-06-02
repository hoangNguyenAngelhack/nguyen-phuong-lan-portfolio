"use client";

import { useRef, useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogOut, Trash2, UploadCloud, Loader2 } from "lucide-react";

import { ADMIN_PASS, ADMIN_USER } from "@/mocks";

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

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
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [images, setImages] = useState<CloudinaryImageList>([]);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("admin_logged_in") === "true") setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) fetchImages();
  }, [loggedIn]);

  const notify = (msg: string, isError = false) => {
    setMessage(msg);
    setError(isError);
  };

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
      notify("");
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_logged_in", "true");
      }
    } else {
      notify("Sai tài khoản hoặc mật khẩu!", true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_logged_in");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) {
      notify("Vui lòng chọn một ảnh.", true);
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        notify("Upload thành công!");
        if (fileInput.current) fileInput.current.value = "";
        setFileName("");
        fetchImages();
      } else {
        notify("Upload thất bại!", true);
      }
    } catch {
      notify("Upload thất bại!", true);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: CloudinaryImage) => {
    if (!confirm("Xóa ảnh này?")) return;
    const res = await fetch("/api/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: img }),
    });
    if (res.ok) fetchImages();
    else notify("Xóa thất bại!", true);
  };

  /* ---------------- Login screen ---------------- */
  if (!loggedIn) {
    return (
      <div className="relative z-1 flex min-h-screen w-full items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-[0_8px_30px_var(--accent-glow)]">
            NL
          </span>
          <h1 className="mt-6 font-display text-3xl text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white/45">
            Sign in to manage your portfolio.
          </p>

          <form onSubmit={handleLogin} className="mt-7 flex flex-col gap-4">
            <input
              ref={userRef}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--accent)] focus:bg-white/[0.05]"
              placeholder="Username"
              autoComplete="username"
            />
            <input
              ref={passRef}
              type="password"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--accent)] focus:bg-white/[0.05]"
              placeholder="Password"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="rounded-xl bg-white py-3 text-sm font-medium text-black transition-transform hover:scale-[1.01]"
            >
              Sign in
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                error ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {message}
            </p>
          )}

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- Dashboard ---------------- */
  return (
    <div className="relative z-1 mx-auto min-h-screen w-full max-w-7xl px-6 py-10">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-sm font-bold text-white">
            NL
          </span>
          <div>
            <h1 className="text-lg font-medium text-white">Portfolio admin</h1>
            <p className="text-sm text-white/40">{images.length} images</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Site
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Upload */}
      <form
        onSubmit={handleUpload}
        className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="group flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 px-5 py-4 transition-colors hover:border-[var(--accent)]/60">
            <UploadCloud className="h-6 w-6 text-white/40 group-hover:text-[var(--accent)]" />
            <span className="truncate text-sm text-white/60">
              {fileName || "Chọn ảnh để tải lên…"}
            </span>
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-medium text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang tải…
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
        {message && (
          <p
            className={`mt-4 text-sm ${
              error ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Gallery */}
      {images.length === 0 ? (
        <p className="mt-16 text-center text-white/40">Chưa có ảnh nào.</p>
      ) : (
        <div className="mt-10">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {images.map((img, i) => (
              <div
                key={img.asset_id ?? i}
                className="group relative mb-6 overflow-hidden rounded-2xl border border-white/[0.06]"
              >
                <Image
                  src={`/api/proxy?url=${encodeURIComponent(
                    img?.secure_url as string
                  )}`}
                  alt={img?.display_name}
                  className="h-auto w-full object-cover"
                  width={400}
                  height={500}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  priority={i < 2}
                />
                <button
                  onClick={() => handleDelete(img)}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur transition-all hover:bg-rose-500 md:opacity-0 md:group-hover:opacity-100"
                  title="Xóa ảnh"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Xóa
                </button>
              </div>
            ))}
          </Masonry>
        </div>
      )}
    </div>
  );
}
