import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, History, ChevronDown } from "lucide-react";

export default function StudentAttendanceHistory() {
  const navigate = useNavigate();
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

    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const history = [
    {
      date: "Monday, Nov 18, 2024",
      attended: 4,
      total: 4,
      subjects: [
        { name: "Mathematics", status: "present" },
        { name: "Physics", status: "present" },
        { name: "Chemistry", status: "present" },
        { name: "English", status: "present" },
      ],
    },
    {
      date: "Friday, Nov 15, 2024",
      attended: 3,
      total: 4,
      subjects: [
        { name: "Mathematics", status: "present" },
        { name: "Physics", status: "present" },
        { name: "Chemistry", status: "absent" },
        { name: "English", status: "present" },
      ],
    },
    {
      date: "Thursday, Nov 14, 2024",
      attended: 4,
      total: 4,
      subjects: [
        { name: "Mathematics", status: "present" },
        { name: "Physics", status: "present" },
        { name: "Chemistry", status: "present" },
        { name: "English", status: "present" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <History className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold">Attendance History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Past Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.map((day, i) => (
                <Collapsible key={i}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium">{day.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {day.attended}/{day.total} classes attended
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${(day.attended / day.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-accent">
                        {Math.round((day.attended / day.total) * 100)}%
                      </span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 px-4">
                    <div className="space-y-2">
                      {day.subjects.map((subject, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between p-3 rounded-lg bg-background border"
                        >
                          <span className="text-sm">{subject.name}</span>
                          <Badge
                            variant={
                              subject.status === "present" ? "default" : "destructive"
                            }
                          >
                            {subject.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
