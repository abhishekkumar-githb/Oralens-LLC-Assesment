-- Create a storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profiles', 'profiles', true);

-- Create a policy to allow public access to profile images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'profiles' );