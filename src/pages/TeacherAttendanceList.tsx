import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherAttendanceList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);

  const classId = searchParams.get("class");
  const semesterId = searchParams.get("semester");
  const date = searchParams.get("date");

  useEffect(() => {
    checkAuth();
    fetchAttendance();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/teacher-login");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "teacher")
      .maybeSingle();

    if (!roles) {
      navigate("/");
      return;
    }

    setLoading(false);
  };

  const fetchAttendance = async () => {
    // Mock data for now - in production, fetch from database
    const mockData = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      status: ["present", "absent", "pending"][Math.floor(Math.random() * 3)],
      time: i % 3 === 0 ? "09:0" + (i % 10) + " AM" : "---",
    }));
    
    setAttendanceList(mockData);
  };

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
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Full Attendance List</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Students</span>
              <Badge variant="secondary">{attendanceList.length} Total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attendanceList.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        student.status === "present"
                          ? "bg-accent"
                          : student.status === "pending"
                          ? "bg-warning"
                          : "bg-destructive"
                      }`}
                    />
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{student.time}</span>
                    <Badge
                      variant={
                        student.status === "present"
                          ? "default"
                          : student.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
