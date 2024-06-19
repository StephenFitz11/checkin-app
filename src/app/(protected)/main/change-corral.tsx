"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Participant } from "@prisma/client";
import { useState } from "react";

export const corrals = [
  { id: 1, name: "Corral A", letter: "A" },
  { id: 2, name: "Corral B", letter: "B" },
  { id: 3, name: "Corral C", letter: "C" },
  { id: 4, name: "Corral D", letter: "D" },
];

export function ChangeCorral({
  corralValue,
  handleChangeCorral,
}: {
  corralValue: string;
  handleChangeCorral: (value: string) => void;
}) {
  return (
    <Select
      value={corralValue}
      onValueChange={(value) => handleChangeCorral(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Change Corral" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Corrals</SelectLabel>
          {corrals.map((corral) => (
            <SelectItem key={corral.id} value={String(corral.id)}>
              {corral.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
