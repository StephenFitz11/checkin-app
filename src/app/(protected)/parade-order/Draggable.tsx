import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none z-10"
    >
      {children}
    </button>
  );
}
