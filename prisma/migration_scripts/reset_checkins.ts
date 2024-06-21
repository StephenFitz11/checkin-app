const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function mains() {
  const results = await prisma.participant.findMany({});

  for (let index = 0; index < results.length; index++) {
    const element = results[index];

    await prisma.participant.update({
      where: {
        id: element.id,
      },
      data: {
        paradeOrder: null,
        checkedIn: false,
      },
    });
  }
}

mains()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
