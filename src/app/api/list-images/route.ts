import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const files = await readdir(publicDir);
  const images = files.filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  return NextResponse.json({ images });
}
