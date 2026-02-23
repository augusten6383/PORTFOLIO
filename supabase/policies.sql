-- Supabase Storage RLS policies for the `portfolio` bucket
-- Run these in the Supabase SQL editor (Project → SQL Editor → New query)

-- 1) Allow authenticated users to INSERT objects into the 'portfolio' bucket
-- This requires that the inserted row's owner equals the current auth user.
create policy "Allow authenticated inserts to portfolio" on storage.objects
  for insert
  with check (
    bucket_id = 'portfolio'
    and owner = auth.uid()
  );

-- 2) Allow authenticated users to SELECT objects in the 'portfolio' bucket
create policy "Allow authenticated selects from portfolio" on storage.objects
  for select
  using (
    bucket_id = 'portfolio'
    and auth.role() = 'authenticated'
  );

-- 3) Allow object owners to UPDATE their own objects (if needed)
create policy "Allow owners to update their objects" on storage.objects
  for update
  using (
    owner = auth.uid()
  )
  with check (
    owner = auth.uid()
  );

-- 4) Allow object owners to DELETE their own objects
create policy "Allow owners to delete their objects" on storage.objects
  for delete
  using (
    owner = auth.uid()
  );

-- Notes:
-- - These policies scope access to the 'portfolio' bucket only. If you used a different
--   bucket name, replace 'portfolio' accordingly.
-- - For development you may prefer to make the bucket public (Storage → Buckets → set Public).
-- - For production, prefer private buckets + these policies; use signed URLs to serve files publicly.
