"use server";
import { Participant } from "@prisma/client";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

function findMovedItems(oldArray: any, newArray: any) {
  const oldIndexMap = new Map();
  oldArray.forEach((item: any, index: number) => {
    oldIndexMap.set(item.id, index); // Assuming each item has a unique 'id' property
  });

  const movedItems: any[] = [];
  newArray.forEach((item: any, newIndex: any) => {
    const oldIndex = oldIndexMap.get(item.id);
    if (oldIndex !== undefined && oldIndex !== newIndex) {
      movedItems.push({ id: item.id, name: item.name, newIndex: newIndex });
    }
  });

  return movedItems;
}

export const updateParadeOrder = async (
  newarry: Participant[],
  oldArray: Participant[]
) => {
  const movedItems = findMovedItems(oldArray, newarry);

  for (let i = 0; i < movedItems.length; i++) {
    const participant = movedItems[i];
    await prisma.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        paradeOrder: participant.newIndex,
      },
    });
  }
  revalidatePath("/main");
};
