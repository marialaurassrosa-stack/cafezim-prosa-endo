"use client";

import type { CSSProperties } from "react";
import { SessionActionButton } from "@/components/SessionActionButton";
import { CalendarIcon, ChevronDownIcon, ClockIcon, GroupIcon, PersonSilhouetteIcon } from "@/components/icons";
import { formatCardDateBadge } from "@/data/days";
import { availableSeatsLabel, availableSeatsShortLabel } from "@/lib/format";
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
  const photoStyle = {
    "--photo-origin-y": `${speaker.photoOriginY ?? 0}%`,
    "--photo-zoom": speaker.photoZoom ?? 1,
  } as CSSProperties;

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

      {/* ===== Mobile (abaixo de @lg): versão compacta, layout próprio —
          card mais baixo, tema em destaque, foto ao lado do nome+duração.
          Medidas (tamanho da foto, fonte do tema, etc.) tiradas por pixel do
          mockup de referência do pedido, não só "no olho".
          Independente do bloco desktop abaixo (nada aqui é compartilhado
          por classe condicional) para nunca arriscar mudar o desktop. */}
      <div className="relative z-10 flex flex-col gap-4 p-5 @lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-cream-2 px-3 py-1.5 text-xs font-extrabold text-purple-dark">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formatCardDateBadge(session.day, session.startTime)}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-cream-2 px-3 py-1.5 text-xs font-bold ${
              !cancelled && session.availableSeats <= 0 ? "text-red" : "text-ink/60"
            }`}
          >
            <GroupIcon className="h-3.5 w-3.5" />
            {cancelled ? "—" : availableSeatsShortLabel(session.availableSeats)}
          </span>
        </div>

        <h3 className="text-2xl leading-snug font-extrabold whitespace-pre-line text-purple-dark">
          {session.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="h-[104px] w-[104px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-purple to-purple-dark">
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
                style={photoStyle}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <PersonSilhouetteIcon className="h-9 w-9 text-white/20" />
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-5 w-1 shrink-0 rounded-full bg-purple" aria-hidden="true" />
              <p className="min-w-0 text-sm leading-snug font-bold text-purple-dark">{speaker.name}</p>
            </div>
            <div className="flex items-center gap-1.5 pl-3 text-xs font-medium text-ink/60">
              <ClockIcon className="h-3.5 w-3.5" />
              No máximo 40min
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={onShowDetails}
            className="inline-flex items-center gap-1 py-2 text-sm font-bold text-purple-dark"
          >
            Ver detalhes
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          <SessionActionButton session={session} isSelected={isSelected} onToggleSelect={onToggleSelect} size="compact" />
        </div>
      </div>

      {/* ===== Desktop (@lg e acima): layout já aprovado, inalterado —
          mesma estrutura/classes de antes da versão compacta do mobile. */}
      <div className="relative hidden @lg:flex @lg:flex-row">
        {/* .speaker-photo (globals.css) em cover + zoom/ancoragem próprios de
            cada foto (photoZoom/photoOriginY, ver speakers.ts). */}
        <div className="relative z-10 flex h-auto min-h-[360px] w-[39%] min-w-[230px] max-w-[320px] shrink-0 items-start justify-center overflow-hidden bg-gradient-to-b from-purple to-purple-dark">
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
              style={photoStyle}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PersonSilhouetteIcon className="h-20 w-20 text-white/20" />
            </div>
          )}
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4 p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-2 px-4 py-2 text-sm font-extrabold text-purple-dark">
            <CalendarIcon className="h-4 w-4" />
            {formatCardDateBadge(session.day, session.startTime)}
          </span>

          <h3 className="w-fit rounded-2xl bg-cream-2 px-5 py-4 text-2xl leading-snug font-extrabold whitespace-pre-line text-purple-dark">
            {session.title}
          </h3>

          <div className="flex items-center gap-3">
            <span className="h-6 w-1 shrink-0 rounded-full bg-purple" aria-hidden="true" />
            <p className="text-lg font-bold text-purple-dark">{speaker.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink/60">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              No máximo 40min
            </span>
            <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
            <span
              className={`inline-flex items-center gap-1.5 ${session.availableSeats <= 0 ? "font-semibold text-red" : ""}`}
            >
              <GroupIcon className="h-4 w-4" />
              {cancelled ? "—" : availableSeatsLabel(session.availableSeats)}
            </span>
          </div>

          {/* flex-col até @2xl: abaixo disso a coluna de texto não tem
              largura suficiente para os dois botões lado a lado sem cortar
              o texto (medido: "Quero participar" already estoura a divisão
              50/50 em cards mais estreitos que ~672px) — empilhado, cada
              botão fica com a largura toda e nunca precisa de reticências. */}
          <div className="mt-auto flex flex-col gap-3 pt-2 @2xl:flex-row">
            <button
              type="button"
              onClick={onShowDetails}
              className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-purple/15 bg-white px-3 py-3 text-sm font-extrabold text-purple-dark transition-all hover:border-purple/40"
            >
              <span className="truncate">Ver detalhes</span>
              <ChevronDownIcon className="h-3.5 w-3.5 shrink-0" />
            </button>

            <SessionActionButton session={session} isSelected={isSelected} onToggleSelect={onToggleSelect} />
          </div>
        </div>
      </div>
    </article>
  );
}
