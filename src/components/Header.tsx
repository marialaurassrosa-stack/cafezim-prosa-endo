"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";

const NAV_LINKS = [
  { href: "#programacao", label: "Programação" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#professores", label: "Professores" },
  { href: "#cobe-2026", label: "COBE 2026" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-purple-dark">
          BIODENTAL
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink/70 transition-colors hover:text-purple-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#seletor-de-dias"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-yellow px-5 text-sm font-bold text-ink transition-transform hover:brightness-95 active:scale-95"
          >
            Ver programação
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-cream"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#seletor-de-dias"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-yellow px-5 text-sm font-bold text-ink"
            >
              Ver programação
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
