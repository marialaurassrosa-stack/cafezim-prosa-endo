"use client";

import { CoffeeCupIcon } from "@/components/icons";

interface SelectedScheduleBarProps {
  count: number;
  onViewSchedule: () => void;
  onFinish: () => void;
}

export function SelectedScheduleBar({ count, onViewSchedule, onFinish }: SelectedScheduleBarProps) {
  if (count === 0) return null;

  return (
    <div className="animate-fade-up fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-ink">
          <CoffeeCupIcon className="h-6 w-6 shrink-0 text-purple-700" />
          <div>
            <p className="text-sm leading-tight font-bold">Minha programação</p>
            <p className="text-xs text-ink/60">
              {count} {count === 1 ? "encontro selecionado" : "encontros selecionados"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onViewSchedule}
            className="min-h-11 flex-1 rounded-full border-2 border-purple px-4 text-sm font-bold text-purple-700 transition-colors hover:bg-cream sm:flex-none"
          >
            Ver minha programação
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="min-h-11 flex-1 rounded-full bg-yellow px-4 text-sm font-bold text-ink shadow-sm transition-transform hover:brightness-95 active:scale-95 sm:flex-none"
          >
            Finalizar inscrição
          </button>
        </div>
      </div>
    </div>
  );
}
