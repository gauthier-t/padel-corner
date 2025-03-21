/*
  # Add admin flag to profiles

  1. Changes
    - Add is_admin column to profiles table
    - Add policy for admin operations on courts table
*/

-- Add admin flag to profiles
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Add admin policies for courts table
CREATE POLICY "Admins can insert courts"
  ON courts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update courts"
  ON courts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );