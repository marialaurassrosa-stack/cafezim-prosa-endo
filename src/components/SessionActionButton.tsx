"use client";

import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { SessionWithAvailability } from "@/types";

interface SessionActionButtonProps {
  session: SessionWithAvailability;
  isSelected: boolean;
  onToggleSelect: () => void;
  className?: string;
}

const base =
  "inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-3 text-sm font-extrabold transition-all";

/**
 * The "Quero participar" CTA and its selected/sold-out/cancelled variants —
 * shared between SessionCard and SessionDetailsModal so both stay in sync.
 *
 * The label is wrapped in `truncate` (not left as bare text) so that if a
 * button ever ends up narrower than its label needs, the text ellipsizes on
 * one line instead of wrapping to two — a wrapped button silently grows
 * taller and, since the row's siblings stretch to match by default, drags
 * the *other* button (which fit fine) to that same taller height too.
 */
export function SessionActionButton({
  session,
  isSelected,
  onToggleSelect,
  className = "",
}: SessionActionButtonProps) {
  const cancelled = session.status === "cancelled";
  const soldOut = !cancelled && !isSelected && session.effectiveStatus === "sold_out";

  if (cancelled) {
    return (
      <span className={`${base} bg-ink/5 text-ink/50 ${className}`}>
        <span className="truncate">Atividade cancelada</span>
      </span>
    );
  }

  if (isSelected) {
    return (
      <button
        type="button"
        onClick={onToggleSelect}
        className={`${base} bg-purple-dark text-white active:scale-95 ${className}`}
      >
        <CheckIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">SELECIONADO</span>
      </button>
    );
  }

  if (soldOut) {
    return (
      <button
        type="button"
        onClick={onToggleSelect}
        className={`${base} border-2 border-purple text-purple-dark hover:bg-cream ${className}`}
      >
        <span className="truncate">Entrar na lista de espera</span>
        <ArrowRightIcon className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggleSelect}
      className={`${base} bg-gradient-to-b from-yellow to-[#F5B400] text-purple-dark shadow-sm hover:brightness-105 active:scale-95 ${className}`}
    >
      <span className="truncate">Quero participar</span>
      <ArrowRightIcon className="h-4 w-4 shrink-0" />
    </button>
  );
}
