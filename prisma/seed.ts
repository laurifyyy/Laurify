import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@laurify.lv";
  const password = process.env.ADMIN_PASSWORD || "changeme123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, password: hashed, name: "Admin", role: "ADMIN" },
  });

  console.log(`✓ Admin user created: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
