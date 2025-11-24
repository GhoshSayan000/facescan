-- Create storage bucket for student request files
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-requests', 'student-requests', false);

-- RLS policies for student requests bucket
CREATE POLICY "Students can upload their own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'student-requests' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Students can view their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'student-requests' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Teachers can view all request files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'student-requests' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);