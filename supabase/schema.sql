-- Supabase SQL schema for Dynamic Portfolio

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text default 'admin',
  created_at timestamptz default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  level text,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  tech text[],
  live_url text,
  repo_url text,
  images jsonb,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  company text,
  role text,
  start_date date,
  end_date date,
  location text,
  bullets text[],
  created_at timestamptz default now()
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  title text,
  issuer text,
  credential_url text,
  issued_date date,
  file_key text,
  created_at timestamptz default now()
);

create table if not exists site_meta (
  id integer primary key default 1,
  name text,
  tagline text,
  contact_email text,
  social jsonb,
  hero jsonb,
  updated_at timestamptz default now()
);
