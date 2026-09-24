"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { days } from "@/data/days";
import type { AdminRegistrationRow } from "@/lib/db/types";
import { ACTIVITY_TYPE_LABELS, PROFILE_TYPE_LABELS, type ActivityType, type ProfileType } from "@/types";

interface SessionSummary {
  sessionId: string;
  title: string;
  dayId: string;
  capacity: number;
  confirmed: number;
  waitlist: number;
  available: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [rows, setRows] = useState<AdminRegistrationRow[]>([]);
  const [summary, setSummary] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayFilter, setDayFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) {
        if (!cancelled) router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as { rows: AdminRegistrationRow[]; summary: SessionSummary[] };
      if (!cancelled) {
        setRows(data.rows);
        setSummary(data.summary);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (dayFilter && r.dayId !== dayFilter) return false;
      if (activityFilter && r.activityType !== activityFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      return true;
    });
  }, [rows, dayFilter, activityFilter, statusFilter]);

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (dayFilter) params.set("day", dayFilter);
    if (activityFilter) params.set("activityType", activityFilter);
    if (statusFilter) params.set("status", statusFilter);
    const qs = params.toString();
    return `/api/admin/export${qs ? `?${qs}` : ""}`;
  }, [dayFilter, activityFilter, statusFilter]);

  const totalConfirmed = summary.reduce((acc, s) => acc + s.confirmed, 0);
  const totalCapacity = summary.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Inscrições — Cafezim, Prosa &amp; Endo</h1>
            <p className="text-sm text-ink/60">
              {totalConfirmed} inscritos confirmados de {totalCapacity} vagas totais.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/30"
          >
            Sair
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-ink/15 px-4 text-sm"
          >
            <option value="">Todos os dias</option>
            {days.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-ink/15 px-4 text-sm"
          >
            <option value="">Todos os tipos</option>
            {(Object.entries(ACTIVITY_TYPE_LABELS) as [ActivityType, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-ink/15 px-4 text-sm"
          >
            <option value="">Todos os status</option>
            <option value="confirmed">Confirmado</option>
            <option value="waitlist">Lista de espera</option>
          </select>
        </div>

        <a
          href={exportUrl}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-purple px-5 text-sm font-bold text-white hover:bg-purple-dark"
        >
          Exportar CSV
        </a>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="min-w-full divide-y divide-ink/10 text-sm">
            <thead className="bg-cream text-left text-xs font-bold tracking-wide text-ink/60 uppercase">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">CRO</th>
                <th className="px-4 py-3">UF</th>
                <th className="px-4 py-3">Perfil</th>
                <th className="px-4 py-3">Atividade</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-ink/50">
                    Carregando...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-ink/50">
                    Nenhuma inscrição encontrada.
                  </td>
                </tr>
              ) : (
                filteredRows.map((r) => (
                  <tr key={r.registrationId}>
                    <td className="px-4 py-3 font-medium text-ink">{r.name}</td>
                    <td className="px-4 py-3 text-ink/70">{r.phone}</td>
                    <td className="px-4 py-3 text-ink/70">{r.email}</td>
                    <td className="px-4 py-3 text-ink/70">{r.cro || "—"}</td>
                    <td className="px-4 py-3 text-ink/70">{r.state || "—"}</td>
                    <td className="px-4 py-3 text-ink/70">
                      {PROFILE_TYPE_LABELS[r.profileType as ProfileType] ?? r.profileType}
                    </td>
                    <td className="px-4 py-3 text-ink/70">{r.sessionTitle}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.status === "confirmed" ? "bg-purple/10 text-purple-700" : "bg-yellow/20 text-ink"
                        }`}
                      >
                        {r.status === "confirmed" ? "Confirmado" : "Lista de espera"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-ink">Vagas por atividade</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {summary.map((s) => (
              <div key={s.sessionId} className="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
                <p className="font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-ink/60">
                  {s.confirmed}/{s.capacity} confirmados · {s.waitlist} na espera
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
