'use client';

import ParticipantRow from '@/components/participant-row';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Participant } from '@prisma/client';

export default function ParticipantAccordian({
  participants,
}: {
  participants: Participant[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full px-2">
      {participants.map((participant, idx) => (
        <>
          <div className="flex flex-row w-full gap-2">
            <ParticipantRow
              key={participant.id}
              participant={participant}
              idx={idx}
            >
              {participant.name}
            </ParticipantRow>
          </div>
        </>
      ))}
    </Accordion>
  );
}
