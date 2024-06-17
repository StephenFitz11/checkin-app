"use server";
import { Participant } from "@prisma/client";
import prisma from "@/lib/db";

export const updateParadeOrder = async (newarry: Participant[]) => {
  console.log("START", new Date().toISOString());
  for (let i = 0; i < newarry.length; i++) {
    const participant = newarry[i];
    await prisma.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        paradeOrder: i,
      },
    });
  }
  console.log("End", new Date().toISOString());
};
