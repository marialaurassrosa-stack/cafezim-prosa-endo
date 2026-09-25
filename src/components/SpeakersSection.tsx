"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { SpeakerModal } from "@/components/SpeakerModal";
import { speakers } from "@/data/speakers";
import type { ScheduleResponse } from "@/types";

export function SpeakersSection() {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then(setSchedule)
      .catch(() => {});
  }, []);

  const activeSpeaker = speakers.find((s) => s.id === activeSpeakerId) ?? null;
  const activeSpeakerSessions = schedule
    ? schedule.sessions
        .filter((s) => s.speakerId === activeSpeakerId)
        .sort((a, b) =>
          a.dayId === b.dayId ? a.startTime.localeCompare(b.startTime) : a.dayId.localeCompare(b.dayId)
        )
    : [];

  return (
    <section id="professores" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Quem vai sentar para prosear?</h2>
        <p className="mt-3 text-ink/65">
          Professores convidados para as rodas de conversa, hands-on e demonstrações do Cafezim.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {speakers.map((speaker) => {
          const sessionCount = schedule
            ? schedule.sessions.filter((s) => s.speakerId === speaker.id).length
            : 0;
          return (
            <button
              key={speaker.id}
              type="button"
              onClick={() => setActiveSpeakerId(speaker.id)}
              className="flex flex-col items-center rounded-2xl p-3 text-center transition-colors hover:bg-cream"
            >
              <Avatar
                name={speaker.name}
                photoUrl={speaker.avatarUrl ?? speaker.photoUrl}
                size={88}
                className="text-2xl"
              />
              <p className="mt-3 text-sm font-bold text-ink">{speaker.name}</p>
              <p className="mt-0.5 text-xs text-ink/55">{speaker.institution}</p>
              {sessionCount > 0 && (
                <span className="mt-2 text-xs font-semibold text-purple-700">
                  {sessionCount} {sessionCount === 1 ? "atividade" : "atividades"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <SpeakerModal speaker={activeSpeaker} sessions={activeSpeakerSessions} onClose={() => setActiveSpeakerId(null)} />
    </section>
  );
}
