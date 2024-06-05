import React from "react";

import ParticipantSelect from "./participant-select";
import prisma from "@/lib/db";

const page = async () => {
  const participants = await prisma.participant.findMany({
    include: {
      Coral: true,
    },
  });

  return <ParticipantSelect participants={participants} />;
};

export default page;
