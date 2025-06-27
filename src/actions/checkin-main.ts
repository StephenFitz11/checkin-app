'use server';
import { ParticipantMain } from '@/app/(protected)/checkin/data-table';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const determineParadeOrder = async (
  p: ParticipantMain,
  checkValue: boolean
) => {
  const corralMap = [
    {
      name: 'A',
      id: 4,
    },
    {
      name: 'B',
      id: 6,
    },
    {
      name: 'C',
      id: 7,
    },
    {
      name: 'D',
      id: 8,
    },
  ];
  const maxOrder = await prisma.participant.aggregate({
    where: {
      // Specify any filters here, e.g., active users, users in a specific group, etc.
      coralId: corralMap.find(c => c.name === p.corral)?.id,
    },
    _max: {
      paradeOrder: true,
    },
  });
  const paradeOrderUpdate = checkValue
    ? maxOrder._max.paradeOrder
      ? maxOrder._max.paradeOrder + 1
      : 1
    : null;
  return paradeOrderUpdate;
};

export const checkinMain = async (p: ParticipantMain, checkValue: boolean) => {
  if (!p) return;
  const paradeOrderUpdate = await determineParadeOrder(p, checkValue);
  await prisma.participant.update({
    where: {
      // Assuming you have some identifier to select the third record, e.g., id
      id: Number(p.id),
    },
    data: {
      checkedIn: checkValue,
      paradeOrder: paradeOrderUpdate,
    },
  });
  revalidatePath('/main');
  revalidatePath('/', 'layout');
};
