# Supabase Setup Guide

## Japanese Machinery Premium Website

This guide walks you through setting up Supabase for the Japanese Machinery website.

---

## Table of Contents

1. [Create Supabase Project](#1-create-supabase-project)
2. [Run Database Schema](#2-run-database-schema)
3. [Configure Row Level Security](#3-configure-row-level-security)
4. [Set Up Storage Buckets](#4-set-up-storage-buckets)
5. [Seed Initial Data](#5-seed-initial-data)
6. [Configure Environment Variables](#6-configure-environment-variables)
7. [Set Up First Admin](#7-set-up-first-admin)
8. [Testing Your Setup](#8-testing-your-setup)

---

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `maquinaria-japonesa` (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the closest to Spain (e.g., `eu-west-1` Frankfurt)
4. Click "Create new project"
5. Wait for the project to be provisioned (~2 minutes)

---

## 2. Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open `/supabase/001-schema.sql` from this project
4. Copy and paste the entire contents into the SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. Verify success: You should see "Success. No rows returned"

### Verify Tables Created

Go to **Table Editor** in the sidebar. You should see:

- `categories`
- `brands`
- `products`
- `homepage_sections`
- `faq`
- `contact_settings`
- `social_links`
- `admins`
- `contact_submissions`
- `analytics_events`

---

## 3. Configure Row Level Security

1. In **SQL Editor**, create a new query
2. Open `/supabase/002-rls-policies.sql`
3. Copy and paste the entire contents
4. Click "Run"

### Verify RLS Enabled

1. Go to **Table Editor**
2. Click on any table (e.g., `products`)
3. Click the shield icon or go to "Policies"
4. You should see:
   - RLS is enabled
   - Multiple policies listed

---

## 4. Set Up Storage Buckets

1. In **SQL Editor**, create a new query
2. Open `/supabase/004-storage-buckets.sql`
3. Copy and paste the entire contents
4. Click "Run"

### Verify Storage Buckets

1. Go to **Storage** in the sidebar
2. You should see these buckets:
   - `products` (10MB limit, images only)
   - `brands` (5MB limit, images + SVG)
   - `categories` (5MB limit, images only)
   - `homepage` (10MB limit, images only)

---

## 5. Seed Initial Data

1. In **SQL Editor**, create a new query
2. Open `/supabase/003-seed-data.sql`
3. Copy and paste the entire contents
4. Click "Run"

### Verify Seed Data

Go to **Table Editor** and check:

- `categories`: 5 categories
- `brands`: 5 Japanese brands
- `homepage_sections`: 4 sections
- `faq`: 8 questions
- `contact_settings`: 5 settings
- `social_links`: 4 links

---

## 6. Configure Environment Variables

1. In Supabase, go to **Settings** → **API**
2. Copy these values to your `.env.local`:

```bash
# From "Project URL"
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# From "anon public" key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# From "service_role" key (KEEP SECRET!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Important Security Note

- `NEXT_PUBLIC_*` variables are safe to expose (they're public)
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed to the client
- The service role key bypasses RLS - only use server-side

---

## 7. Set Up First Admin

After setting up Clerk authentication:

1. Sign up/in to your admin dashboard
2. Copy your Clerk User ID from Clerk Dashboard → Users
3. In Supabase **SQL Editor**, run:

```sql
INSERT INTO admins (clerk_user_id, email, name, role, active)
VALUES (
  'user_xxxxxxxxxxxxx',  -- Your Clerk User ID
  'your@email.com',      -- Your email
  'Your Name',           -- Your name
  'super_admin',         -- Role
  true                   -- Active
);
```

4. Verify in **Table Editor** → `admins`

---

## 8. Testing Your Setup

### Test Public Access

```bash
# In your terminal
curl "YOUR_SUPABASE_URL/rest/v1/categories?select=*&active=eq.true" \
  -H "apikey: YOUR_ANON_KEY"
```

You should get the 5 categories.

### Test RLS Protection

```bash
# Try to read products (should return published only)
curl "YOUR_SUPABASE_URL/rest/v1/products?select=*" \
  -H "apikey: YOUR_ANON_KEY"
```

### Test Admin Restrictions

```bash
# Try to insert without auth (should fail)
curl "YOUR_SUPABASE_URL/rest/v1/products" \
  -X POST \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
```

Should return an error (RLS policy violation).

---

## Storage Configuration

### Upload Test Image

1. Go to **Storage** → `products`
2. Click "Upload files"
3. Select a test image (JPG, PNG, or WebP)
4. The upload should succeed

### Get Public URL

1. Click on the uploaded file
2. Click "Get URL"
3. The public URL should work in a browser

---

## Troubleshooting

### "relation does not exist"

- Make sure you ran `001-schema.sql` first
- Check for any SQL errors in the output

### "permission denied"

- RLS is working correctly
- Use service role key for admin operations
- Or authenticate properly as an admin

### "storage bucket not found"

- Run `004-storage-buckets.sql`
- Check Storage section in dashboard

### "violates row-level security policy"

- The user doesn't have permission
- Check that admin is in `admins` table
- Verify Clerk User ID matches

---

## Database Maintenance

### Backup

Supabase provides automatic daily backups on Pro plan. For free tier:

```sql
-- Export your data periodically
-- Use pg_dump or Supabase CLI
```

### Migrations

For future schema changes:

1. Create new migration file (e.g., `005-add-feature.sql`)
2. Test in development/staging first
3. Run in production during low-traffic period
4. Keep migrations idempotent when possible

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **GitHub Issues**: Report bugs in the project repository
