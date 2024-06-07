"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ParticipantWithCorral } from "@/types/types";

// Updated initialItems to be an array of objects
const initialItems = [
  { id: "1", text: "Row 1" },
  { id: "2", text: "Row 2" },
  { id: "3", text: "Row 3" },
];

interface Item {
  id: string;
  text: string;
}

// Updated SortableItem to accept an Item object
function SortableItem({ item }: { item: ParticipantWithCorral }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-pointer"
    >
      <td className="border px-4 py-2">{item.name}</td>
    </tr>
  );
}

const ReorderableTable = ({
  participants,
}: {
  participants: ParticipantWithCorral[];
}) => {
  const [items, setItems] = useState<ParticipantWithCorral[]>(participants);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Row</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
};

export default ReorderableTable;
