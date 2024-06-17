import * as React from "react";
import prisma from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReorderableTable from "./drop-drag";

const getCorrals = async () => {
  const coralsWithParticipants = await prisma.coral.findMany({
    include: {
      Participant: {
        orderBy: {
          paradeOrder: "asc",
        },
      },
    },
  });
  return coralsWithParticipants;
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { tab: string };
}) {
  const corrals = await getCorrals();
  return (
    <div className="h-dvh w-screen flex flex-row items-center justify-center">
      <Carousel
        className="w-4/5"
        opts={{
          startIndex: searchParams?.tab ? parseInt(searchParams.tab) : 0,
        }}
      >
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
    </div>
  );
}
