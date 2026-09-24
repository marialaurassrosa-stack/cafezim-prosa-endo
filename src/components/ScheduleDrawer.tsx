"use client";

import { Modal } from "@/components/Modal";
import { XIcon } from "@/components/icons";
import { formatDayDate } from "@/data/days";
import type { DayConfig, SessionWithAvailability } from "@/types";

interface ScheduleDrawerProps {
  open: boolean;
  onClose: () => void;
  days: DayConfig[];
  selectedSessions: SessionWithAvailability[];
  onRemove: (sessionId: string) => void;
  onCheckout: () => void;
}

export function ScheduleDrawer({
  open,
  onClose,
  days,
  selectedSessions,
  onRemove,
  onCheckout,
}: ScheduleDrawerProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="schedule-drawer-title" maxWidthClassName="max-w-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="schedule-drawer-title" className="text-xl font-bold text-ink">
            Sua programação no Cafezim
          </h2>
          <p className="mt-1 text-sm text-ink/60">Revise, remova ou confirme suas rodas escolhidas.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="shrink-0 rounded-full p-2 text-ink/50 hover:bg-cream hover:text-ink"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {selectedSessions.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-cream px-4 py-8 text-center text-sm text-ink/60">
          Você ainda não selecionou nenhuma atividade.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {days.map((day) => {
            const daySessions = selectedSessions
              .filter((s) => s.dayId === day.id)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (daySessions.length === 0) return null;
            return (
              <div key={day.id}>
                <p className="text-xs font-bold tracking-wide text-purple-700 uppercase">
                  {day.label} · {formatDayDate(day.date)}
                </p>
                <div className="mt-2 space-y-2">
                  {daySessions.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">
                          {s.startTime} · {s.title.replace(/\n/g, " ")}
                        </p>
                        <p className="text-xs text-ink/55">{s.speaker.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(s.id)}
                        className="shrink-0 rounded-full px-2 py-1 text-xs font-bold tracking-wide text-red uppercase hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={onCheckout}
        disabled={selectedSessions.length === 0}
        className="mt-8 min-h-12 w-full rounded-full bg-purple px-6 text-sm font-bold text-white transition-colors hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Garantir minhas vagas
      </button>
    </Modal>
  );
}
