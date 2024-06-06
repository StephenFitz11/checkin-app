"use server";
import { Participant } from "@prisma/client";
import prisma from "@/lib/db";

export const handleCheckin = async (participant: Participant | undefined) => {
  if (!participant) return;

  const updated = await prisma.participant.update({
    where: {
      id: participant.id,
    },
    data: {
      checkedIn: true,
    },
  });
  return updated;
};
