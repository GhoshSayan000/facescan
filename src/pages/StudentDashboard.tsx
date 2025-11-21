import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/student-login");
      return;
    }

    // Check if user has student role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "student")
      .maybeSingle();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You don't have student access",
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

  const attendanceHistory = [
    { date: "Today", percentage: 75, classes: "3/4" },
    { date: "Yesterday", percentage: 100, classes: "4/4" },
    { date: "2 days ago", percentage: 100, classes: "4/4" },
    { date: "3 days ago", percentage: 75, classes: "3/4" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-lg p-2">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Today's Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-accent/10">
                  <Check className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent">3</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/10">
                  <AlertCircle className="h-6 w-6 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-warning">1</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-destructive/10">
                  <X className="h-6 w-6 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold text-destructive">0</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceHistory.map((day, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">{day.date}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{day.classes} classes</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${day.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-accent">{day.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ping Teacher for Attendance
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Request Medical Leave
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
