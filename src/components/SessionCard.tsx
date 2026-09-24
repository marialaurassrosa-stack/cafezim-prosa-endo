"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  GroupIcon,
  PersonSilhouetteIcon,
} from "@/components/icons";
import { formatCardDateBadge } from "@/data/days";
import { availableSeatsLabel, formatDuration } from "@/lib/format";
import type { SessionWithAvailability } from "@/types";

interface SessionCardProps {
  session: SessionWithAvailability;
  isSelected: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleSelect: () => void;
}

const buttonBase =
  "inline-flex min-h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 @lg:px-6 py-3.5 text-sm font-extrabold transition-all";

export function SessionCard({
  session,
  isSelected,
  expanded,
  onToggleExpand,
  onToggleSelect,
}: SessionCardProps) {
  const cancelled = session.status === "cancelled";
  const soldOut = !cancelled && !isSelected && session.effectiveStatus === "sold_out";
  const { speaker } = session;

  return (
    <article
      className={`animate-fade-up @container relative overflow-hidden rounded-[32px] border border-purple/10 bg-white shadow-sm transition-shadow ${
        cancelled ? "opacity-60" : "hover:shadow-xl hover:shadow-purple/10"
      }`}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 z-0 h-56 w-56 rounded-full bg-cream-2 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-1/2 z-0 h-40 w-40 rounded-full bg-purple/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Layout responde à largura do próprio card (container query), não à
          da viewport — importante porque o card fica bem mais estreito
          quando a grade mostra 2 por linha. */}
      <div className="relative flex flex-col @lg:flex-row">
        {/* Foto do professor — ocupa todo o canto esquerdo. Espaço pronto
            para receber a foto oficial via speaker.photoUrl (src/data/speakers.ts).
            As fotos já vêm com cantos arredondados e fundo roxo prontos da
            Biodental, por isso usamos object-contain sobre fundo branco em
            vez de recortar (object-cover cortaria o próprio card da foto). */}
        <div className="relative z-10 h-52 shrink-0 bg-white p-3 @lg:h-auto @lg:w-[38%] @lg:max-w-[300px] @lg:p-4">
          {speaker.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- foto de professor com recorte próprio, sem next/image
            <img
              src={speaker.photoUrl}
              alt={speaker.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-purple">
              <PersonSilhouetteIcon className="h-20 w-20 text-white/20" />
            </div>
          )}
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4 p-5 @lg:p-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-2 px-4 py-2 text-sm font-extrabold text-purple-dark">
            <CalendarIcon className="h-4 w-4" />
            {formatCardDateBadge(session.day, session.startTime)}
          </span>

          <h3 className="w-fit rounded-2xl bg-cream-2 px-5 py-4 text-xl leading-snug font-extrabold whitespace-pre-line text-purple-dark @lg:text-2xl">
            {session.title}
          </h3>

          <div className="flex items-center gap-3">
            <span className="h-6 w-1 shrink-0 rounded-full bg-purple" aria-hidden="true" />
            <p className="text-base font-bold text-purple-dark @lg:text-lg">{speaker.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              {formatDuration(session.durationMinutes)}
            </span>
            <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
            <span
              className={`inline-flex items-center gap-1.5 ${session.availableSeats <= 0 ? "font-semibold text-red" : ""}`}
            >
              <GroupIcon className="h-4 w-4" />
              {cancelled ? "—" : availableSeatsLabel(session.availableSeats)}
            </span>
          </div>

          {expanded && (
            <div className="animate-fade-up rounded-2xl bg-cream p-4">
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
          )}

          <div className="mt-auto flex flex-col gap-3 pt-2 @lg:flex-row">
            <button
              type="button"
              onClick={onToggleExpand}
              aria-expanded={expanded}
              className={`${buttonBase} border border-purple/15 bg-white text-purple-dark hover:border-purple/40`}
            >
              <span className="truncate">{expanded ? "Ver menos" : "Ver detalhes"}</span>
              <ChevronDownIcon
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            {cancelled ? (
              <span className={`${buttonBase} bg-ink/5 text-ink/50`}>
                <span className="truncate">Atividade cancelada</span>
              </span>
            ) : isSelected ? (
              <button
                type="button"
                onClick={onToggleSelect}
                className={`${buttonBase} bg-purple-dark text-white active:scale-95`}
              >
                <CheckIcon className="h-4 w-4 shrink-0" /> <span className="truncate">SELECIONADO</span>
              </button>
            ) : soldOut ? (
              <button
                type="button"
                onClick={onToggleSelect}
                className={`${buttonBase} border-2 border-purple text-purple-dark hover:bg-cream`}
              >
                <span className="truncate">Entrar na lista de espera</span>
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onToggleSelect}
                className={`${buttonBase} bg-gradient-to-b from-yellow to-[#F5B400] text-purple-dark shadow-sm hover:brightness-105 active:scale-95`}
              >
                <span className="truncate">Quero participar</span>
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
