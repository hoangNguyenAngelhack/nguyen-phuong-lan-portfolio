import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-");
  const uploadPath = path.join(process.cwd(), "public", filename);
  await writeFile(uploadPath, buffer);
  return NextResponse.json({ success: true, filename });
}
