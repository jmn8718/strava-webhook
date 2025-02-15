create table if not exists webhooks (
  id bigint primary key generated always as identity,
  event_id text,
  athlete_id text,
  activity_type text,
  event_type text,
  object_type text,
  object_id text,
  updates text,
  event_time timestamptz,
  created_at timestamptz default now()
);