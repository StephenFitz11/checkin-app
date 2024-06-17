import { Participant, Coral } from "@prisma/client";
export type ParticipantWithCorral = Participant & { Coral: Coral };
export type CorralWithParticipants = Coral & { Participant: Participant[] };
