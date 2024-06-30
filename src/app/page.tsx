import React from "react";

import prisma from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";

import RefreshButton from "./refresh-btn";
import ParticipantRow from "@/components/participant-row";
import { cn } from "@/lib/utils";

export const revalidate = 1;

const page = async () => {
  const status = await prisma.parade.findUnique({
    where: {
      id: 1,
    },
  });

  const participants = await prisma.participant.findMany({
    where: {
      checkedIn: true,
    },
    orderBy: [{ coralId: "asc" }, { paradeOrder: "asc" }],
  });

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
    <main className="flex flex-col items-center justify-between px-2 py-4 h-screen sm:px-36">
      <div className="flex flex-col w-full h-full">
        {participants.length === 0 ? (
          <>
            <h1 className="text-center text-3xl pt-4 pb-4 font-semibold tracking-tight sm:text-4xl sm:py-6 sm:pt-12 px-2 ">
              Pride Parade Order
            </h1>
            <h1 className="inline-flex items-center justify-center gap-2 text-center text-xl pt-1 pb-4 font-semibold tracking-tight sm:text-4xl sm:py-6 sm:pt-12 px-2 ">
              Parade Status: {paradeStatus}
            </h1>
          </>
        ) : (
          <>
            <div className="flex gap-3 sm:mt-12 items-center justify-center pb-4 sm:pb-0">
              <h3 className="inline text-4xl">🚗</h3>
              <h3 className="text-4xl ">🚗</h3>
              <h3 className="text-4xl hidden sm:inline">🚗</h3>
              <h1 className="text-center text-lg font-semibold tracking-tight sm:text-2xl sm:py-6 px-2 ">
                Pride Parade Order
              </h1>
              <h3 className="inline text-4xl">🌈</h3>
              <h3 className="inline text-4xl">🎉</h3>
              <h3 className="text-4xl hidden sm:inline ">🎊</h3>
            </div>
            <div className="flex items-center justify-center py-2">
              <h1>Parade Status: {paradeStatus} </h1>
            </div>
          </>
        )}

        {participants.length === 0 ? (
          <div className="text-center flex flex-col items-center justify-center h-1/4">
            <h3 className="mt-2 text-lg font-semibold text-gray-900 sm:text-xl">
              No floats have checked in yet!
            </h3>
            <p className="mt-1 text-lg text-gray-600">
              Be sure to refresh the app when the parade starts!
            </p>
            <div className="flex gap-3 mt-12">
              <h3 className="inline text-5xl">🚗</h3>
              <h3 className="inline text-5xl">🚗</h3>
              <h3 className="inline text-5xl">🚗</h3>
              <h3 className="inline text-5xl">🌈</h3>
              <h3 className="inline text-5xl">🎉</h3>
              <h3 className="inline text-5xl">🎊</h3>
            </div>
            <RefreshButton className=" hidden sm:flex rounded-full w-1/2 mt-12 text-lg" />
          </div>
        ) : (
          <>
            <div className="cursor-pointer border px-4 py-2 flex  items-center justify-between text-center rounded w-full">
              <div className="flex gap-6">
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
                  {participant.name}
                </ParticipantRow>
              ))}
              <div className="flex gap-3 pb-24 pt-8 items-center justify-center">
                <h3 className="inline text-3xl">🚗</h3>
                <h3 className="inline text-3xl">🚗</h3>
                <h3 className="inline text-3xl">🌈</h3>
                <h1 className="font-semibold tracking-tight">THE END!!!</h1>
                <h3 className="inline text-3xl">🎉</h3>
                <h3 className="inline text-3xl">🎊</h3>
                <h3 className="inline text-3xl">🎉</h3>
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <RefreshButton
        className={cn(
          participants.length === 0 ? "sm:hidden" : "",
          "sm:py-6 fixed bottom-0 left-0 text-lg"
        )}
      />
    </main>
  );
};

export default page;
