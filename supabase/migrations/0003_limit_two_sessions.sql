-- Biodental · Cafezim, Prosa & Endo — limite de 2 rodas por pessoa
-- Rode no SQL editor do Supabase (depois do 0001 e do 0002). É seguro rodar de
-- novo: só substitui a função register_for_sessions().
--
-- O que muda em relação ao 0001:
--  1. Cada pessoa (mesmo e-mail) pode ter no máximo 2 inscrições ativas
--     (confirmadas + lista de espera; as canceladas não contam), somando
--     todas as vezes que ela voltou ao site. A 3ª volta com status
--     'limit_reached' (o site transforma isso numa mensagem amigável).
--     Se mudar o limite, mude o número 2 abaixo E MAX_SESSIONS_PER_PARTICIPANT
--     em src/config/site.ts.
--  2. Reinscrição numa atividade que a pessoa tinha cancelada (ex.: a Biodental
--     cancelou pelo painel de admin) agora reativa a linha antiga em vez de
--     estourar a regra de unicidade (participant_id, session_id).

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
  v_active_count int;
  v_new_status text;
begin
  -- O upsert trava a linha do participante até o fim da transação, então dois
  -- pedidos simultâneos do mesmo e-mail são atendidos um depois do outro e o
  -- contador abaixo nunca fica desatualizado.
  insert into participants (name, email, phone, cro, state, profile_type)
  values (p_name, p_email, p_phone, p_cro, p_state, p_profile_type)
  on conflict (email) do update
    set name = excluded.name,
        phone = excluded.phone,
        cro = coalesce(excluded.cro, participants.cro),
        state = coalesce(excluded.state, participants.state),
        profile_type = coalesce(excluded.profile_type, participants.profile_type)
  returning id into v_participant_id;

  select count(*) into v_active_count
  from registrations r
  where r.participant_id = v_participant_id
    and r.status <> 'cancelled';

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

    if v_active_count >= 2 then
      participant_id := v_participant_id;
      session_id := v_session_id;
      status := 'limit_reached';
      return next;
      continue;
    end if;

    select count(*) into v_confirmed_count
    from registrations r
    where r.session_id = v_session_id and r.status = 'confirmed';

    if v_session_status <> 'sold_out' and v_confirmed_count < v_capacity then
      v_new_status := 'confirmed';
    else
      v_new_status := 'waitlist';
    end if;

    -- "on constraint" (e não "on conflict (participant_id, session_id)")
    -- porque participant_id/session_id também são colunas de saída da função
    -- e o Postgres reclamaria de referência ambígua.
    insert into registrations (participant_id, session_id, status)
    values (v_participant_id, v_session_id, v_new_status)
    on conflict on constraint registrations_participant_session_unique
    do update set status = excluded.status, created_at = now();

    v_active_count := v_active_count + 1;

    participant_id := v_participant_id;
    session_id := v_session_id;
    status := v_new_status;
    return next;
  end loop;

  return;
end;
$$ language plpgsql security definer;
