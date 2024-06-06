import { Participant, Coral } from "@prisma/client";
export type ParticipantWithCorral = Participant & { Coral: Coral };
