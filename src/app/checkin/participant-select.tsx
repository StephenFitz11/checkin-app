"use client";
import React, { Fragment, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Participant } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// flex min-h-screen flex-col items-center justify-between sm:p-24

const ParticipantSelect = ({ participants }: { participants: any[] }) => {
  const [selected, setSelected] = useState<Participant>();
  return (
    <>
      <div className="h-screen px-2 flex flex-col justify-around">
        <h2 className="text-xl font-bold text-center py-4">
          Select Participant
        </h2>
        <ScrollArea className="md:h-96 h-4/5 w-full rounded-md border">
          <div className="p-4">
            {participants.map((participant) => (
              <Fragment key={participant.id}>
                <div
                  className={cn(
                    selected?.id === participant.id
                      ? "bg-gray-200"
                      : "bg-white",
                    "text-sm text-center hover:cursor-pointer py-4 border-b border-gray-200"
                  )}
                  onClick={() => setSelected(participant)}
                >
                  {participant.name}
                </div>
                {/* <Separator className="my-1" /> */}
              </Fragment>
            ))}
          </div>
        </ScrollArea>
        <Button className=" w-full" onClick={() => console.log(selected)}>
          Check In
        </Button>
      </div>
    </>
  );
};

export default ParticipantSelect;
