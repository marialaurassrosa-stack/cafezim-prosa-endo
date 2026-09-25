"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { SessionActionButton } from "@/components/SessionActionButton";
import { CalendarIcon, ClockIcon, GroupIcon, XIcon } from "@/components/icons";
import { formatCardDateBadge } from "@/data/days";
import { availableSeatsLabel, formatDuration } from "@/lib/format";
import type { SessionWithAvailability } from "@/types";

interface SessionDetailsModalProps {
  session: SessionWithAvailability | null;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClose: () => void;
}

/**
 * Native <dialog> so we get focus trapping, ESC-to-close and a real
 * ::backdrop for free — see the `backdrop:` classes below. Kept as a single
 * shared instance (rendered once in ScheduleExperience) rather than one per
 * card, so opening details never fights the card's own width for space.
 */
export function SessionDetailsModal({
  session,
  isSelected,
  onToggleSelect,
  onClose,
}: SessionDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (session && !dialog.open) {
      dialog.showModal();
    } else if (!session && dialog.open) {
      dialog.close();
    }
  }, [session]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Fires on ESC (native) and on our own dialog.close() calls, so this is
    // the single source of truth for "the dialog just closed".
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function handleDialogClick(e: MouseEvent<HTMLDialogElement>) {
    // The <dialog> element's own box only covers its content; a click that
    // lands on the backdrop still targets the dialog itself.
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      aria-labelledby="session-details-title"
      className="m-auto w-[calc(100%-2rem)] max-w-[680px] rounded-[28px] border border-purple/10 bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      {session && (
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream-2 px-4 py-2 text-sm font-extrabold text-purple-dark">
              <CalendarIcon className="h-4 w-4" />
              {formatCardDateBadge(session.day, session.startTime)}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="shrink-0 rounded-full p-2 text-ink/50 hover:bg-cream hover:text-ink"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <h2
            id="session-details-title"
            className="mt-4 text-2xl leading-snug font-extrabold whitespace-pre-line text-purple-dark"
          >
            {session.title}
          </h2>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-6 w-1 shrink-0 rounded-full bg-purple" aria-hidden="true" />
            <p className="text-lg font-bold text-purple-dark">{session.speaker.name}</p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              {formatDuration(session.durationMinutes)}
            </span>
            <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
            <span
              className={`inline-flex items-center gap-1.5 ${session.availableSeats <= 0 ? "font-semibold text-red" : ""}`}
            >
              <GroupIcon className="h-4 w-4" />
              {availableSeatsLabel(session.availableSeats)}
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-cream p-4 sm:p-5">
            <p className="text-sm font-bold text-purple-dark">O que vamos prosear?</p>
            <p className="mt-1.5 text-sm text-ink/70">{session.fullDescription}</p>
            {session.highlights.length > 0 && (
              <>
                <p className="mt-3 text-sm font-bold text-purple-dark">Você vai ver:</p>
                <ul className="mt-1.5 space-y-1.5 text-sm text-ink/70">
                  {session.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow"
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-6">
            <SessionActionButton
              session={session}
              isSelected={isSelected}
              onToggleSelect={onToggleSelect}
              className="w-full"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
