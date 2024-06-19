import React from "react";
import { DataTable } from "./(protected)/checkin-view/data-table";
import { checkinColums } from "./(protected)/checkin-view/checkin-columns";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, CheckCircleIcon, RefreshCw } from "lucide-react";
import RefreshButton from "./refresh-btn";

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
            <div
              key={participant.id}
              className="cursor-pointer border px-4 py-4 flex justify-between gap-6 items-center  text-left"
            >
              <div className="flex gap-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="2"
                    fill="white"
                  />
                  <text
                    x="50%"
                    y="50%"
                    alignmentBaseline="central"
                    textAnchor="middle"
                    fontFamily="Arial"
                    fontSize="12"
                    fill="black"
                  >
                    {idx + 1}
                  </text>
                </svg>
                {participant.name}
              </div>
              {participant.seen && (
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  <Check size={16} />
                  {/* <svg
                    className="h-1.5 w-1.5 fill-green-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    >
                    <circle cx={3} cy={3} r={3} />
                    </svg> */}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
      <RefreshButton className="sm:py-6 text-lg" />
    </main>
  );
};

export default page;
