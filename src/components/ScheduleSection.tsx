"use client";

import { SessionCard } from "@/components/SessionCard";
import type { SessionWithAvailability } from "@/types";

interface ScheduleSectionProps {
  sessions: SessionWithAvailability[];
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggleExpand: (sessionId: string) => void;
  onToggleSelect: (session: SessionWithAvailability) => void;
}

export function ScheduleSection({
  sessions,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onToggleSelect,
}: ScheduleSectionProps) {
  if (sessions.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-ink/15 bg-cream px-6 py-10 text-center text-ink/60">
        A programação deste dia será divulgada em breve.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isSelected={selectedIds.has(session.id)}
          expanded={expandedIds.has(session.id)}
          onToggleExpand={() => onToggleExpand(session.id)}
          onToggleSelect={() => onToggleSelect(session)}
        />
      ))}
    </div>
  );
}
