import React from "react";
// import { motion } from "framer-motion";
import { PrismaClient } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MotionDiv from "@/components/motion-div";

const Page = async () => {
  const prisma = new PrismaClient();
  const corals = await prisma.coral.findMany();
  console.log(corals);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MotionDiv>
        <div className="w-auto bg-white rounded">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add a Particpant</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Participant name" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {corals.map((coral) => (
                          <SelectItem key={coral.id} value={coral.name}>
                            {coral.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </MotionDiv>
    </main>
  );
};

export default Page;
