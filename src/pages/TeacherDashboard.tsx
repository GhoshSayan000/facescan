import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Check, 
  X, 
  Bell,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/teacher-login");
      return;
    }

    // Check if user has teacher role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "teacher")
      .maybeSingle();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You don't have teacher access",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const students = [
    { name: "John Doe", status: "present", time: "09:02 AM" },
    { name: "Jane Smith", status: "present", time: "09:01 AM" },
    { name: "Mike Johnson", status: "pending", time: "---" },
    { name: "Sarah Wilson", status: "absent", time: "---" },
  ];

  const requests = [
    { name: "Mike Johnson", reason: "Attendance not marked", time: "2 min ago" },
    { name: "Emily Brown", reason: "Medical leave request", time: "5 min ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Live Face Scanning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera Feed Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Attendance List</span>
                <Badge variant="secondary">32 Students</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {students.map((student, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      student.status === "present" ? "bg-accent" : 
                      student.status === "pending" ? "bg-warning" : "bg-destructive"
                    }`}></div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{student.time}</span>
                    <Badge variant={
                      student.status === "present" ? "default" : 
                      student.status === "pending" ? "secondary" : "destructive"
                    }>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Student Requests
                <Badge variant="secondary">2 New</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requests.map((request, i) => (
                <div key={i} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{request.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
