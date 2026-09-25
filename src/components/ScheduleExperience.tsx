"use client";

import { useEffect, useMemo, useState } from "react";
import { ConflictDialog } from "@/components/ConflictDialog";
import { DaySelector } from "@/components/DaySelector";
import { RegistrationForm } from "@/components/RegistrationForm";
import { ScheduleDrawer } from "@/components/ScheduleDrawer";
import { ScheduleSection } from "@/components/ScheduleSection";
import { SelectedScheduleBar } from "@/components/SelectedScheduleBar";
import { SessionDetailsModal } from "@/components/SessionDetailsModal";
import { SuccessModal } from "@/components/SuccessModal";
import { sessionsConflict } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { useScheduleStore } from "@/store/scheduleStore";
import type {
  DayId,
  RegisterResponse,
  RegistrationResultItem,
  ScheduleResponse,
  SessionWithAvailability,
} from "@/types";

interface ConflictState {
  newSession: SessionWithAvailability;
  conflicting: SessionWithAvailability[];
}

interface SuccessState {
  results: RegistrationResultItem[];
  sessions: SessionWithAvailability[];
}

export function ScheduleExperience() {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeDayId, setActiveDayId] = useState<DayId>("day1");
  const [detailsSession, setDetailsSession] = useState<SessionWithAvailability | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const selectedSessionIds = useScheduleStore((s) => s.selectedSessionIds);
  const select = useScheduleStore((s) => s.select);
  const remove = useScheduleStore((s) => s.remove);
  const clearAll = useScheduleStore((s) => s.clearAll);

  useEffect(() => {
    useScheduleStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/schedule");
        if (!res.ok) throw new Error("Falha ao carregar a programação.");
        const data = (await res.json()) as ScheduleResponse;
        if (!cancelled) {
          setSchedule(data);
          setActiveDayId(data.days[0]?.id ?? "day1");
        }
      } catch {
        if (!cancelled) setLoadError("Não foi possível carregar a programação. Tente recarregar a página.");
      }
    }
    load();
    trackEvent("view_schedule");
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedIdsSet = useMemo(() => new Set(selectedSessionIds), [selectedSessionIds]);

  const selectedSessions = useMemo(
    () => (schedule ? schedule.sessions.filter((s) => selectedIdsSet.has(s.id)) : []),
    [schedule, selectedIdsSet]
  );

  const daySessions = useMemo(
    () => (schedule ? schedule.sessions.filter((s) => s.dayId === activeDayId) : []),
    [schedule, activeDayId]
  );

  function handleSelectDay(dayId: DayId) {
    setActiveDayId(dayId);
    trackEvent("select_event_day", { day: dayId });
  }

  function handleShowDetails(session: SessionWithAvailability) {
    setDetailsSession(session);
    trackEvent("view_session", {
      session_id: session.id,
      session_title: session.title.replace(/\n/g, " "),
      session_day: session.dayId,
    });
  }

  function handleToggleSelect(session: SessionWithAvailability) {
    if (selectedIdsSet.has(session.id)) {
      remove(session.id);
      trackEvent("remove_session", { session_id: session.id });
      return;
    }

    const conflicts = selectedSessions.filter((s) => sessionsConflict(s, session));
    if (conflicts.length > 0) {
      setConflict({ newSession: session, conflicting: conflicts });
      return;
    }

    select(session.id);
    trackEvent("select_session", {
      session_id: session.id,
      session_title: session.title.replace(/\n/g, " "),
      session_day: session.dayId,
      session_time: session.startTime,
    });
  }

  function handleConflictKeep() {
    setConflict(null);
  }

  function handleConflictSwitch() {
    if (conflict) {
      conflict.conflicting.forEach((c) => remove(c.id));
      select(conflict.newSession.id);
      trackEvent("select_session", {
        session_id: conflict.newSession.id,
        session_title: conflict.newSession.title.replace(/\n/g, " "),
        session_day: conflict.newSession.dayId,
        session_time: conflict.newSession.startTime,
      });
    }
    setConflict(null);
  }

  function handleFinish() {
    setDrawerOpen(false);
    setFormOpen(true);
    trackEvent("start_registration", { session_count: selectedSessions.length });
  }

  function handleRegistrationSuccess(response: RegisterResponse, submittedSessions: SessionWithAvailability[]) {
    setFormOpen(false);
    setSuccess({ results: response.results, sessions: submittedSessions });
    setSchedule(response.schedule);
    clearAll();
    response.results
      .filter((r) => r.status === "waitlist")
      .forEach((r) => trackEvent("join_waitlist", { session_id: r.sessionId }));
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-ink/70">{loadError}</p>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink/50">
        Carregando a programação do Cafezim...
      </div>
    );
  }

  return (
    <>
      <section id="seletor-de-dias" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Qual dia você vai prosear com a gente?
          </h2>
          <p className="mt-3 text-ink/65">
            Escolha um dia para conhecer as rodas de conversa e hands-on.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl">
          <DaySelector days={schedule.days} activeDayId={activeDayId} onSelect={handleSelectDay} />
        </div>
      </section>

      <section id="programacao" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ScheduleSection
            sessions={daySessions}
            selectedIds={selectedIdsSet}
            onToggleSelect={handleToggleSelect}
            onShowDetails={handleShowDetails}
          />
        </div>
      </section>

      <SelectedScheduleBar
        count={selectedSessions.length}
        onViewSchedule={() => setDrawerOpen(true)}
        onFinish={handleFinish}
      />

      <ScheduleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        days={schedule.days}
        selectedSessions={selectedSessions}
        onRemove={(id) => {
          remove(id);
          trackEvent("remove_session", { session_id: id });
        }}
        onCheckout={handleFinish}
      />

      <RegistrationForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        selectedSessions={selectedSessions}
        onSuccess={handleRegistrationSuccess}
      />

      <SuccessModal
        open={Boolean(success)}
        onClose={() => setSuccess(null)}
        results={success?.results ?? []}
        sessions={success?.sessions ?? []}
      />

      <ConflictDialog
        open={Boolean(conflict)}
        newSession={conflict?.newSession ?? null}
        conflictingSessions={conflict?.conflicting ?? []}
        onKeepCurrent={handleConflictKeep}
        onSwitch={handleConflictSwitch}
      />

      <SessionDetailsModal
        session={detailsSession}
        isSelected={detailsSession ? selectedIdsSet.has(detailsSession.id) : false}
        onToggleSelect={() => detailsSession && handleToggleSelect(detailsSession)}
        onClose={() => setDetailsSession(null)}
      />
    </>
  );
}
