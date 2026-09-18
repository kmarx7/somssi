# PHASE 11 — Supabase Connection

- Added `@supabase/ssr` and `@supabase/supabase-js`.
- Added browser and server Supabase clients.
- Server-only Service Role client is isolated from Client Components.
- Added `/api/supabase/health` and an Admin connection indicator.
- Registered production Supabase URL, publishable key, and service key in Vercel.

The production health check currently reports that Supabase is reachable but the SOMSSI schema is not ready. Apply `supabase/migrations/0001_somssi_booking_foundation.sql` and `0002_production_operations.sql` in the Supabase SQL Editor before switching booking persistence from Mock to Supabase.
