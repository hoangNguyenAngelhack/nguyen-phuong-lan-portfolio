import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { filename } = await req.json();
  if (!filename) {
    return NextResponse.json(
      { error: "No filename provided" },
      { status: 400 }
    );
  }
  const filePath = path.join(process.cwd(), "public", filename);
  try {
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
