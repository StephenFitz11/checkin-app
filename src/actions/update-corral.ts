'use server';
import prisma from '@/lib/db';
import { Participant } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { determineParadeOrder } from './checkin-main';
import { ParticipantMain } from '@/app/(protected)/checkin/data-table';

export const updateCorral = async (
  participant?: Participant,
  corralId?: string
) => {
  if (!participant) return;

  const participantMain: ParticipantMain = {
    id: String(participant.id),
    name: participant.name,
    corral: 'participant',
    checkedIn: participant.checkedIn,
    corralId: participant.coralId,
    type: participant.type || '',
    specialOrder: Boolean(participant.specialOrder),
  };

  const paradeOrderUpdate = await determineParadeOrder(participantMain, false);
  await prisma.participant.update({
    where: {
      id: participant.id,
    },
    data: {
      coralId: Number(corralId),
      paradeOrder: paradeOrderUpdate,
    },
  });
  revalidatePath('/main');
};
