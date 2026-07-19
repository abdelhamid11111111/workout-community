// save as check_joins.js in your project root, run: node check_joins.js
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

(async () => {
  const rows = await prisma.userChallenge.findMany({
    orderBy: { joinedAt: "desc" },
    take: 20,
    include: {
      user: { select: { username: true } },
      challenge: { select: { title: true } },
    },
  });
  console.log(`Total UserChallenge rows: ${await prisma.userChallenge.count()}`);
  console.log("Most recent rows:");
  for (const r of rows) {
    console.log(`  ${r.joinedAt.toISOString()}  user=${r.user.username}  challenge=${r.challenge.title}`);
  }
})().finally(() => prisma.$disconnect());