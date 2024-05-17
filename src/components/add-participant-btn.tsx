"use client";
import React from "react";
import { Button } from "./ui/button";
import { addParticipant } from "@/actions/add-participant";

const AddParticpantButton = () => {
  return <Button onClick={() => addParticipant()}>Add Participant</Button>;
};

export default AddParticpantButton;
