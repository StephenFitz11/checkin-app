"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Participant } from "@prisma/client";

const WS_URL = "http://localhost:3005";

const Order = ({ data }: { data: Participant[] }) => {
  const [names, setNames] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(WS_URL, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Order: connected to number WS", socket.id);
    });

    socket.on("number", (value: number) => {
      const participant = data.find((p) => p.checkinNumber === value);
      if (participant) {
        setNames((prev) => [...prev, participant.name]);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Order: disconnected from number WS", reason);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-slate-200">Order</h1>

        {names.length > 0 ? (
          <ul className="rounded-2xl bg-slate-800/60 p-4 list-none space-y-2">
            {names.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="flex items-center gap-3 py-2 text-slate-100"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-medium tabular-nums">
                  {i + 1}
                </span>
                <span className="text-lg">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">Waiting for check-ins…</p>
        )}
      </div>
    </div>
  );
};

export default Order;
