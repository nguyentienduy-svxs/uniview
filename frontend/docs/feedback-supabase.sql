create table if not exists public.feedback (
  id uuid primary key,
  user_id text,
  user_name text not null,
  email text,
  rating integer not null check (rating between 1 and 5),
  category text not null,
  message text not null,
  page text not null,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Feedback is written only by the serverless API using SUPABASE_SERVICE_ROLE_KEY.
-- Do not add a public insert policy for this table.
