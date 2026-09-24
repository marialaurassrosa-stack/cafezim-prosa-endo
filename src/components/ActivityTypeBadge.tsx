import { ACTIVITY_TYPE_LABELS, type ActivityType } from "@/types";

const STYLES: Record<ActivityType, string> = {
  roda_de_conversa: "bg-cream-2 text-purple-800 border border-purple/25",
  hands_on: "bg-yellow/15 text-ink border border-yellow",
  demonstracao: "bg-ink/5 text-ink border border-ink/20",
  caso_clinico: "bg-red/10 text-red border border-red/30",
  roda_hands_on: "bg-white text-purple-700 border-2 border-dashed border-purple/50",
};

export function ActivityTypeBadge({
  type,
  className = "",
}: {
  type: ActivityType;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap ${STYLES[type]} ${className}`}
    >
      {ACTIVITY_TYPE_LABELS[type]}
    </span>
  );
}
