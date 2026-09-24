"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Modal } from "@/components/Modal";
import { XIcon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import {
  PROFILE_TYPE_LABELS,
  type ParticipantInput,
  type ProfileType,
  type RegisterResponse,
  type SessionWithAvailability,
} from "@/types";

const UF_LIST = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const STORAGE_KEY = "cafezim-prosa-endo:participant";

interface StoredParticipant {
  name: string;
  phone: string;
  email: string;
  cro: string;
  state: string;
  profileType: ProfileType | "";
}

function loadStoredParticipant(): StoredParticipant | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredParticipant) : null;
  } catch {
    return null;
  }
}

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  selectedSessions: SessionWithAvailability[];
  onSuccess: (response: RegisterResponse, submittedSessions: SessionWithAvailability[]) => void;
}

export function RegistrationForm({ open, onClose, selectedSessions, onSuccess }: RegistrationFormProps) {
  // Pré-preenche com os dados salvos localmente na última inscrição (lazy
  // init, lido uma vez), para que a pessoa nunca precise digitar os mesmos
  // dados duas vezes. O componente permanece montado entre aberturas do
  // modal, então os campos mantêm o que a pessoa já digitou.
  const [stored] = useState(loadStoredParticipant);
  const [name, setName] = useState(stored?.name ?? "");
  const [phone, setPhone] = useState(stored?.phone ?? "");
  const [email, setEmail] = useState(stored?.email ?? "");
  const [cro, setCro] = useState(stored?.cro ?? "");
  const [state, setState] = useState(stored?.state ?? "");
  const [profileType, setProfileType] = useState<ProfileType | "">(stored?.profileType ?? "");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !email.trim() || !profileType || !consent) {
      setError("Preencha os campos obrigatórios e aceite a política de privacidade.");
      return;
    }

    const participant: ParticipantInput = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      cro: cro.trim(),
      state,
      profileType,
      consent,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participant, sessionIds: selectedSessions.map((s) => s.id) }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Não foi possível concluir sua inscrição. Tente novamente.");
        return;
      }

      const data = (await res.json()) as RegisterResponse;

      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ name: participant.name, phone: participant.phone, email: participant.email, cro: participant.cro, state: participant.state, profileType: participant.profileType })
        );
      } catch {
        // localStorage indisponível (ex.: modo privado) — não é crítico.
      }

      trackEvent("complete_registration", { session_count: selectedSessions.length });
      onSuccess(data, selectedSessions);
    } catch {
      setError("Não foi possível concluir sua inscrição. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="registration-form-title" maxWidthClassName="max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="registration-form-title" className="text-xl font-bold text-ink sm:text-2xl">
            Falta só um cafezim ☕
          </h2>
          <p className="mt-1 text-sm text-ink/60">Preencha seus dados para reservar suas vagas.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="shrink-0 rounded-full p-2 text-ink/50 hover:bg-cream hover:text-ink"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-cream p-4">
        <p className="text-sm font-bold text-ink">Você está se inscrevendo em:</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/70">
          {selectedSessions.map((s) => (
            <li key={s.id}>
              <span className="font-semibold text-ink">
                {s.day.label} · {s.startTime}
              </span>{" "}
              — {s.title.replace(/\n/g, " ")}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nome completo" required htmlFor="reg-name">
            <input
              id="reg-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </Field>
          <Field label="WhatsApp" required htmlFor="reg-phone">
            <input
              id="reg-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="(00) 00000-0000"
              autoComplete="tel"
            />
          </Field>
        </div>

        <Field label="E-mail" required htmlFor="reg-email">
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="CRO" htmlFor="reg-cro">
            <input id="reg-cro" value={cro} onChange={(e) => setCro(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Estado" htmlFor="reg-state">
            <select id="reg-state" value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
              <option value="">Selecione</option>
              {UF_LIST.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink">
            Você é: <span className="text-red">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(PROFILE_TYPE_LABELS) as [ProfileType, string][]).map(([value, label]) => (
              <label
                key={value}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-center text-sm font-medium transition-colors ${
                  profileType === value
                    ? "border-purple bg-purple text-white"
                    : "border-ink/15 text-ink hover:border-purple/40"
                }`}
              >
                <input
                  type="radio"
                  name="profileType"
                  value={value}
                  checked={profileType === value}
                  onChange={() => setProfileType(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 rounded-2xl bg-cream p-4 text-sm text-ink/80">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 text-purple focus:ring-purple"
          />
          <span>
            Li e concordo com a{" "}
            <a href="/politica-de-privacidade" target="_blank" className="font-semibold text-purple-700 underline">
              Política de Privacidade
            </a>{" "}
            e com o tratamento dos meus dados para esta inscrição.
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm font-medium text-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="min-h-12 w-full rounded-full bg-purple px-6 text-sm font-bold text-white transition-colors hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Confirmando..." : "Confirmar minhas vagas"}
        </button>
      </form>
    </Modal>
  );
}

const inputClass =
  "min-h-11 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-purple";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-red">*</span>}
      </label>
      {children}
    </div>
  );
}
