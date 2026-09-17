-- SOMSSI PHASE 5 booking foundation.
-- Apply with Supabase SQL editor or CLI after installing the Supabase CLI.
create extension if not exists "pgcrypto";

create type public.experience_status as enum ('DRAFT','PUBLISHED','ARCHIVED');
create type public.session_status as enum ('OPEN','FULL','CANCELLED','COMPLETED');
create type public.booking_status as enum ('PENDING','PAYMENT_PENDING','PAID','CONFIRMED','CHECKED_IN','IN_PROGRESS','COMPLETED','CERTIFICATE_ISSUED','CANCELLED','REFUNDED','NO_SHOW');
create type public.payment_status as enum ('PENDING','PAID','FAILED','REFUNDED');
create type public.pricing_type as enum ('PER_PERSON','PER_BOOKING');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text, last_name text, country text, language text default 'en', phone text,
  role text not null default 'customer' check (role in ('customer','creator','admin')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.creators (
  id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete set null,
  slug text not null unique, name_ko text not null, name_en text not null, bio_ko text, bio_en text,
  active boolean not null default true, created_at timestamptz not null default now()
);
create table public.venues (
  id uuid primary key default gen_random_uuid(), name text not null, address text, city text default 'Incheon',
  accessibility_notes text, active boolean not null default true, created_at timestamptz not null default now()
);
create table public.experiences (
  id uuid primary key default gen_random_uuid(), slug text not null unique, category text not null,
  title_ko text not null, title_en text not null, description_ko text, description_en text,
  creator_id uuid references public.creators(id) on delete set null, base_price integer not null check (base_price >= 0),
  duration_minutes integer not null check (duration_minutes > 0), min_guests integer not null default 1 check (min_guests > 0),
  max_guests integer not null default 6 check (max_guests >= min_guests), difficulty text, hero_image text,
  status public.experience_status not null default 'DRAFT', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.options (
  id uuid primary key default gen_random_uuid(), code text not null unique, name_ko text not null, name_en text not null,
  description text, price integer not null check (price >= 0), pricing_type public.pricing_type not null, active boolean not null default true
);
create table public.experience_options (
  experience_id uuid not null references public.experiences(id) on delete cascade,
  option_id uuid not null references public.options(id) on delete cascade, primary key (experience_id, option_id)
);
create table public.sessions (
  id uuid primary key default gen_random_uuid(), experience_id uuid not null references public.experiences(id) on delete cascade,
  creator_id uuid references public.creators(id) on delete set null, venue_id uuid references public.venues(id) on delete set null,
  start_at timestamptz not null, end_at timestamptz not null, capacity integer not null check (capacity > 0),
  booked_count integer not null default 0 check (booked_count >= 0 and booked_count <= capacity), price_override integer check (price_override >= 0),
  status public.session_status not null default 'OPEN', created_at timestamptz not null default now(), check (end_at > start_at)
);
create index sessions_experience_start_idx on public.sessions (experience_id, start_at) where status = 'OPEN';
create table public.bookings (
  id uuid primary key default gen_random_uuid(), booking_number text not null unique default ('SOMSSI-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
  customer_id uuid references public.profiles(id) on delete set null, session_id uuid not null references public.sessions(id), guest_count integer not null check (guest_count > 0),
  language text not null default 'en', base_amount integer not null default 0 check (base_amount >= 0), options_amount integer not null default 0 check (options_amount >= 0),
  discount_amount integer not null default 0 check (discount_amount >= 0), total_amount integer not null default 0 check (total_amount >= 0),
  status public.booking_status not null default 'PENDING', payment_status public.payment_status not null default 'PENDING',
  customer_name text not null, customer_email text not null, customer_country text, customer_phone text, created_at timestamptz not null default now()
);
create index bookings_session_status_idx on public.bookings (session_id, status);
create table public.booking_options (
  booking_id uuid not null references public.bookings(id) on delete cascade, option_id uuid not null references public.options(id), quantity integer not null default 1 check (quantity > 0), unit_price integer not null check (unit_price >= 0),
  primary key (booking_id, option_id)
);
create table public.payments (id uuid primary key default gen_random_uuid(), booking_id uuid not null unique references public.bookings(id) on delete cascade, provider text not null, provider_payment_id text, amount integer not null check (amount >= 0), status public.payment_status not null default 'PENDING', created_at timestamptz not null default now());
create table public.certificates (id uuid primary key default gen_random_uuid(), booking_id uuid not null unique references public.bookings(id) on delete cascade, certificate_number text not null unique, issued_at timestamptz, public_visible boolean not null default true);
create table public.reviews (id uuid primary key default gen_random_uuid(), booking_id uuid not null references public.bookings(id) on delete cascade, rating integer not null check (rating between 1 and 5), body text, created_at timestamptz not null default now());
create table public.media_assets (id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id) on delete set null, booking_id uuid references public.bookings(id) on delete set null, storage_path text not null, kind text, created_at timestamptz not null default now());

-- Atomic capacity reservation. The row lock prevents two concurrent requests from overselling a session.
create or replace function public.reserve_session(p_session_id uuid, p_guest_count integer)
returns boolean language plpgsql security invoker set search_path = public as $$
declare v_capacity integer; v_booked integer; v_status public.session_status;
begin
  if p_guest_count is null or p_guest_count <= 0 then return false; end if;
  select capacity, booked_count, status into v_capacity, v_booked, v_status from public.sessions where id = p_session_id for update;
  if not found or v_status <> 'OPEN' or v_booked + p_guest_count > v_capacity then return false; end if;
  update public.sessions set booked_count = booked_count + p_guest_count, status = case when booked_count + p_guest_count = capacity then 'FULL' else status end where id = p_session_id;
  return true;
end; $$;
revoke execute on function public.reserve_session(uuid, integer) from public, anon, authenticated;

alter table public.profiles enable row level security;
alter table public.creators enable row level security;
alter table public.venues enable row level security;
alter table public.experiences enable row level security;
alter table public.options enable row level security;
alter table public.experience_options enable row level security;
alter table public.sessions enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_options enable row level security;
alter table public.payments enable row level security;
alter table public.certificates enable row level security;
alter table public.reviews enable row level security;
alter table public.media_assets enable row level security;

create policy "public can view published experiences" on public.experiences for select to anon, authenticated using (status = 'PUBLISHED');
create policy "public can view active creators" on public.creators for select to anon, authenticated using (active = true);
create policy "public can view active venues" on public.venues for select to anon, authenticated using (active = true);
create policy "public can view active options" on public.options for select to anon, authenticated using (active = true);
create policy "public can view experience options" on public.experience_options for select to anon, authenticated using (exists (select 1 from public.experiences e where e.id = experience_id and e.status = 'PUBLISHED'));
create policy "public can view open sessions" on public.sessions for select to anon, authenticated using (status in ('OPEN','FULL'));
create policy "customers view own bookings" on public.bookings for select to authenticated using ((select auth.uid()) = customer_id);
create policy "customers view own booking options" on public.booking_options for select to authenticated using (exists (select 1 from public.bookings b where b.id = booking_id and b.customer_id = (select auth.uid())));
create policy "customers view own certificates" on public.certificates for select to authenticated using (exists (select 1 from public.bookings b where b.id = booking_id and b.customer_id = (select auth.uid())) or public_visible = true);
create policy "public verify certificates" on public.certificates for select to anon, authenticated using (public_visible = true);
create policy "customers view own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "customers update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
