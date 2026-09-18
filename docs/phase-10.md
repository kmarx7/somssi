# PHASE 10 — Production Operations Foundation

- `supabase/migrations/0002_production_operations.sql` adds package catalog, package options, cancellation fields, NPS, staff RLS helpers, and an atomic cancellation function.
- `/booking/manage/[bookingId]` adds the development cancellation request flow.
- Mock booking records now support `CANCELLED` and release reserved capacity.

Before live operation, apply both migrations in Supabase, configure Auth `app_metadata.role`, replace the mock booking service with server-side Supabase queries, and connect refund webhooks. The current Vercel flow remains safe for development because it does not pretend to persist data when Supabase is not configured.
