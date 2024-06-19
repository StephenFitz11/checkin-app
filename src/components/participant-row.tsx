"use client";

import { getCookie, removeCookie, setCookie } from "@/actions/cookies";
import useCounter from "@/hooks/useIdsCookie";
import { cn } from "@/lib/utils";
import { Participant } from "@prisma/client";
import { useEffect, useState } from "react";

const ParticipantRow = ({
  children,
  participant,
}: {
  children: React.ReactNode;
  participant: Participant;
}) => {
  const [seen, setSeen] = useState(false);

  const handleTap = async () => {
    if (!seen) {
      await setCookie([participant.id]);
      setSeen(true);
    }

    if (seen) {
      await removeCookie(participant.id);
      setSeen(false);
    }
  };

  useEffect(() => {
    const getTheCookie = async () => {
      const cookie = await getCookie();
      console.log(cookie);

      if (cookie.includes(participant.id)) {
        setSeen(true);
        console.log("Seen", participant.id);
      }
    };
    getTheCookie();
  }, [participant.id]);

  return (
    <div
      className={cn(
        seen && "bg-gray-100",
        "cursor-pointer border px-4 py-4 flex justify-between gap-6 items-center  text-left"
      )}
      onClick={handleTap}
    >
      <p className={cn(seen && "line-through")}>{children}</p>
      {seen && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Seen
        </span>
      )}
    </div>
  );
};

export default ParticipantRow;
