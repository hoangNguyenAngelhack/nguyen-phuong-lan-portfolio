// app/api/images/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const public_id = body.public_id || body.filename?.public_id;
  if (!public_id) {
    return NextResponse.json(
      { error: "No public_id provided" },
      { status: 400 }
    );
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Delete failed", detail: result },
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
