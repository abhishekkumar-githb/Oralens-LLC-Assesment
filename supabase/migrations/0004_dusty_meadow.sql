/*
  # Update member policies and add events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Update member policies
    - Add events policies
*/

-- Drop existing member policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.members;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.members;

-- Create new member policies
CREATE POLICY "Enable all operations for authenticated users"
ON public.members
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create events policies
CREATE POLICY "Enable read access for authenticated users"
ON events
FOR SELECT
TO authenticated
USING (true);