-- Biodental · Cafezim, Prosa & Endo — schema inicial
-- Rode no SQL editor do Supabase, ou via `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- participants
-- ---------------------------------------------------------------------------
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  cro text,
  state text,
  profile_type text not null check (
    profile_type in ('dentista', 'endodontista', 'pos_graduando', 'graduando', 'outro')
  ),
  created_at timestamptz not null default now(),
  constraint participants_email_unique unique (email)
);

-- ---------------------------------------------------------------------------
-- sessions
-- Mirror of src/data/sessions.ts. `id` uses the human-readable pattern
-- {event_code}_{dia}_{horario}_{tema}, e.g. COBE26_D1_0930_MOLARES.
-- ---------------------------------------------------------------------------
create table if not exists sessions (
  id text primary key,
  event_code text not null,
  day text not null, -- 'day1' | 'day2' | 'day3'
  date date, -- null enquanto a data oficial não é confirmada
  start_time time not null,
  end_time time not null,
  title text not null,
  summary text,
  speaker_name text,
  speaker_photo text,
  activity_type text not null check (
    activity_type in ('roda_de_conversa', 'hands_on', 'demonstracao', 'caso_clinico', 'roda_hands_on')
  ),
  capacity int not null check (capacity > 0),
  status text not null default 'active' check (
    status in ('active', 'sold_out', 'cancelled', 'hidden')
  ),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- registrations
-- ---------------------------------------------------------------------------
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references participants (id) on delete cascade,
  session_id text not null references sessions (id) on delete cascade,
  status text not null default 'confirmed' check (
    status in ('confirmed', 'waitlist', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  constraint registrations_participant_session_unique unique (participant_id, session_id)
);

create index if not exists registrations_session_id_idx on registrations (session_id);
create index if not exists registrations_participant_id_idx on registrations (participant_id);

-- ---------------------------------------------------------------------------
-- register_for_sessions()
-- Upserts the participant (by email) and inserts one registration per
-- session id inside a single transaction, locking each session row
-- (`for update`) before counting confirmed seats. This is what prevents two
-- simultaneous requests from both winning the last seat: the second request
-- blocks until the first commits, then sees the up-to-date count.
-- ---------------------------------------------------------------------------
create or replace function register_for_sessions(
  p_name text,
  p_email text,
  p_phone text,
  p_cro text,
  p_state text,
  p_profile_type text,
  p_session_ids text[]
) returns table (participant_id uuid, session_id text, status text) as $$
declare
  v_participant_id uuid;
  v_session_id text;
  v_capacity int;
  v_session_status text;
  v_confirmed_count int;
  v_already text;
begin
  insert into participants (name, email, phone, cro, state, profile_type)
  values (p_name, p_email, p_phone, p_cro, p_state, p_profile_type)
  on conflict (email) do update
    set name = excluded.name,
        phone = excluded.phone,
        cro = excluded.cro,
        state = excluded.state,
        profile_type = excluded.profile_type
  returning id into v_participant_id;

  foreach v_session_id in array p_session_ids loop
    select s.capacity, s.status into v_capacity, v_session_status
    from sessions s
    where s.id = v_session_id
    for update;

    if v_capacity is null then
      participant_id := v_participant_id;
      session_id := v_session_id;
      status := 'error';
      return next;
      continue;
    end if;

    select r.status into v_already
    from registrations r
    where r.participant_id = v_participant_id
      and r.session_id = v_session_id
      and r.status <> 'cancelled';

    if v_already is not null then
      participant_id := v_participant_id;
      session_id := v_session_id;
      status := 'duplicate';
      return next;
      continue;
    end if;

    if v_session_status in ('cancelled', 'hidden') then
      participant_id := v_participant_id;
      session_id := v_session_id;
      status := 'error';
      return next;
      continue;
    end if;

    select count(*) into v_confirmed_count
    from registrations r
    where r.session_id = v_session_id and r.status = 'confirmed';

    participant_id := v_participant_id;
    session_id := v_session_id;

    if v_session_status <> 'sold_out' and v_confirmed_count < v_capacity then
      insert into registrations (participant_id, session_id, status)
      values (v_participant_id, v_session_id, 'confirmed');
      status := 'confirmed';
    else
      insert into registrations (participant_id, session_id, status)
      values (v_participant_id, v_session_id, 'waitlist');
      status := 'waitlist';
    end if;

    return next;
  end loop;

  return;
end;
$$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The public site only ever reads session availability directly; every
-- write (participants/registrations) goes through this RPC, called from a
-- Next.js Route Handler using the service role key, which bypasses RLS.
-- Nothing here grants the browser's anon key insert/update/delete rights.
-- ---------------------------------------------------------------------------
alter table sessions enable row level security;
alter table participants enable row level security;
alter table registrations enable row level security;

create policy "Public can read sessions" on sessions for select using (true);
