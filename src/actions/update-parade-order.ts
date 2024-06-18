"use server";
import { Participant } from "@prisma/client";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateParadeOrder = async (newarry: Participant[]) => {
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
  revalidatePath("/main");
};
