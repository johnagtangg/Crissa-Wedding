-- ============================================================
-- Wedding Site — Supabase Schema
-- Run this in your Supabase SQL Editor to set up all tables.
-- ============================================================

-- ── RSVPs ────────────────────────────────────────────────────
create table public.rsvps (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  attending        boolean not null default true,
  meal_preference  text,
  message          text,
  created_at       timestamptz not null default now()
);

-- Public can insert (submit RSVP); only admin can read/delete
alter table public.rsvps enable row level security;

create policy "Public can insert rsvps"
  on public.rsvps for insert
  to anon
  with check (true);

create policy "Admin can read rsvps"
  on public.rsvps for select
  to authenticated
  using (true);

create policy "Admin can delete rsvps"
  on public.rsvps for delete
  to authenticated
  using (true);

-- ── Schedule Events ──────────────────────────────────────────
create table public.schedule_events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  time        text not null,
  location    text,
  sort_order  integer not null default 0
);

alter table public.schedule_events enable row level security;

create policy "Public can read schedule"
  on public.schedule_events for select
  to anon
  using (true);

create policy "Admin can manage schedule"
  on public.schedule_events for all
  to authenticated
  using (true)
  with check (true);

-- ── Gallery Photos ───────────────────────────────────────────
create table public.gallery_photos (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  caption      text,
  uploaded_at  timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

create policy "Public can read gallery"
  on public.gallery_photos for select
  to anon
  using (true);

create policy "Admin can manage gallery"
  on public.gallery_photos for all
  to authenticated
  using (true)
  with check (true);

-- ── Guest Photos (Wedding Day page) ─────────────────────────
create table public.guest_photos (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  uploaded_at  timestamptz not null default now()
);

alter table public.guest_photos enable row level security;

create policy "Guests can insert photos"
  on public.guest_photos for insert
  to anon
  with check (true);

create policy "Anyone can read guest photos"
  on public.guest_photos for select
  to anon
  using (true);

-- ── Supabase Storage Bucket ──────────────────────────────────
-- Create a bucket named "gallery" (public) in the Supabase Dashboard:
-- Storage → New Bucket → name: gallery → Public: ✓
-- Then add a storage policy:
--   Bucket: gallery | Operations: SELECT | Role: anon | Policy: true
--   Bucket: gallery | Operations: INSERT, UPDATE, DELETE | Role: authenticated | Policy: true

-- Create a bucket named "guest-photos" (public) in the Supabase Dashboard:
-- Storage → New Bucket → name: guest-photos → Public: ✓
-- Then add storage policies:
--   Bucket: guest-photos | Operations: SELECT | Role: anon | Policy: true
--   Bucket: guest-photos | Operations: INSERT | Role: anon | Policy: true
