-- Biodental · Cafezim, Prosa & Endo — sessões reais (Coffee & Learning & Endo)
-- Rode no SQL editor do Supabase depois do 0001_init.sql.
--
-- IMPORTANTE: a função register_for_sessions() (0001_init.sql) valida vagas
-- e status lendo ESTA tabela, não o arquivo src/data/sessions.ts do site.
-- Sempre que sessions.ts mudar (novo tema, horário, vaga, sessão adicionada
-- ou removida), rode de novo este arquivo atualizado no SQL editor pra
-- manter os dois em sincronia — o "upsert" (on conflict) faz isso sem
-- duplicar linhas.

-- IDs que existiram numa versão anterior da planilha e não existem mais em
-- sessions.ts (trocaram de horário/dia, ganharam um novo id). Sem isso eles
-- ficariam esquecidos na tabela, sem aparecer no site mas ainda "bookáveis"
-- por quem chamasse a API diretamente com o id antigo.
delete from sessions where id in (
  'COBE26_D1_1600_ANATOMIAS',
  'COBE26_D1_1700_CCONEBLUE',
  'COBE26_D3_1000_BIOCERAMICOS'
);

insert into sessions (id, event_code, day, date, start_time, end_time, title, summary, speaker_name, speaker_photo, activity_type, capacity, status)
values
  ('COBE26_D1_1400_MOLARQUENTE', 'COBE26', 'day1', '2026-10-08', '14:00', '15:00', 'Molar quente?
Como manter a mente fria', 'Uma conversa sobre como manter a clareza de raciocínio e tomar boas decisões diante de um molar com dor aguda.', 'Profa. Dra. Anarela Bernardi', '/images/speakers/anarela-bernardi.png', 'roda_de_conversa', 5, 'active'),

  ('COBE26_D1_1500_BIOATIVIDADE', 'COBE26', 'day1', '2026-10-08', '15:00', '16:00', 'Bioatividade além do canal:
Elevação de margem', 'Como usar materiais bioativos para além do canal radicular, na elevação de margem cervical.', 'Prof. Ms. Artur Napoleão P. de Araújo', '/images/speakers/arthur-napoleao.png', 'demonstracao', 5, 'active'),

  ('COBE26_D1_1600_CCONEBLUE', 'COBE26', 'day1', '2026-10-08', '16:00', '17:00', 'CC One Blue: reciprocante
com eficiência e segurança', 'Uso do sistema reciprocante CC One Blue com eficiência e segurança na instrumentação.', 'Prof. Dr. Murilo Borges', '/images/speakers/murilo-borges.png', 'hands_on', 5, 'active'),

  ('COBE26_D1_1700_ANATOMIAS', 'COBE26', 'day1', '2026-10-08', '17:00', '18:00', 'Anatomias complexas:
Sistema Orodeka', 'Como o Sistema Orodeka ajuda a lidar com anatomias radiculares complexas no dia a dia clínico.', 'Prof. Danilo Shimanuko', '/images/speakers/danilo-shimanuko.png', 'demonstracao', 5, 'active'),

  ('COBE26_D2_1000_ISOLAMENTO', 'COBE26', 'day2', '2026-10-09', '10:00', '11:00', 'Isolamento:
desafios na endodontia', 'Uma roda de conversa sobre os principais desafios do isolamento absoluto na endodontia do dia a dia.', 'Prof. Alexandre Bortoloto', '/images/speakers/alexandre-bortoloto.png', 'roda_de_conversa', 5, 'active'),

  ('COBE26_D2_1100_BIOATIVIDADE', 'COBE26', 'day2', '2026-10-09', '11:00', '12:00', 'Bioatividade além do canal:
Elevação de margem', 'Mais uma conversa sobre bioatividade e elevação de margem, com outro olhar clínico sobre o tema.', 'Prof. Ms. Aloísio Napoleão Araújo', '/images/speakers/aloisio-napoleao.png', 'demonstracao', 5, 'active'),

  ('COBE26_D2_1200_BIOCERAMICOS', 'COBE26', 'day2', '2026-10-09', '12:00', '13:00', 'Biocerâmicos: escolha,
técnica e resultado', 'Como escolher o biocerâmico certo e a técnica que garante o melhor resultado.', 'Prof. Bruno Bisi', '/images/speakers/bruno-bisi.png', 'hands_on', 5, 'active'),

  ('COBE26_D2_1400_ULTRASSOMROTINA', 'COBE26', 'day2', '2026-10-09', '14:00', '15:00', 'O ultrassom na rotina endodôntica:
indicações técnicas e resultados', 'Quando e como incluir o ultrassom na rotina endodôntica para melhorar os resultados.', 'Prof. Fabiano Souza', '/images/speakers/key-fabiano-souza.png', 'demonstracao', 5, 'active'),

  ('COBE26_D2_1500_IRRIGANTECERTO', 'COBE26', 'day2', '2026-10-09', '15:00', '16:00', 'Irrigante certo, volume ideal:
O que realmente faz diferença no canal?', 'Uma conversa sobre irrigante e volume ideal: o que realmente muda o resultado da irrigação.', 'Profa. Dra. Josiane Almeida', '/images/speakers/josiane-almeida.png', 'roda_de_conversa', 5, 'active'),

  ('COBE26_D2_1700_RCONECURVATURA', 'COBE26', 'day2', '2026-10-09', '17:00', '18:00', 'Uso do RC One em canais
com curvatura acentuada', 'Prática guiada do uso do RC One em canais com curvatura acentuada.', 'Prof. Dr. Eduardo Akisue', '/images/speakers/eduardo-akisue.png', 'hands_on', 5, 'active')

on conflict (id) do update
  set day = excluded.day,
      date = excluded.date,
      start_time = excluded.start_time,
      end_time = excluded.end_time,
      title = excluded.title,
      summary = excluded.summary,
      speaker_name = excluded.speaker_name,
      speaker_photo = excluded.speaker_photo,
      activity_type = excluded.activity_type,
      capacity = excluded.capacity,
      status = excluded.status;
