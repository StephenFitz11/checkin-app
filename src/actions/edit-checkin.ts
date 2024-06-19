"use server";
import { Participant } from "@prisma/client";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleCheckin = async (
  participant: Participant | undefined,
  checkinStatus: boolean
) => {
  if (!participant) return;
  // Step 1: Find the maximum "order" value in the records

  // Step 2: Update the third record's "order" to be highestOrder + 1
  const updated = await prisma.participant.update({
    where: {
      // Assuming you have some identifier to select the third record, e.g., id
      id: participant.id,
    },
    data: {
      checkedIn: checkinStatus,
    },
  });
  revalidatePath("/main");
  revalidatePath("/");
};
