'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getCookie, removeCookie, setCookie } from '@/actions/cookies';
import useCounter from '@/hooks/useIdsCookie';
import { cn } from '@/lib/utils';
import { Participant } from '@prisma/client';
import { Circle, CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const ParticipantRow = ({
  children,
  participant,
  idx,
}: {
  children: React.ReactNode;
  participant: Participant;
  idx: number;
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
      if (!cookie) return;

      if (cookie.includes(participant.id)) {
        setSeen(true);
        console.log('Seen', participant.id);
      }
    };
    getTheCookie();
  }, [participant.id]);

  return (
    <>
      <AccordionItem value={`item-${idx}`} className="w-full">
        <AccordionTrigger className="w-full">
          <div className="flex gap-4 items-center w-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={seen ? 'gray' : 'black'}
                strokeWidth="1"
                fill="white"
              />
              <text
                x="50%"
                y="50%"
                alignmentBaseline="central"
                textAnchor="middle"
                fontFamily="Arial"
                fontSize="12"
                fontWeight="200"
                stroke={seen ? 'gray' : 'black'}
              >
                {idx + 1}
              </text>
            </svg>
            <p
              className={cn(
                seen && 'text-gray-500 line-through',
                'flex-shrink text-left'
              )}
            >
              {children}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-10">
          <ul className="list-disc flex flex-col gap-2">
            <li>{participant.infoTextOne}</li>
            <li>{participant.infoTextTwo}</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <div
        className="flex-shrink-0 flex gap-2 items-center"
        onClick={handleTap}
      >
        {seen ? (
          <CircleCheck className="text-green-500" aria-hidden="true" />
        ) : (
          <Circle className="text-gray-300" aria-hidden="true" />
        )}
      </div>
    </>
    // <div
    //   className={cn(
    //     seen && 'bg-gray-200 border-white',
    //     'cursor-pointer border px-2 py-4 flex items-center justify-between gap-6'
    //   )}
    //   // onClick={handleTap}
    // >
    //   <div className="flex gap-4 items-center">
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="flex-shrink-0"
    //     >
    //       <circle
    //         cx="12"
    //         cy="12"
    //         r="10"
    //         stroke={seen ? 'gray' : 'black'}
    //         strokeWidth="1"
    //         fill="white"
    //       />
    //       <text
    //         x="50%"
    //         y="50%"
    //         alignmentBaseline="central"
    //         textAnchor="middle"
    //         fontFamily="Arial"
    //         fontSize="12"
    //         fontWeight="200"
    //         stroke={seen ? 'gray' : 'black'}
    //       >
    //         {idx + 1}
    //       </text>
    //     </svg>
    //     <p className={cn(seen && 'text-gray-500', 'flex-shrink')}>{children}</p>
    //   </div>
    //   <div className="flex-shrink-0 flex gap-2 items-center">
    //     {seen ? (
    //       <CircleCheck className="text-green-500" aria-hidden="true" />
    //     ) : (
    //       <Circle className="text-gray-300" aria-hidden="true" />
    //     )}
    //   </div>
    // </div>
  );
};

export default ParticipantRow;
