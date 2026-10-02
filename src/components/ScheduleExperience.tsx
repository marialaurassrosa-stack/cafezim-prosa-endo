"use client";

import { useEffect, useMemo, useState } from "react";
import { ConflictDialog } from "@/components/ConflictDialog";
import { DaySelector } from "@/components/DaySelector";
import { LimitDialog } from "@/components/LimitDialog";
import { MAX_SESSIONS_PER_PARTICIPANT } from "@/config/site";
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

interface ScheduleExperienceProps {
  /** Vem pronto do servidor (page.tsx -> buildSchedule()) — a programação já
   * aparece na primeira renderização, sem esperar um fetch no cliente. */
  initialSchedule: ScheduleResponse;
}

export function ScheduleExperience({ initialSchedule }: ScheduleExperienceProps) {
  const [schedule, setSchedule] = useState<ScheduleResponse>(initialSchedule);
  const [activeDayId, setActiveDayId] = useState<DayId>(initialSchedule.days[0]?.id ?? "day1");
  const [detailsSession, setDetailsSession] = useState<SessionWithAvailability | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [conflict, setConflict] = useState<ConflictState | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [limitOpen, setLimitOpen] = useState(false);

  const selectedSessionIds = useScheduleStore((s) => s.selectedSessionIds);
  const select = useScheduleStore((s) => s.select);
  const remove = useScheduleStore((s) => s.remove);
  const clearAll = useScheduleStore((s) => s.clearAll);

  useEffect(() => {
    // Quem salvou mais de 2 rodas antes de existir o limite não pode ficar
    // preso num carrinho que o servidor vai recusar.
    Promise.resolve(useScheduleStore.persist.rehydrate()).then(() => {
      const ids = useScheduleStore.getState().selectedSessionIds;
      if (ids.length > MAX_SESSIONS_PER_PARTICIPANT) {
        useScheduleStore.setState({ selectedSessionIds: ids.slice(0, MAX_SESSIONS_PER_PARTICIPANT) });
      }
    });
  }, []);

  useEffect(() => {
    trackEvent("view_schedule");
  }, []);

  const selectedIdsSet = useMemo(() => new Set(selectedSessionIds), [selectedSessionIds]);

  const selectedSessions = useMemo(
    () => schedule.sessions.filter((s) => selectedIdsSet.has(s.id)),
    [schedule, selectedIdsSet]
  );

  const daySessions = useMemo(
    () => schedule.sessions.filter((s) => s.dayId === activeDayId),
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

    if (selectedSessions.length >= MAX_SESSIONS_PER_PARTICIPANT) {
      setLimitOpen(true);
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
          <p className="mt-2 text-sm font-semibold text-purple-700">
            Cada pessoa pode participar de até {MAX_SESSIONS_PER_PARTICIPANT} rodas.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl">
          <DaySelector days={schedule.days} activeDayId={activeDayId} onSelect={handleSelectDay} />
        </div>
      </section>

      <section id="programacao" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <ScheduleSection
            sessions={daySessions}
            selectedIds={selectedIdsSet}
            onToggleSelect={handleToggleSelect}
            onShowDetails={handleShowDetails}
          />
        </div>
      </section>

      <LimitDialog
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        onViewSchedule={() => {
          setLimitOpen(false);
          setDrawerOpen(true);
        }}
      />

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
