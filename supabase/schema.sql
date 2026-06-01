-- Create courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress between 0 and 100),
  icon_name text not null default 'BookOpen',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.courses enable row level security;

-- Allow public read access
create policy "Public read access"
  on public.courses
  for select
  using (true);

-- Seed data
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Deep Dive', 45, 'FileCode'),
  ('System Design Fundamentals', 60, 'Network'),
  ('Machine Learning Basics', 30, 'Brain');
