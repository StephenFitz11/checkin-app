"use server";
import { ParticipantMain } from "@/app/(protected)/checkin/data-table";
import prisma from "@/lib/db";
import { Participant } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const updateCorralMain = async (
  participant: ParticipantMain,
  corralId: string
) => {
  if (!participant) return;
  await prisma.participant.update({
    where: {
      id: Number(participant.id),
    },
    data: {
      coralId: Number(corralId),
    },
  });
  revalidatePath("/", "layout");
};
