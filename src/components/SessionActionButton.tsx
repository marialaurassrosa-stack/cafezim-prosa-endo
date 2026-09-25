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
  "inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-extrabold transition-all @lg:px-6";

/**
 * The "Quero participar" CTA and its selected/sold-out/cancelled variants —
 * shared between SessionCard and SessionDetailsModal so both stay in sync.
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
    return <span className={`${base} bg-ink/5 text-ink/50 ${className}`}>Atividade cancelada</span>;
  }

  if (isSelected) {
    return (
      <button
        type="button"
        onClick={onToggleSelect}
        className={`${base} bg-purple-dark text-white active:scale-95 ${className}`}
      >
        <CheckIcon className="h-4 w-4 shrink-0" /> SELECIONADO
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
        Entrar na lista de espera <ArrowRightIcon className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggleSelect}
      className={`${base} bg-gradient-to-b from-yellow to-[#F5B400] text-purple-dark shadow-sm hover:brightness-105 active:scale-95 ${className}`}
    >
      Quero participar <ArrowRightIcon className="h-4 w-4 shrink-0" />
    </button>
  );
}
