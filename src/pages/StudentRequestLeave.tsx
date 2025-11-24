import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CalendarIcon, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Teacher = {
  id: string;
  full_name: string | null;
};

export default function StudentRequestLeave() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [studentClass, setStudentClass] = useState<any>(null);
  const [studentSemester, setStudentSemester] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/student-login");
      return;
    }

    setLoading(false);
  };

  const fetchData = async () => {
    // Fetch teachers (users with teacher role)
    const { data: teacherRoles } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "teacher");

    if (teacherRoles && teacherRoles.length > 0) {
      const teacherIds = teacherRoles.map(r => r.user_id);
      const { data: teachersData } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", teacherIds);
      
      setTeachers(teachersData || []);
    }

    const { data: classesData } = await supabase.from("classes").select("*").limit(1).single();
    const { data: semestersData } = await supabase.from("semesters").select("*").limit(1).single();
    
    setStudentClass(classesData);
    setStudentSemester(semestersData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const uploadFile = async (userId: string): Promise<string | null> => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('student-requests')
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    return fileName;
  };

  const handleSubmit = async () => {
    if (!selectedDate || !reason || !selectedTeacher) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in",
          variant: "destructive",
        });
        return;
      }

      // Upload file if provided
      let filePath = null;
      if (file) {
        filePath = await uploadFile(session.user.id);
        if (!filePath) {
          toast({
            title: "Error",
            description: "Failed to upload file",
            variant: "destructive",
          });
          setSubmitting(false);
          return;
        }
      }

      const { error } = await supabase.from("student_requests").insert({
        type: "leave",
        student_id: session.user.id,
        teacher_id: selectedTeacher,
        class_id: studentClass?.id,
        semester_id: studentSemester?.id,
        subject_id: null,
        date: format(selectedDate, "yyyy-MM-dd"),
        message: reason,
        file_path: filePath,
        status: "pending",
      });

      if (error) {
        console.error("Insert error:", error);
        toast({
          title: "Error",
          description: "Failed to submit request",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Leave request submitted successfully",
        });
        navigate("/student-dashboard");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = selectedDate && reason.trim() && selectedTeacher;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Request Leave</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit Leave Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Leave Reason <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Explain your reason for requesting leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                File/Image Attachment (Optional)
              </label>
              {!file ? (
                <div>
                  <Input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="w-full" type="button" asChild>
                      <span className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Supporting Document
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: Images, PDF, DOC (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Subject To (Teacher) <span className="text-destructive">*</span>
              </label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.full_name || "Unnamed Teacher"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Apply For Date <span className="text-destructive">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-2">
                Only today and future dates can be selected
              </p>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSubmit}
              disabled={!isFormValid || submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
