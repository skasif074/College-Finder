// IMPORTANT: Point this to the local generated folder
import { PrismaClient } from './generated/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning database...");
  await prisma.college.deleteMany({});

  const colleges = [];

  for (let i = 1; i <= 50; i++) {
    // Top 10 are Elite (Rank 1-5000), 11-30 are Mid, 31-50 are Regional
    let minR = i <= 10 ? 1 : i <= 30 ? 5001 : 40001;
    let maxR = i <= 10 ? 5000 : i <= 30 ? 40000 : 150000;

    colleges.push({
      name: i <= 10 ? `Premier Institute ${i}` : `Engineering College ${i}`,
      location: i % 2 === 0 ? "Mumbai, Maharashtra" : "Bangalore, Karnataka",
      fees: 100000 + (i * 3000),
      rating: parseFloat((3.8 + (Math.random() * 1.2)).toFixed(1)),
      courses: ["Computer Science", "Electronics", "Mechanical"],
      minRank: minR,
      maxRank: maxR,
      description: "A quality technical institution offering robust placement support and modern labs."
    });
  }

  console.log("Seeding 50 colleges...");
  // We use (prisma.college as any) just in case VS Code's editor is still lagging
  await (prisma.college as any).createMany({
    data: colleges
  });

  console.log("✅ DONE! 50 colleges seeded successfully.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });