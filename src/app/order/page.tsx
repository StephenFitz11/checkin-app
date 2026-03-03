import Order from "./Order";
import prisma from "@/lib/db";
const Page = async () => {
    const data = await prisma.participant.findMany({
      include: {
        Coral: true,
      },
      orderBy: { name: "asc" },
    });
  return <Order data={data} />;
};

export default Page;    