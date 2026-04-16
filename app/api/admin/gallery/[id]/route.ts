import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete file from disk
  if (item.url.startsWith("/uploads/")) {
    const filepath = path.join(process.cwd(), "public", item.url);
    await unlink(filepath).catch(() => {});
  }

  await prisma.galleryItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
