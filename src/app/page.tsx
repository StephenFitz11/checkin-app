import React from "react";
import { DataTable } from "./(protected)/checkin-view/data-table";
import { checkinColums } from "./(protected)/checkin-view/checkin-columns";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, CheckCircleIcon, RefreshCw } from "lucide-react";
import RefreshButton from "./refresh-btn";
import ParticipantRow from "@/components/participant-row";

export const revalidate = 1;

const page = async () => {
  const participants = await prisma.participant.findMany({
    where: {
      checkedIn: true,
    },
    orderBy: [{ coralId: "asc" }, { paradeOrder: "asc" }],
  });

  return (
    <main className="flex flex-col items-center justify-between  py-4 h-screen sm:px-36">
      <div className="flex flex-col w-full h-full">
        <h1 className="text-center text-lg pb-4 font-semibold tracking-tight sm:text-2xl sm:py-6 ">
          2024 OK Pride Alliance Parade Order
        </h1>
        <div className="cursor-pointer border px-4 py-2 flex  items-center justify-between text-center rounded w-full">
          <div className="flex gap-8">
            <div>#</div>
            <div>Name</div>
          </div>
          <div>Seen</div>
        </div>
        <ScrollArea className=" w-full overflow-y-auto">
          {participants.map((participant, idx) => (
            <ParticipantRow
              key={participant.id}
              participant={participant}
              idx={idx}
            >
              <div className="flex gap-4">{participant.name}</div>
            </ParticipantRow>
          ))}
        </ScrollArea>
      </div>
      <RefreshButton className="sm:py-6 text-lg" />
    </main>
  );
};

export default page;
