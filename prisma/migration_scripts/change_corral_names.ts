// async function chnageCorralName() {
//   const nameMap: { [key: number]: string } = {
//     1: "A",
//     2: "B",
//     3: "C",
//     4: "D",
//   };

//   const results = await prisma.coral.findMany({});

//   for (let index = 0; index < results.length; index++) {
//     const element = results[index];

//     await prisma.coral.update({
//       where: {
//         id: element.id,
//       },
//       data: {
//         name: nameMap[element.id as number],
//       },
//     });
//   }
// }

// chnageCorralName()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
