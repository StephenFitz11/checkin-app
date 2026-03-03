import NumbersPage from "./NumbersEntry";
import prisma from "@/lib/db";
const Page = async () => {
    const data = await prisma.participant.findMany({
      include: {
        Coral: true,
      },
      orderBy: { name: "asc" },
    });
  return <NumbersPage data={data} />;
};

export default Page;    