"use client";
import React, { Fragment, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Coral, Participant } from "@prisma/client";

import { cn } from "@/lib/utils";
import CheckinButton from "./checkin-btn";
import { ParticipantWithCorral } from "@/types/types";

const ParticipantSelect = ({
  participants,
}: {
  participants: ParticipantWithCorral[];
}) => {
  const [selected, setSelected] = useState<ParticipantWithCorral>();

  const handleChecking = () => {};

  return (
    <>
      <div className="h-screen px-2 flex flex-col justify-around">
        <h2 className="text-xl font-bold text-center py-4">
          Select Participant
        </h2>
        <ScrollArea className=" h-4/5 w-full rounded-md border">
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
              </Fragment>
            ))}
          </div>
        </ScrollArea>
        <CheckinButton participant={selected} />
      </div>
    </>
  );
};

export default ParticipantSelect;
