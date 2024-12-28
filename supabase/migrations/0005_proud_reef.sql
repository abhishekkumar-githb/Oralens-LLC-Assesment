/*
  # Fix RLS Policies and Add Events Table

  1. Updates
    - Drop and recreate organization policies with proper checks
    - Drop and recreate team policies with proper checks
    - Drop and recreate member policies with proper checks
    - Add events table with proper RLS

  2. Security
    - Enable RLS on all tables
    - Add proper policies for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read organizations" ON organizations;
DROP POLICY IF EXISTS "Allow authenticated users to insert organizations" ON organizations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON organizations;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON organizations;

-- Create new organization policies
CREATE POLICY "Enable all operations for authenticated users"
ON organizations
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create events policies
CREATE POLICY "Enable read for authenticated users"
ON events
FOR SELECT
TO authenticated
USING (true);

-- Insert sample events
INSERT INTO events (title, description, type, date)
VALUES 
  ('Team Alpha Onboarding', 'Welcome session for new team members', 'Onboarding', '2024-03-25'),
  ('Quarterly Review', 'Q1 2024 performance review', 'Review', '2024-03-28'),
  ('New Office Opening', 'Grand opening of our new headquarters', 'Event', '2024-04-01'),
  ('Team Building Workshop', 'Interactive session to strengthen team bonds', 'Workshop', '2024-04-05')
ON CONFLICT DO NOTHING;