"use client";

import { Participant } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const checkinColums: ColumnDef<Participant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contactPhone",
    header: "Contact",
  },
  {
    accessorKey: "Status",
    header: "Amount",
  },
];
