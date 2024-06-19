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
// import { useSearchParams } from "next/navigation";
import { MoveLeft, MoveRight } from "lucide-react";

const CaroselComp = ({ corrals }: { corrals: CorralWithParticipants[] }) => {
  // const searchParams = useSearchParams();
  const [api, setApi] = useState<CarouselApi>();
  return (
    <>
      {/* <button className="" onClick={() => api?.scrollPrev()}>
        Prev
      </button> */}

      <Carousel
        setApi={setApi}
        className="w-full h-full"
        // opts={{
        //   startIndex:
        //     Number(searchParams?.get("tab") ? searchParams?.get("tab") : 0) - 1,
        // }}
      >
        <CarouselContent>
          {corrals.map((corral, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <span className="text-2xl py-2 font-semibold">
                    {corral.name}
                  </span>

                  <div className="cursor-pointer border px-4 py-4 flex justify-between gap-6 text-center rounded w-full ">
                    <div className="flex gap-8">
                      <div className="">#</div>
                      <div className="">Name</div>
                    </div>
                    <div className="">Status</div>
                  </div>
                  <ScrollArea className="flex-1 h-full overflow-y-auto rounded-md border w-full flex">
                    <ReorderableTable participants={corral.Participant} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="flex fixed bottom-0 left-0 w-full bg-blue-500 text-white p-4">
        <button
          type="button"
          className="flex-1 border-r border-white inline-flex justify-center"
          onClick={() => api?.scrollPrev()}
        >
          <MoveLeft />
        </button>
        <button
          type="button"
          className="flex-1 inline-flex justify-center"
          onClick={() => api?.scrollNext()}
        >
          <MoveRight />
        </button>
      </div>
    </>
  );
};

export default CaroselComp;
