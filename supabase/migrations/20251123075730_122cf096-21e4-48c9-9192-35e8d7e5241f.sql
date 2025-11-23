-- Create classes table
CREATE TABLE public.classes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create semesters table
CREATE TABLE public.semesters (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create subjects table
CREATE TABLE public.subjects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  semester_id uuid NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(name, semester_id, class_id)
);

-- Create attendance records table
CREATE TABLE public.attendance_records (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  semester_id uuid NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'pending')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(student_id, subject_id, date)
);

-- Create student requests enum
CREATE TYPE public.request_type AS ENUM ('attendance_correction', 'leave');
CREATE TYPE public.request_status AS ENUM ('pending', 'approved', 'rejected');

-- Create student requests table
CREATE TABLE public.student_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type request_type NOT NULL,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  semester_id uuid NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
  date date NOT NULL,
  message text NOT NULL,
  file_path text,
  status request_status NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for classes (everyone can view)
CREATE POLICY "Everyone can view classes"
ON public.classes FOR SELECT
USING (true);

-- RLS Policies for semesters (everyone can view)
CREATE POLICY "Everyone can view semesters"
ON public.semesters FOR SELECT
USING (true);

-- RLS Policies for subjects (everyone can view)
CREATE POLICY "Everyone can view subjects"
ON public.subjects FOR SELECT
USING (true);

-- RLS Policies for attendance_records
CREATE POLICY "Students can view their own attendance"
ON public.attendance_records FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view attendance for their subjects"
ON public.attendance_records FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.subjects
    WHERE subjects.id = attendance_records.subject_id
    AND subjects.teacher_id = auth.uid()
  )
);

CREATE POLICY "Teachers can insert attendance"
ON public.attendance_records FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.subjects
    WHERE subjects.id = subject_id
    AND subjects.teacher_id = auth.uid()
  )
);

CREATE POLICY "Teachers can update attendance for their subjects"
ON public.attendance_records FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.subjects
    WHERE subjects.id = attendance_records.subject_id
    AND subjects.teacher_id = auth.uid()
  )
);

-- RLS Policies for student_requests
CREATE POLICY "Students can view their own requests"
ON public.student_requests FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view requests assigned to them"
ON public.student_requests FOR SELECT
USING (auth.uid() = teacher_id);

CREATE POLICY "Students can create requests"
ON public.student_requests FOR INSERT
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can update request status"
ON public.student_requests FOR UPDATE
USING (auth.uid() = teacher_id);

-- Add triggers for updated_at
CREATE TRIGGER update_attendance_records_updated_at
BEFORE UPDATE ON public.attendance_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_requests_updated_at
BEFORE UPDATE ON public.student_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.classes (name) VALUES 
  ('Class A'),
  ('Class B'),
  ('Class C');

INSERT INTO public.semesters (name, start_date, end_date) VALUES 
  ('Fall 2024', '2024-09-01', '2024-12-31'),
  ('Spring 2025', '2025-01-01', '2025-05-31');