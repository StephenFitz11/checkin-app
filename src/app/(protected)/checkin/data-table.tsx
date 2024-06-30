"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeCorral, corrals } from "../main/change-corral";
import { Button } from "@/components/ui/button";
import { checkinMain } from "@/actions/checkin-main";
import { updateCorralMain } from "@/actions/update-corral-main";
import { Participant } from "@prisma/client";
import { handleCheckin } from "@/actions/edit-checkin";
import { updateCorral } from "@/actions/update-corral";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransportType } from "./checkin-columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export type ParticipantMain = {
  id: string;
  name: string;
  corral: string;
  checkedIn: boolean;
  corralId: number;
  type: string;
  specialOrder: boolean;
};
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [participant, setParticipant] = useState<ParticipantMain>({
    id: "",
    name: "",
    corral: "",
    checkedIn: false,
    corralId: 0,
    type: "",
    specialOrder: false,
  });
  const [open, setOpen] = useState(false);

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState({
    nameColumn: true,
    corralColumn: true, //hide this column by default
    idColumn: false,
    typeColumn: true,
    checkedInColumn: true,
    corralIdColumn: false,
    specialOrderColumn: false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
    },
    // onColumnVisibilityChange: setColumnVisibility,
  });

  const handleChangeCorral = async (value: string) => {
    // setCorralValue(value);
    await updateCorralMain(participant, value);
    setOpen(false);
  };

  const typeMap: { [key: string]: string } = {
    vehicleTrailer: "Vehicle + Trailer 🚚",
    vehicle: "Vehicle 🚙",
    walkingGroup: "Walking Group 🚶‍♂️",
    bus: "Bus 🚌",
  };

  const returnType = (type: TransportType): string => {
    if (type in typeMap) {
      return typeMap[type as TransportType];
    }
    return "Unknown ❓";
  };

  return (
    <>
      <div className="rounded-md border h-full flex flex-col">
        <div className="flex flex-col p-4">
          <label
            htmlFor="email-address"
            className="block text-left text-base font-medium mb-2 "
          >
            All Floats
          </label>
          <input
            type="text"
            className="w-full p-2 text-black border-2 border-transparent bg-white rounded-md outline-none transition duration-2000 focus:border-transparent animate-rainbow"
            placeholder="Search floats"
            value={
              (table.getColumn("nameColumn")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("nameColumn")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="flex w-full justify-between px-4  font-semibold text-gray-700 border-b py-4 text-sm">
          <div>
            <p>Name</p>
          </div>
          <div className="flex gap-4">
            <p>Type</p>
            <p>Corral</p>
            <p>Checkin</p>
          </div>
        </div>
        <Table className="h-full">
          {/* <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader> */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setParticipant({
                      id: row.getValue("idColumn"),
                      name: row.getValue("nameColumn"),
                      corral: row.getValue("corralColumn"),
                      checkedIn: row.getValue("checkedInColumn"),
                      corralId: row.getValue("corralIdColumn"),
                      type: returnType(row.getValue("typeColumn")),
                      specialOrder: row.getValue("specialOrderColumn"),
                    });
                    setOpen(true);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            {/* </ScrollArea> */}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3/4 ">
          <DialogHeader>
            <DialogTitle>Checkin</DialogTitle>
            <DialogDescription className="mt-4">
              Use this to checkin the participant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Name: </p>
              <p>{participant?.name}</p>
              {/* <p>{corrals.find((c) => c.id === participant?.coralId)?.name}</p> */}
            </div>
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Corral: </p>
              <p>{participant.corral}</p>
            </div>
            <div className=" items-center gap-4 flex space-x-4 ">
              <p>Type: </p>
              <p>{participant.type}</p>
            </div>
            {participant.specialOrder && (
              <div className=" items-center gap-4 flex space-x-4 ">
                <p>Special Order: </p>
                <p>{participant.specialOrder}</p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-3">
            <ChangeCorral
              corralValue={String(participant?.corralId)}
              handleChangeCorral={handleChangeCorral}
            />
            {participant?.checkedIn && (
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  await checkinMain(participant, false);
                  // await handleCheckin(participant, false);
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                Undo Checkin
              </Button>
            )}

            {!participant?.checkedIn && (
              <Button
                type="button"
                onClick={async () => {
                  await checkinMain(participant, true);
                  setOpen(false);
                }}
              >
                Checkin
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
