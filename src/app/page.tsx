import Image from "next/image";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import MotionDiv from "@/components/motion-div";
import { DataTable } from "./data-table";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export default async function Home() {
  const participants = await prisma.participant.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MotionDiv>
        <div className="w-auto bg-white rounded">
          <Card className="w-auto">
            <CardHeader className="flex">
              <CardTitle>All Participants</CardTitle>
              <CardDescription>
                Manage all participants in the event
              </CardDescription>
              <Link href="/add">
                <Button>Add Participant</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={participants} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </MotionDiv>
    </main>
  );
}
