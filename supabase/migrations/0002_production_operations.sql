-- SOMSSI PHASE 10: package catalog, cancellation, review KPI, and staff RLS.
create table public.experience_packages (
  id uuid primary key default gen_random_uuid(), experience_id uuid not null references public.experiences(id) on delete cascade,
  code text not null, name_ko text not null, name_en text not null, description_ko text, description_en text,
  price integer not null check (price >= 0), active boolean not null default true,
  unique (experience_id, code)
);
create table public.package_options (
  package_id uuid not null references public.experience_packages(id) on delete cascade,
  option_id uuid not null references public.options(id) on delete restrict,
  primary key (package_id, option_id)
);
alter table public.bookings add column if not exists package_id uuid references public.experience_packages(id) on delete set null;
alter table public.bookings add column if not exists cancelled_at timestamptz;
alter table public.bookings add column if not exists cancellation_reason text;
alter table public.reviews add column if not exists nps_score integer check (nps_score between 0 and 10);
create unique index if not exists reviews_booking_unique_idx on public.reviews (booking_id);

alter table public.experience_packages enable row level security;
alter table public.package_options enable row level security;
create policy "public can view active packages" on public.experience_packages for select to anon, authenticated using (active = true and exists (select 1 from public.experiences e where e.id = experience_id and e.status = 'PUBLISHED'));
create policy "public can view package options" on public.package_options for select to anon, authenticated using (exists (select 1 from public.experience_packages p join public.experiences e on e.id = p.experience_id where p.id = package_id and p.active = true and e.status = 'PUBLISHED'));

-- Authorization uses app_metadata only; user-editable raw_user_meta_data is never trusted.
create or replace function public.is_admin() returns boolean language sql stable security invoker set search_path = public as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;
create or replace function public.is_creator() returns boolean language sql stable security invoker set search_path = public as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'creator', false);
$$;
create policy "admins manage packages" on public.experience_packages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage package options" on public.package_options for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins view all bookings" on public.bookings for select to authenticated using (public.is_admin());
create policy "admins update bookings" on public.bookings for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins view all payments" on public.payments for select to authenticated using (public.is_admin());
create policy "admins view all reviews" on public.reviews for select to authenticated using (public.is_admin());
create policy "admins manage certificates" on public.certificates for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.cancel_booking(p_booking_id uuid, p_reason text default null)
returns boolean language plpgsql security invoker set search_path = public as $$
declare v_booking public.bookings%rowtype;
begin
  select * into v_booking from public.bookings where id = p_booking_id for update;
  if not found or v_booking.status not in ('CONFIRMED','PAID') then return false; end if;
  if v_booking.customer_id is not null and v_booking.customer_id <> (select auth.uid()) and not public.is_admin() then return false; end if;
  update public.bookings set status = 'CANCELLED', cancelled_at = now(), cancellation_reason = left(p_reason, 500) where id = p_booking_id;
  update public.sessions set booked_count = greatest(0, booked_count - v_booking.guest_count), status = case when status = 'FULL' then 'OPEN' else status end where id = v_booking.session_id;
  return true;
end; $$;
revoke execute on function public.cancel_booking(uuid, text) from public, anon;
grant execute on function public.cancel_booking(uuid, text) to authenticated;
