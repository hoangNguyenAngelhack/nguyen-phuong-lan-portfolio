import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      max_results: 100,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Failed to fetch images" },
        { status: 500 }
      );
    }

    const data = result;

    // Trả về mảng ảnh
    return NextResponse.json({ images: data.resources });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
