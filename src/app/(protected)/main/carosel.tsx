"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReorderableTable from "./drop-drag";
import { CorralWithParticipants } from "@/types/types";
import { useState } from "react";

const CaroselComp = ({ corrals }: { corrals: CorralWithParticipants[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  return (
    <Carousel className="w-4/5">
      <CarouselContent>
        {corrals.map((corral, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <span className="text-4xl py-4 font-semibold">
                  {corral.name}
                </span>

                <div className="cursor-pointer border px-4 py-4 flex justify-between gap-6 text-center rounded w-full ">
                  <div className="flex gap-8">
                    <div className="">#</div>
                    <div className="">Name</div>
                  </div>
                  <div className="">Status</div>
                </div>
                <ScrollArea className="flex-1 overflow-y-auto rounded-md border w-full flex">
                  <ReorderableTable participants={corral.Participant} />
                </ScrollArea>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CaroselComp;
