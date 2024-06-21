import React from "react";
import { DataTable } from "./data-table";
import { checkinColums } from "./checkin-columns";
import prisma from "@/lib/db";

const Page = async () => {
  const data = await prisma.participant.findMany({
    include: {
      Coral: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="sm:container mx-0 sm:mx-auto sm:py-10 h-screen">
      <DataTable columns={checkinColums} data={data} />
    </div>
  );
};

export default Page;
