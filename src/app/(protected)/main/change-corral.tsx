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

const corrals = [
  { id: 1, name: "Corral A" },
  { id: 2, name: "Corral B" },
  { id: 3, name: "Corral C" },
  { id: 4, name: "Corral D" },
];

const handleChangeSelect = (value: string) => {
  console.log(value);
};

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
      <SelectTrigger className="w-1/2">
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
