"use client";

import { formatDayDate } from "@/data/days";
import type { DayConfig, DayId } from "@/types";

interface DaySelectorProps {
  days: DayConfig[];
  activeDayId: DayId;
  onSelect: (dayId: DayId) => void;
}

export function DaySelector({ days, activeDayId, onSelect }: DaySelectorProps) {
  return (
    <div role="tablist" aria-label="Escolha o dia" className="grid grid-cols-3 gap-2 sm:gap-4">
      {days.map((day) => {
        const active = day.id === activeDayId;
        return (
          <button
            key={day.id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(day.id)}
            className={`min-h-[72px] rounded-2xl border px-2 py-3 text-center transition-all duration-200 sm:min-h-[92px] sm:px-4 sm:py-5 ${
              active
                ? "border-purple bg-purple text-white shadow-lg shadow-purple/20 scale-[1.02]"
                : "border-ink/10 bg-white text-ink hover:border-purple/40 hover:bg-cream"
            }`}
          >
            <span className="block text-sm font-bold tracking-wide sm:text-base">{day.label}</span>
            <span
              className={`mt-1 block text-xs sm:text-sm ${active ? "text-white/85" : "text-ink/55"}`}
            >
              {formatDayDate(day.date)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
