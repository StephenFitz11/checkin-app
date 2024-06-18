"use server";
import prisma from "@/lib/db";
import { Participant } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const updateCorral = async (
  participant?: Participant,
  corralId?: string
) => {
  if (!participant) return;
  await prisma.participant.update({
    where: {
      id: participant.id,
    },
    data: {
      coralId: Number(corralId),
    },
  });
  revalidatePath("/main");
};
