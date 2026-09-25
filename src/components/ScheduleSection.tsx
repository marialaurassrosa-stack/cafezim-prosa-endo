"use client";

import { SessionCard } from "@/components/SessionCard";
import type { SessionWithAvailability } from "@/types";

interface ScheduleSectionProps {
  sessions: SessionWithAvailability[];
  selectedIds: Set<string>;
  onToggleSelect: (session: SessionWithAvailability) => void;
  onShowDetails: (session: SessionWithAvailability) => void;
}

export function ScheduleSection({
  sessions,
  selectedIds,
  onToggleSelect,
  onShowDetails,
}: ScheduleSectionProps) {
  if (sessions.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-ink/15 bg-cream px-6 py-10 text-center text-ink/60">
        A programação deste dia será divulgada em breve.
      </p>
    );
  }

  return (
    // items-start impede que um card mais curto "estique" até a altura do
    // maior da linha — cada card mantém sua própria altura (height: auto).
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isSelected={selectedIds.has(session.id)}
          onToggleSelect={() => onToggleSelect(session)}
          onShowDetails={() => onShowDetails(session)}
        />
      ))}
    </div>
  );
}
