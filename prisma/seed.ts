import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const GALLERY_ITEMS = [
  { title: "Galerija 1", type: "image", url: "/gallery/g1.jpg", order: 0 },
  { title: "Galerija 2", type: "video", url: "/gallery/g2.mp4", order: 1 },
  { title: "Galerija 3", type: "video", url: "/gallery/g3.mp4", order: 2 },
  { title: "Galerija 4", type: "video", url: "/gallery/g4.mp4", order: 3 },
  { title: "Galerija 5", type: "video", url: "/gallery/g5.mp4", order: 4 },
  { title: "Galerija 6", type: "video", url: "/gallery/g6.mp4", order: 5 },
  { title: "Galerija 7", type: "video", url: "/gallery/g7.mp4", order: 6 },
];

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@laurify.lv";
  const password = process.env.ADMIN_PASSWORD || "changeme123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, password: hashed, name: "Admin", role: "ADMIN" },
    });
    console.log(`✓ Admin user created: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({ data: GALLERY_ITEMS });
    console.log(`✓ Seeded ${GALLERY_ITEMS.length} gallery items`);
  } else {
    console.log(`Gallery already has ${galleryCount} items`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
