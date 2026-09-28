"use client";

import type { CSSProperties } from "react";
import { SessionActionButton } from "@/components/SessionActionButton";
import { CalendarIcon, ChevronDownIcon, ClockIcon, GroupIcon, PersonSilhouetteIcon } from "@/components/icons";
import { formatCardDateBadge } from "@/data/days";
import { availableSeatsLabel, formatDuration } from "@/lib/format";
import type { SessionWithAvailability } from "@/types";

interface SessionCardProps {
  session: SessionWithAvailability;
  isSelected: boolean;
  onToggleSelect: () => void;
  onShowDetails: () => void;
}

export function SessionCard({ session, isSelected, onToggleSelect, onShowDetails }: SessionCardProps) {
  const cancelled = session.status === "cancelled";
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

      {/* Foto ao lado do conteúdo em qualquer largura — mesmo layout do
          mobile ao desktop, só a proporção da coluna da foto cresce quando
          o card fica mais largo (container query, não viewport, porque o
          card fica bem mais estreito quando a grade mostra 2 por linha). */}
      <div className="relative flex flex-row items-start @lg:items-stretch">
        {/* .speaker-photo (globals.css) sempre em cover + zoom/ancoragem
            próprios de cada foto — como a coluna da foto é sempre estreita
            (retrato), o corte nunca cai em cima da cabeça, só nas laterais.
            Os retratos-fonte com "enquadramento" mais afastado (mais fundo
            roxo sobrando) usam um zoom próprio pra aparentar o mesmo tamanho
            dos demais (photoZoom/photoOriginY, speakers.ts).
            Abaixo de @lg a altura é fixa (não acompanha o conteúdo) — o
            texto do card no mobile é bem mais alto que no desktop (fonte
            maior, botões empilhados), e deixar a foto esticar até essa
            altura toda deixaria a coluna finíssima e cortaria demais das
            laterais; a partir de @lg (conteúdo mais compacto, ver
            SessionActionButton) ela volta a acompanhar a altura do card
            como antes. */}
        <div className="relative z-10 flex h-[220px] w-[38%] min-w-[110px] max-w-[170px] shrink-0 items-start justify-center overflow-hidden bg-gradient-to-b from-purple to-purple-dark @lg:h-auto @lg:min-h-[360px] @lg:w-[39%] @lg:min-w-[230px] @lg:max-w-[320px]">
          {speaker.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- foto de professor com recorte próprio, sem next/image
            <img
              src={speaker.photoUrl}
              alt={speaker.name}
              width={364}
              height={525}
              loading="lazy"
              decoding="async"
              className="speaker-photo h-full w-full"
              style={
                {
                  "--photo-origin-y": `${speaker.photoOriginY ?? 0}%`,
                  "--photo-zoom": speaker.photoZoom ?? 1,
                } as CSSProperties
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PersonSilhouetteIcon className="h-20 w-20 text-white/20" />
            </div>
          )}
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4 p-5 @lg:p-8">
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

          <div className="mt-auto flex flex-col gap-3 pt-2 @lg:flex-row">
            <button
              type="button"
              onClick={onShowDetails}
              className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-purple/15 bg-white px-3 py-3 text-sm font-extrabold text-purple-dark transition-all hover:border-purple/40"
            >
              <span className="truncate">Ver detalhes</span>
              <ChevronDownIcon className="h-4 w-4 shrink-0" />
            </button>

            <SessionActionButton session={session} isSelected={isSelected} onToggleSelect={onToggleSelect} />
          </div>
        </div>
      </div>
    </article>
  );
}
