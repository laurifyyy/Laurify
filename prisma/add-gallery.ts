import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const items = [
  { title: "Galerija 1", type: "image", url: "/gallery/g1.jpg", order: 10 },
  { title: "Galerija 2", type: "video", url: "/gallery/g2.mp4", order: 11 },
  { title: "Galerija 3", type: "video", url: "/gallery/g3.mp4", order: 12 },
  { title: "Galerija 4", type: "video", url: "/gallery/g4.mp4", order: 13 },
  { title: "Galerija 5", type: "video", url: "/gallery/g5.mp4", order: 14 },
  { title: "Galerija 6", type: "video", url: "/gallery/g6.mp4", order: 15 },
  { title: "Galerija 7", type: "video", url: "/gallery/g7.mp4", order: 16 },
];

async function run() {
  for (const item of items) {
    const exists = await prisma.galleryItem.findFirst({ where: { url: item.url } });
    if (!exists) {
      await prisma.galleryItem.create({ data: item });
      console.log("Added:", item.title);
    } else {
      console.log("Already exists:", item.title);
    }
  }
  const all = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  console.log(`\nTotal items in DB: ${all.length}`);
  all.forEach(i => console.log(` - ${i.title} (${i.type})`));
  await prisma.$disconnect();
}

run().catch(console.error);
