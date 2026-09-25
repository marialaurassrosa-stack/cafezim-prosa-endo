"use client";

import { Avatar } from "@/components/Avatar";
import { XIcon } from "@/components/icons";
import { Modal } from "@/components/Modal";
import type { SessionWithAvailability, Speaker } from "@/types";

interface SpeakerModalProps {
  speaker: Speaker | null;
  sessions: SessionWithAvailability[];
  onClose: () => void;
}

export function SpeakerModal({ speaker, sessions, onClose }: SpeakerModalProps) {
  if (!speaker) return null;

  return (
    <Modal open={Boolean(speaker)} onClose={onClose} labelledBy="speaker-modal-title" maxWidthClassName="max-w-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={speaker.name} photoUrl={speaker.avatarUrl ?? speaker.photoUrl} size={72} />
          <div>
            <h2 id="speaker-modal-title" className="text-lg font-bold text-ink">
              {speaker.name}
            </h2>
            <p className="text-sm text-ink/55">{speaker.credentials}</p>
            <p className="text-sm text-ink/55">{speaker.institution}</p>
          </div>
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

      <p className="mt-5 text-sm text-ink/70">{speaker.bio}</p>

      {sessions.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-ink">Atividades no Cafezim</p>
          <div className="mt-2 space-y-2">
            {sessions.map((s) => (
              <div key={s.id} className="rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm">
                <p className="font-semibold text-ink">
                  {s.day.label} · {s.startTime} — {s.title.replace(/\n/g, " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
