import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing imageUrl parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {},
    });

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/png",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (_error: any) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
