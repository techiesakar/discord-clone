import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file provided" });
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  const path = `./public/%${file.name}`;
  await writeFile(path, buffer);
  return NextResponse.json({ message: "File uploaded", success: true });
}
