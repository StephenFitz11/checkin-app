import prisma from "@/lib/db";
import Btn from "./btn";
const status = await prisma.parade.findUnique({
  where: {
    id: 1,
  },
});

const page = () => {
  const paradeStatus =
    status?.status == "not_started" ? (
      <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
        Not Started
      </span>
    ) : (
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Started! 🎉
      </span>
    );
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1>Parade Status: {paradeStatus} </h1>
      <Btn />
    </div>
  );
};

export default page;
