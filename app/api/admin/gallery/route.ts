import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File;
  const title = (form.get("title") as string) || file.name;
  const type = (form.get("type") as string) || "image";

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const blob = await put(file.name, file, { access: "public" });

  const maxOrder = await prisma.galleryItem.aggregate({ _max: { order: true } });
  const order = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.galleryItem.create({
    data: { title, type, url: blob.url, order },
  });

  return NextResponse.json(item);
}
