import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "text-green-500" : ""} py-10 bg-green-400`}
    >
      {children}
    </div>
  );
}
