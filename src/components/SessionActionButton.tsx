"use client";

import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { SessionWithAvailability } from "@/types";

interface SessionActionButtonProps {
  session: SessionWithAvailability;
  isSelected: boolean;
  onToggleSelect: () => void;
  className?: string;
  /**
   * "default" (the card/modal's usual full-width, split-with-sibling button)
   * or "compact" (sized to its own content, for the mobile card's slimmer
   * action row — see SessionCard.tsx). Defaults to "default" so every
   * existing call site (desktop card, modal) is unaffected.
   */
  size?: "default" | "compact";
}

const sizeClasses: Record<"default" | "compact", string> = {
  default: "min-h-12 flex-1 gap-1.5 px-3 py-3 text-sm",
  compact: "min-h-9 flex-none gap-1 px-4 py-2 text-xs",
};

const iconSizeClasses: Record<"default" | "compact", string> = {
  default: "h-4 w-4",
  compact: "h-3.5 w-3.5",
};

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
  size = "default",
}: SessionActionButtonProps) {
  const cancelled = session.status === "cancelled";
  const soldOut = !cancelled && !isSelected && session.effectiveStatus === "sold_out";
  const base = `inline-flex min-w-0 items-center justify-center rounded-full font-extrabold transition-all ${sizeClasses[size]}`;
  const iconClass = `${iconSizeClasses[size]} shrink-0`;

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
        <CheckIcon className={iconClass} />
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
        <ArrowRightIcon className={iconClass} />
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
      <ArrowRightIcon className={iconClass} />
    </button>
  );
}
