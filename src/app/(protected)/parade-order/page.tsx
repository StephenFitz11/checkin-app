import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import DragDrop from "./drop-drag";
import prisma from "@/lib/db";
import { ParticipantWithCorral } from "@/types/types";

// import { Draggable } from "./Draggable";
// import { Droppable } from "./Droppable";

const page = async () => {
  const participants: ParticipantWithCorral[] =
    await prisma.participant.findMany({
      include: {
        Coral: true,
      },
    });
  return <DragDrop participants={participants} />;
};

export default page;
