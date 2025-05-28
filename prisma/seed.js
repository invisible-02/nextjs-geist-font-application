const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const questions = [
    {
      id: 1,
      question: "Do you like programming?",
      options: '["Yes", "No"]',
    },
    {
      id: 2,
      question: "Have you used Next.js before?",
      options: '["Yes", "No"]',
    },
    {
      id: 3,
      question: "Do you enjoy working with databases?",
      options: '["Yes", "No"]',
    },
    {
      id: 4,
      question: "Is TypeScript your preferred language?",
      options: '["Yes", "No"]',
    },
    {
      id: 5,
      question: "Do you like open source projects?",
      options: '["Yes", "No"]',
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        question: q.question,
        options: q.options,
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
