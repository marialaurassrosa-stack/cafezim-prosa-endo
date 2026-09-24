"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Senha incorreta.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-extrabold text-ink">Painel Biodental</h1>
        <p className="mt-1 text-sm text-ink/60">Acesso restrito à equipe — Cafezim, Prosa &amp; Endo.</p>

        <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="admin-password">
          Senha
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 min-h-11 w-full rounded-xl border border-ink/15 px-4 text-sm outline-none focus:border-purple"
        />

        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 min-h-11 w-full rounded-full bg-purple px-4 text-sm font-bold text-white transition-colors hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
