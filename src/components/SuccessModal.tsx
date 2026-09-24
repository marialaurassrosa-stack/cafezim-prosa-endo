"use client";

import { Modal } from "@/components/Modal";
import { CalendarIcon, MapPinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { buildIcsCalendar, downloadIcsFile, hasSchedulableSessions } from "@/lib/ics";
import type { RegistrationResultItem, SessionWithAvailability } from "@/types";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  results: RegistrationResultItem[];
  sessions: SessionWithAvailability[];
}

function statusOf(results: RegistrationResultItem[], sessionId: string) {
  return results.find((r) => r.sessionId === sessionId)?.status;
}

export function SuccessModal({ open, onClose, results, sessions }: SuccessModalProps) {
  const succeeded = sessions
    .filter((s) => statusOf(results, s.id) === "confirmed" || statusOf(results, s.id) === "waitlist")
    .sort((a, b) =>
      a.dayId === b.dayId ? a.startTime.localeCompare(b.startTime) : a.dayId.localeCompare(b.dayId)
    );
  const notConfirmed = sessions.filter((s) => {
    const status = statusOf(results, s.id);
    return status === "duplicate" || status === "error";
  });
  const confirmed = sessions.filter((s) => statusOf(results, s.id) === "confirmed");
  const canAddToCalendar = hasSchedulableSessions(confirmed);
  const hasSucceeded = succeeded.length > 0;

  function handleAddToCalendar() {
    const ics = buildIcsCalendar(confirmed, `${siteConfig.standName} · ${siteConfig.eventName}`);
    downloadIcsFile(ics, "cafezim-prosa-endo.ics");
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="success-modal-title" maxWidthClassName="max-w-xl">
      <div className="text-center">
        <p className="text-5xl" aria-hidden="true">
          {hasSucceeded ? "☕💜" : "☕"}
        </p>
        <h2 id="success-modal-title" className="mt-3 text-2xl font-extrabold text-ink">
          {hasSucceeded ? "Cafezim marcado!" : "Você já tinha esse cafezim marcado"}
        </h2>
        <p className="mt-2 text-ink/70">
          {hasSucceeded
            ? "Sua programação no COBE está confirmada."
            : "Não encontramos nenhuma vaga nova para reservar agora."}
        </p>
      </div>

      {succeeded.length > 0 && (
        <div className="mt-6 space-y-3">
          {succeeded.map((s) => {
            const status = statusOf(results, s.id);
            return (
              <div key={s.id} className="rounded-2xl border border-ink/10 bg-cream px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold tracking-wide text-purple-700 uppercase">
                    {s.day.label} • {s.startTime}
                  </p>
                  {status === "waitlist" && (
                    <span className="rounded-full bg-yellow/25 px-2.5 py-0.5 text-[11px] font-bold text-ink uppercase">
                      Lista de espera
                    </span>
                  )}
                </div>
                <p className="mt-1 font-semibold text-ink">{s.title.replace(/\n/g, " ")}</p>
                <p className="text-sm text-ink/60">{s.speaker.name}</p>
              </div>
            );
          })}
        </div>
      )}

      {notConfirmed.length > 0 && (
        <div className="mt-4 space-y-2 rounded-2xl bg-ink/5 p-4">
          <p className="text-sm font-semibold text-ink">Sem novidade nestas atividades:</p>
          {notConfirmed.map((s) => {
            const result = results.find((r) => r.sessionId === s.id);
            const message =
              result?.status === "duplicate"
                ? "Você já está inscrito nesta atividade."
                : (result?.message ?? "Não foi possível confirmar esta atividade.");
            return (
              <p key={s.id} className="text-sm text-ink/60">
                <span className="font-semibold text-ink">
                  {s.day.label} · {s.startTime} — {s.title.replace(/\n/g, " ")}:
                </span>{" "}
                {message}
              </p>
            );
          })}
        </div>
      )}

      {hasSucceeded && (
        <div className="mt-5 flex items-center gap-2 text-sm text-ink/70">
          <MapPinIcon className="h-5 w-5 shrink-0 text-purple-700" />
          Local: {siteConfig.standName} — {siteConfig.eventName}, {siteConfig.city}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        {!hasSucceeded ? null : canAddToCalendar ? (
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border-2 border-purple px-4 text-sm font-bold text-purple-700 transition-colors hover:bg-cream"
          >
            <CalendarIcon className="h-4 w-4" /> Adicionar à agenda
          </button>
        ) : (
          <p className="flex-1 rounded-full bg-cream px-4 py-2.5 text-center text-xs text-ink/55">
            Você poderá adicionar à agenda quando as datas forem divulgadas.
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 flex-1 rounded-full bg-purple px-4 text-sm font-bold text-white transition-colors hover:bg-purple-dark"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
}
