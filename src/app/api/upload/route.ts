import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest): Promise<Response> {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Tạo form data gửi lên Cloudinary
  const form = new FormData();
  form.append("file", new Blob([buffer]));
  form.append("upload_preset", "ml_default");

  return new Promise<Response>((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        type: "upload",
        max_results: 100,
      },
      (error, result) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: "Upload failed", details: error },
              { status: 500 }
            )
          );
        } else {
          resolve(NextResponse.json({ url: result?.secure_url }));
        }
      }
    );
    stream.end(buffer);
  });
}
