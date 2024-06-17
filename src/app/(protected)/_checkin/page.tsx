import React from "react";

import ParticipantSelect from "./participant-select";
import prisma from "@/lib/db";

import { ParticipantWithCorral } from "@/types/types";

const page = async () => {
  const participants: ParticipantWithCorral[] =
    await prisma.participant.findMany({
      include: {
        Coral: true,
      },
    });

  return <ParticipantSelect participants={participants} />;
};

export default page;
