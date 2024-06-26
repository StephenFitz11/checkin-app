"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import React, { useEffect, useState } from "react";
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
  DialogClose,
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
import { ChangeCorral, corrals } from "./change-corral";
import { updateCorral } from "@/actions/update-corral";
import { Check, CheckCircle, Space, UserCheck } from "lucide-react";
// import { useSearchParams } from "next/navigation";

interface Item {
  id: string;
  text: string;
}
// Updated SortableItem to accept an Item object
function SortableItem({
  item,
  idx,
  handleClickRow,
}: {
  item: Participant;
  idx: number;
  handleClickRow: (item: Participant) => void;
}) {
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
      className="cursor-pointer border px-4 py-4 flex justify-between gap-6 items-center text-left"
      onMouseDown={() => handleClickRow(item)}
    >
      <div className="flex gap-4 items-center w-full">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
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
        <span className="flex-grow inline-flex gap-4 break-words">
          {item.name}
          <span>{item.specialOrder && "#" + item.specialOrder}</span>
        </span>
      </div>
      {item.checkedIn && (
        <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
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
  // const searchParams = useSearchParams();

  const [participant, setParticipant] = useState<Participant>();
  const [items, setItems] = useState<Participant[]>(participants);

  const [open, setOpen] = useState(false);
  const [corralValue, setCorralValue] = useState(
    String(participant?.coralId || 1) || ""
  );

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleClickRow = (item: Participant) => {
    setParticipant(item);
    setCorralValue(String(participant?.coralId || 1));
    setOpen(true);
  };

  const handleCheck = async (checkvalue: boolean) => {
    const copy = [...items];
    setOpen(false);
    await handleCheckin(participant, checkvalue);

    let firstNotChecking = items.findIndex((p) => !p.checkedIn);
    const thisParticipant = items.findIndex((p) => p.id === participant?.id);

    if (!checkvalue) firstNotChecking = firstNotChecking - 1;

    let movedItems = arrayMove(items, thisParticipant, firstNotChecking);

    movedItems = movedItems.map((p) =>
      p.id === participant?.id ? { ...p, checkedIn: checkvalue } : p
    );

    setItems(movedItems);
    await updateParadeOrder(movedItems, copy);
  };

  const handleChangeCorral = async (value: string) => {
    // setCorralValue(value);
    await updateCorral(participant, value);
    setOpen(false);
    router.push(`/main?tab=${value}&change=${participant?.id}`);
  };

  const handleDragEnd = async (event: any) => {
    const copy = [...items];
    const { active, over } = event;

    if (!over) return;
    // setParticipant(() => participants.find((p) => p.id === active.id));
    // setCorralValue(String(participant?.coralId || 1));
    // setOpen(true);
    // return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const movedItems = arrayMove(items, oldIndex, newIndex);
      setItems(movedItems);

      await updateParadeOrder(movedItems, copy);
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
            <SortableItem
              key={item.id}
              item={item}
              idx={idx + 1}
              handleClickRow={handleClickRow}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Dialog open={open} onOpenChange={setOpen}>
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
              {/* <p>{corrals.find((c) => c.id === participant?.coralId)?.name}</p> */}
            </div>
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Corral: </p>
              <p>
                {corrals.find((c) => c.id === participant?.coralId)?.letter}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <ChangeCorral
              corralValue={String(participant?.coralId)}
              handleChangeCorral={handleChangeCorral}
            />
            {participant?.checkedIn && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  handleCheck(false);
                }}
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
                Undo Checkin
              </Button>
            )}

            {!participant?.checkedIn && (
              <Button type="button" onClick={() => handleCheck(true)}>
                Checkin
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReorderableTable;
