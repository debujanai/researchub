ResearchHub — Next.js + Supabase Article Search

Overview

- Public search and viewing of research articles
- Admin Google OAuth (Supabase Auth) with email whitelist
- Admin dashboard to upload, edit, delete articles
- Light/Dark themes, responsive design, minimal academic aesthetic

Tech Stack

- Framework: Next.js 14+ (App Router)
- DB/Auth: Supabase (PostgreSQL, Supabase Auth Google OAuth)
- Styling: Tailwind CSS + shadcn/ui
- TypeScript throughout

Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (e.g., http://localhost:3000)

Supabase Setup

1) Create project and enable Google provider in Authentication
2) Create tables and policies

Schema (SQL)

```sql
-- articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  author text not null,
  published_date date not null,
  tags text[] default '{}',
  category text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  uploaded_by uuid references auth.users(id)
);

alter table public.articles enable row level security;

-- admin_users
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id),
  email text unique not null,
  created_at timestamp with time zone default now()
);

alter table public.admin_users enable row level security;

-- Full text search support (optional but recommended)
create extension if not exists pg_trgm;
create extension if not exists unaccent;
-- Create a tsvector column
alter table public.articles add column if not exists fts tsvector;
update public.articles set fts = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(content,''));
create index if not exists idx_articles_fts on public.articles using gin(fts);
-- Trigger to keep fts updated
create or replace function public.articles_fts_trigger() returns trigger as $$
begin
  new.fts := to_tsvector('english', coalesce(new.title,'') || ' ' || coalesce(new.description,'') || ' ' || coalesce(new.content,''));
  return new;
end
$$ language plpgsql;
drop trigger if exists trg_articles_fts on public.articles;
create trigger trg_articles_fts before insert or update on public.articles for each row execute function public.articles_fts_trigger();
```

RLS Policies

```sql
-- Articles: public read
create policy if not exists "Public read articles" on public.articles
for select using (true);

-- Articles: admin-only write
create policy if not exists "Admins can insert" on public.articles
for insert
to authenticated
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy if not exists "Admins can update" on public.articles
for update
to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));

create policy if not exists "Admins can delete" on public.articles
for delete
to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));

-- Admin users: only admins can read
create policy if not exists "Admins read admin_users" on public.admin_users
for select
to authenticated
using (exists (select 1 from public.admin_users a where a.id = auth.uid()));
```

Google OAuth

- In Google Cloud Console → Credentials → Create OAuth client
- Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
- Copy client ID/secret into Supabase → Authentication → Providers → Google

Admin Whitelist

- Insert your first admin manually:
```sql
insert into public.admin_users (id, email) values ('<auth.users.id>', 'admin@example.com');
```

Run Locally

- Install: `npm install`
- Dev: `npm run dev` → open `http://localhost:3000`

Routes

- `/` homepage with hero
- `/search?q=` search results
- `/article/[id]` article detail
- `/admin/login` admin login
- `/admin` dashboard (protected)
- `/admin/upload` upload (protected)
- `/admin/articles` manage (protected)
- `/admin/edit/[id]` edit (protected)

Notes

- Admin protection uses middleware cookie `is_admin`; actual data safety is enforced by RLS.
- Content is sanitized client-side to strip scripts and event handlers.
- If env vars are missing, the app UI loads but admin/search features wait for Supabase config.