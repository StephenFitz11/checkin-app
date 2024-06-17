"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";
var _ = require("lodash");
import { DndContext, TouchSensor, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ParticipantWithCorral } from "@/types/types";
import { updateParadeOrder } from "@/actions/update-parade-order";
import { Participant } from "@prisma/client";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { CarouselApi } from "@/components/ui/carousel";
// Updated initialItems to be an array of objects
const initialItems = [
  { id: "1", text: "Row 1" },
  { id: "2", text: "Row 2" },
  { id: "3", text: "Row 3" },
];

interface Item {
  id: string;
  text: string;
}
// Updated SortableItem to accept an Item object
function SortableItem({ item, idx }: { item: Participant; idx: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-pointer border px-4 py-4 flex justify-between gap-6 items-center text-center"
      onClick={() => console.log("ITEMS!!!!!")}
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
            {idx}
          </text>
        </svg>

        {item.name}
      </div>
      {item.checkedIn && (
        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          <svg
            className="h-1.5 w-1.5 fill-green-500"
            viewBox="0 0 6 6"
            aria-hidden="true"
          >
            <circle cx={3} cy={3} r={3} />
          </svg>
          Checked in
        </span>
      )}
    </div>
  );
}

const ReorderableTable = ({
  participants,
}: {
  participants: Participant[];
}) => {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [items, setItems] = useState<Participant[]>(participants);
  const [participant, setParticipant] = useState<Participant>();
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCheck = async () => {
    setOpen(false);
    await handleCheckin(participant);

    let firstNotChecking = items.findIndex((p) => !p.checkedIn);
    // if (firstNotChecking === 0) firstNotChecking++;

    const thisParticipant = items.findIndex((p) => p.id === participant?.id);
    console.log("firstNotChecking", firstNotChecking);
    console.log("firstNotChecking", thisParticipant);
    let movedItems = arrayMove(items, thisParticipant, firstNotChecking);
    movedItems = movedItems.map((p) =>
      p.id === participant?.id ? { ...p, checkedIn: true } : p
    );
    // const newItems = movedItems.map((p, idx) => ({ ...p, paradeOrder: idx }));

    setItems(movedItems);
    await updateParadeOrder(movedItems);
    // router.push(`/main?tab=${Number(participant?.coralId) - 1}`);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) {
      setParticipant(() => participants.find((p) => p.id === active.id));
      setOpen(true);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const movedItems = arrayMove(items, oldIndex, newIndex);
      setItems(movedItems);

      await updateParadeOrder(movedItems);
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, idx) => (
            <SortableItem key={item.id} item={item} idx={idx + 1} />
          ))}
        </SortableContext>
      </DndContext>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-3/4 ">
          <DialogHeader>
            <DialogTitle>Checkin</DialogTitle>
            <DialogDescription className="mt-4">
              Use this to checkin the participant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Name: </p>
              <p>{participant?.name}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
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
              Back
            </Button>
            <Button type="button" onClick={() => handleCheck()}>
              Checkin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReorderableTable;
