# Cafezim, Prosa & Endo — Biodental no COBE 2026

Landing page + fluxo de inscrição da programação "Cafezim, Prosa & Endo", da Biodental
Produtos, durante o COBE 2026 (stand Biodental, Belo Horizonte).

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, com uma camada de
dados que funciona com **Supabase** em produção ou com um **banco local em arquivo**
para desenvolvimento/demonstração sem precisar configurar nada primeiro.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Sem nenhuma variável de ambiente
configurada, o site já funciona de ponta a ponta: a "programação" é lida de
`src/data/sessions.ts` e as inscrições são gravadas num arquivo temporário do
sistema (funciona local e também em hosts serverless como a Vercel, mas não
garante persistência entre deploys — configure o Supabase antes de usar em
produção de verdade, veja abaixo).

Painel administrativo: [http://localhost:3000/admin](http://localhost:3000/admin)
— senha padrão `biodental2026` (troque via `ADMIN_PASSWORD`, veja `.env.example`).

## O que editar para atualizar o conteúdo

Todo o conteúdo "de negócio" fica em arquivos centrais, sem espalhar dados pelos
componentes:

| O que mudar | Onde |
| --- | --- |
| Datas dos 3 dias do evento | `src/data/days.ts` |
| Professores (nome, foto, bio, instituição) | `src/data/speakers.ts` |
| Atividades (tema, horário, capacidade, descrição, status) | `src/data/sessions.ts` |
| Nome do evento, cidade, stand, links do rodapé | `src/config/site.ts` |

Datas e biografias foram deixadas como **placeholders explícitos** (ex.: "Prof. Nome
Sobrenome 1", `date: null` exibindo "Data a confirmar") — a ideia é que ninguém publique
sem querer uma informação inventada. Preencha esses arquivos com os dados reais quando
estiverem confirmados.

Cada sessão tem um `id` estável (ex.: `COBE26_D1_0930_MOLARES`) — é essa string que
referencia registros no banco, então evite trocar o `id` de uma sessão depois que ela já
tiver inscrições.

### Status possíveis

- Sessão (`status` em `sessions.ts`): `active`, `sold_out` (forçar esgotado
  manualmente), `cancelled` (mostra "Atividade cancelada", sem inscrição), `hidden`
  (some da programação).
- Inscrição: `confirmed`, `waitlist` (lista de espera, atribuída automaticamente quando
  a sessão está lotada), `cancelled`.

## Banco de dados

A interface `Db` (`src/lib/db/types.ts`) tem duas implementações:

- **`src/lib/db/local.ts`** — arquivo JSON local, com um mutex simples para nunca dar
  overbooking em desenvolvimento. É a implementação usada quando as variáveis do
  Supabase abaixo não estão definidas.
- **`src/lib/db/supabase.ts`** — usa `@supabase/supabase-js` e a função Postgres
  `register_for_sessions` (ver `supabase/migrations/0001_init.sql`) para reservar vagas
  de forma atômica (lock por sessão), evitando que duas pessoas confirmem a última vaga
  ao mesmo tempo.

Para ligar o Supabase em produção:

1. Rode `supabase/migrations/0001_init.sql` no seu projeto Supabase.
2. Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e
   `SUPABASE_SERVICE_ROLE_KEY`.
3. Pronto — `src/lib/db/index.ts` troca automaticamente para a implementação Supabase
   quando essas variáveis existem, sem precisar mudar nenhum componente.

## Painel administrativo

`/admin` (protegido por `src/proxy.ts`, que verifica um cookie assinado — ver
`src/lib/adminAuth.ts`) mostra todas as inscrições, com filtro por dia / tipo de
atividade / status, contagem de vagas por sessão e exportação em CSV
(`/api/admin/export`). Não faz parte da navegação pública do site.

## Analytics (GA4)

Defina `NEXT_PUBLIC_GA_MEASUREMENT_ID` para habilitar o GA4 (o site funciona
normalmente sem essa variável — os eventos só deixam de ser enviados). Eventos
disparados: `view_schedule`, `select_event_day`, `view_session`, `select_session`,
`remove_session`, `start_registration`, `complete_registration`, `join_waitlist`
(`src/lib/analytics.ts`).

## Estrutura dos componentes

```
src/components/
  Header, Hero, DaySelector, ScheduleSection, SessionCard,
  SelectedScheduleBar, ScheduleDrawer, RegistrationForm, SuccessModal,
  ConflictDialog, AboutSection, SpeakersSection, SpeakerModal,
  StandSection, CtaFinal, Footer
```

A seleção de atividades (múltiplos dias, conflitos de horário) vive em
`src/store/scheduleStore.ts` (Zustand + localStorage) e é orquestrada pelo componente
`src/components/ScheduleExperience.tsx`.
