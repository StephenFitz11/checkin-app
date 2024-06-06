"use client";
// import { handleCheckin } from "@/actions/mark-checked-in";
import { Button } from "@/components/ui/button";
import { Coral, Participant } from "@prisma/client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleCheckin } from "@/actions/edit-checkin";
import { ParticipantWithCorral } from "@/types/types";

const CheckinButton = ({
  participant,
}: {
  participant: ParticipantWithCorral | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    handleCheckin(participant);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild onClick={handleClick}>
          <Button
            disabled={!participant ? true : false}
            onClick={() => setOpen(true)}
          >
            Check In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3/4 ">
          <DialogHeader>
            <DialogTitle>Checkin Confirmed!</DialogTitle>
            <DialogDescription className="mt-4">
              {participant?.name} has been checked in!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Name: </p>
              <p>{participant?.name}</p>
            </div>
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Corral: </p>
              <p>{participant?.Coral.name}</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              Undo
            </Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckinButton;
