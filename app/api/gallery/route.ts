import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}
