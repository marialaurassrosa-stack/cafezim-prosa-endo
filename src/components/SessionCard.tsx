"use client";

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

      {/* Layout responde à largura do próprio card (container query), não à
          da viewport — importante porque o card fica bem mais estreito
          quando a grade mostra 2 por linha. */}
      <div className="relative flex flex-col @lg:flex-row">
        {/* Foto do professor. object-contain garante que rosto/cabeça/ombros
            nunca sejam cortados — a sobra vira fundo em degradê roxo. As
            fotos variam bastante na quantidade de "folga" abaixo da pessoa
            (algumas preenchem o quadro, outras têm bastante roxo sobrando),
            então ancoramos no TOPO por padrão: a cabeça fica consistente
            entre os cards, e a folga (quando existe) sobra embaixo em vez de
            empurrar a pessoa pro meio do quadro. `max-h` trava o tamanho de
            exibição da foto para não variar com a altura do card. */}
        <div className="relative z-10 flex h-64 shrink-0 items-start justify-center overflow-hidden bg-gradient-to-b from-purple to-purple-dark @lg:h-auto @lg:min-h-[360px] @lg:w-[39%] @lg:min-w-[230px] @lg:max-w-[320px]">
          {speaker.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- foto de professor com recorte próprio, sem next/image
            <img
              src={speaker.photoUrl}
              alt={speaker.name}
              width={364}
              height={525}
              loading="lazy"
              decoding="async"
              className={`h-full w-auto max-w-full object-contain @lg:max-h-[360px] ${
                speaker.photoPosition === "center" ? "object-center" : "object-top"
              }`}
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
              className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-purple/15 bg-white px-4 py-3 text-sm font-extrabold text-purple-dark transition-all hover:border-purple/40 @lg:px-6"
            >
              Ver detalhes
              <ChevronDownIcon className="h-4 w-4 shrink-0" />
            </button>

            <SessionActionButton session={session} isSelected={isSelected} onToggleSelect={onToggleSelect} />
          </div>
        </div>
      </div>
    </article>
  );
}
