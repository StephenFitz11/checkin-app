// scripts/assign-checkin-numbers.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function shuffledNumbers(from, to) {
  const arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function main() {
  const participants = await prisma.participant.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  });

  if (participants.length === 0) {
    console.log('No participants found.');
    return;
  }

  const minNumber = 10;
  const maxNumber = 100;
  const availableCount = maxNumber - minNumber + 1;

  if (participants.length > availableCount) {
    throw new Error(
      `There are ${participants.length} participants, but only ${availableCount} unique check-in numbers (${minNumber}–${maxNumber}) are available.`
    );
  }

  const numbers = shuffledNumbers(minNumber, maxNumber);
  const updates = participants.map((p, idx) =>
    prisma.participant.update({
      where: { id: p.id },
      data: { checkinNumber: numbers[idx] },
    })
  );

  await prisma.$transaction(updates);

  console.log(
    `Assigned random unique checkinNumber (${minNumber}–${maxNumber}) to ${participants.length} participants.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });