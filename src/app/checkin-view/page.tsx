import React from "react";
import { DataTable } from "./data-table";
import { checkinColums } from "./checkin-columns";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

const page = async () => {
  const coralsWithParticipants = await prisma.coral.findMany({
    include: {
      Participant: true,
    },
  });
  console.log(coralsWithParticipants);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-6">
        {coralsWithParticipants.map((coral) => (
          <>
            <h2 className="text-2xl font-bold">{coral.name}</h2>
            <DataTable
              key={coral.id}
              columns={checkinColums}
              data={coral.Participant}
            />
          </>
        ))}
      </div>
    </main>
  );
};

export default page;
