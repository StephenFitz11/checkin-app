"use client";

import { Participant } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, CircleCheck } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type TransportType =
  | "walkingGroup"
  | "vehicle"
  | "bus"
  | "vehicleTrailer";

export const typeMap = {
  walkingGroup: "🚶‍♂️",
  vehicle: "🚙",
  bus: "🚌",
  vehicleTrailer: "🚚",
};

const returnEmoji = (type: TransportType): string | undefined => {
  if (type in typeMap) {
    return typeMap[type as TransportType];
  }
  return "❓";
};

export const checkinColums: ColumnDef<Participant>[] = [
  {
    id: "nameColumn",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "typeColumn",
    accessorKey: "type",
    header: "Name",
    cell: ({ row }) => returnEmoji(row.getValue("typeColumn")),
  },
  {
    id: "corralColumn",
    accessorKey: "Coral.name",
    header: "Corral",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 ">
        <span className="text-sm text-gray-500">Corral</span>
        <span className="text-sm text-gray-900">
          {row.getValue("corralColumn")}
        </span>
      </div>
    ),
  },
  {
    id: "idColumn",
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "corralIdColumn",
    accessorKey: "Coral.id",
    header: "Corral Id",
  },
  {
    id: "checkedInColumn",
    accessorKey: "checkedIn",
    header: "Checkin",
    cell: ({ row }) => (
      <>
        {row.getValue("checkedInColumn") ? (
          <CircleCheck className="text-green-500" aria-hidden="true" />
        ) : (
          <Circle className="text-gray-300" aria-hidden="true" />
        )}
      </>
    ),
  },
];
