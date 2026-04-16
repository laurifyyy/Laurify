import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") || "lv";
  const items = await prisma.content.findMany({
    where: { key: { startsWith: `${lang}.` } },
  });
  const result: Record<string, string> = {};
  for (const item of items) {
    result[item.key.slice(lang.length + 1)] = item.value;
  }
  return NextResponse.json(result);
}
