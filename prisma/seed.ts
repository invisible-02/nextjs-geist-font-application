import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const questions = [
    { id: 1, question: "Do you like programming?" },
    { id: 2, question: "Have you used Next.js before?" },
    { id: 3, question: "Do you enjoy working with databases?" },
    { id: 4, question: "Is TypeScript your preferred language?" },
    { id: 5, question: "Do you like open source projects?" },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        question: q.question,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
