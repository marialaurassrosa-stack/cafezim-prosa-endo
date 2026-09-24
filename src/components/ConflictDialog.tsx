"use client";

import { Modal } from "@/components/Modal";
import type { SessionWithAvailability } from "@/types";

interface ConflictDialogProps {
  open: boolean;
  newSession: SessionWithAvailability | null;
  conflictingSessions: SessionWithAvailability[];
  onKeepCurrent: () => void;
  onSwitch: () => void;
}

export function ConflictDialog({
  open,
  newSession,
  conflictingSessions,
  onKeepCurrent,
  onSwitch,
}: ConflictDialogProps) {
  if (!newSession) return null;

  return (
    <Modal open={open} onClose={onKeepCurrent} labelledBy="conflict-dialog-title" maxWidthClassName="max-w-md">
      <h2 id="conflict-dialog-title" className="text-lg font-bold text-ink">
        Mesmo horário, duas rodas
      </h2>
      <p className="mt-2 text-sm text-ink/70">
        Essas duas atividades acontecem no mesmo horário. Escolha qual delas deseja participar.
      </p>

      <div className="mt-4 space-y-2">
        {conflictingSessions.map((s) => (
          <div key={s.id} className="rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm">
            <p className="font-semibold text-ink">
              {s.startTime} · {s.title.replace(/\n/g, " ")}
            </p>
            <p className="text-ink/55">Já selecionada</p>
          </div>
        ))}
        <div className="rounded-xl border-2 border-purple/30 bg-white px-4 py-3 text-sm">
          <p className="font-semibold text-ink">
            {newSession.startTime} · {newSession.title.replace(/\n/g, " ")}
          </p>
          <p className="text-purple-700">Nova seleção</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
        <button
          type="button"
          onClick={onSwitch}
          className="min-h-11 flex-1 rounded-full bg-purple px-4 text-sm font-bold text-white transition-colors hover:bg-purple-dark"
        >
          Trocar por esta nova atividade
        </button>
        <button
          type="button"
          onClick={onKeepCurrent}
          className="min-h-11 flex-1 rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Manter a atual
        </button>
      </div>
    </Modal>
  );
}
