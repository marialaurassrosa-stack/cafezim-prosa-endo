"use client";

import { Modal } from "@/components/Modal";
import { MAX_SESSIONS_PER_PARTICIPANT } from "@/config/site";

interface LimitDialogProps {
  open: boolean;
  onClose: () => void;
  onViewSchedule: () => void;
}

export function LimitDialog({ open, onClose, onViewSchedule }: LimitDialogProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="limit-dialog-title" maxWidthClassName="max-w-md">
      <h2 id="limit-dialog-title" className="text-lg font-bold text-ink">
        Você já escolheu {MAX_SESSIONS_PER_PARTICIPANT} rodas
      </h2>
      <p className="mt-2 text-sm text-ink/70">
        Cada pessoa pode participar de até {MAX_SESSIONS_PER_PARTICIPANT} rodas. Para escolher outra, remova uma das
        suas escolhas em &ldquo;Ver minha programação&rdquo;.
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
        <button
          type="button"
          onClick={onViewSchedule}
          className="min-h-11 flex-1 rounded-full bg-purple px-4 text-sm font-bold text-white transition-colors hover:bg-purple-dark"
        >
          Ver minha programação
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 flex-1 rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Entendi
        </button>
      </div>
    </Modal>
  );
}
