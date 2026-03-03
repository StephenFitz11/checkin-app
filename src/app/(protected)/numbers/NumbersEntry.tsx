"use client";

import { useState } from "react";
import { Participant } from "@prisma/client";

export default function NumbersPage({ data }: { data: Participant[] }) {
  const [value, setValue] = useState("");
  const [matchedParticipant, setMatchedParticipant] = useState<Participant | null>(null);

  const updateMatchedParticipant = (rawValue: string) => {
    if (!rawValue) {
      setMatchedParticipant(null);
      return;
    }

    const numericValue = parseInt(rawValue, 10);

    if (Number.isNaN(numericValue)) {
      setMatchedParticipant(null);
      return;
    }

    const found = (data as any[]).find(
      (participant) => participant.checkinNumber === numericValue,
    ) as Participant | undefined;

    setMatchedParticipant(found ?? null);
  };

  const handleDigit = (digit: string) => {
    setValue((prev) => {
      const next = prev.length >= 12 ? prev : prev + digit;
      updateMatchedParticipant(next);
      return next;
    });
  };

  const handleClear = () => {
    setValue("");
    updateMatchedParticipant("");
  };

  const handleSubmit = () => {
    setValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="mx-auto flex h-[100dvh] max-w-md flex-col px-4 py-5 sm:h-auto sm:py-10">
        <div className="flex flex-1 flex-col justify-between rounded-3xl bg-slate-900/70 backdrop-blur-xl shadow-2xl p-5 sm:p-6 gap-4">
          {/* Centered participant name */}
          <div className="flex flex-1 items-center justify-center px-2 text-center">
            {matchedParticipant && (
              <span className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
                {matchedParticipant.name}
              </span>
            )}
          </div>

          {/* Number display + Keypad */}
          <div className="flex flex-col gap-3">
            <div className="bg-slate-900/80 text-white rounded-2xl px-4 py-6 sm:py-7 flex items-end justify-end shadow-inner w-full">
              <span className="text-3xl sm:text-4xl font-mono tabular-nums break-all text-right w-full tracking-wide">
                {value || "0"}
              </span>
            </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mt-1 pb-1">
            {[
              { label: "1", type: "digit" },
              { label: "2", type: "digit" },
              { label: "3", type: "digit" },
              { label: "4", type: "digit" },
              { label: "5", type: "digit" },
              { label: "6", type: "digit" },
              { label: "7", type: "digit" },
              { label: "8", type: "digit" },
              { label: "9", type: "digit" },
              { label: "Clear", type: "clear" },
              { label: "0", type: "digit" },
              { label: "Submit", type: "submit" },
            ].map((key) => {
              const baseClasses =
                "aspect-[1.2/1] rounded-2xl flex items-center justify-center text-lg sm:text-xl font-semibold select-none touch-manipulation shadow-md active:scale-[0.97] transition-transform duration-75";

              if (key.type === "digit") {
                return (
                  <button
                    key={key.label}
                    type="button"
                    onClick={() => handleDigit(key.label)}
                    className={`${baseClasses} bg-slate-800/80 text-slate-100 active:bg-slate-700`}
                  >
                    {key.label}
                  </button>
                );
              }

              if (key.type === "clear") {
                return (
                  <button
                    key={key.label}
                    type="button"
                    aria-label="Clear"
                    onClick={handleClear}
                    className={`${baseClasses} bg-slate-700/90 text-slate-100 active:bg-slate-600`}
                  >
                    {key.label}
                  </button>
                );
              }

              return (
                <button
                  key={key.label}
                  type="button"
                  onClick={handleSubmit}
                  className={`${baseClasses} bg-blue-500 text-white active:bg-blue-600`}
                >
                  {key.label}
                </button>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
