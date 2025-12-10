import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, ChevronDown, FileText, LogOut, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "CSE", "CSE-DS", "CSE-AIML", "IT", "ME", "EE", "ECE", "AUE", "MBA", "MCA", "BBA"
];

const getYearsForDepartment = (department: string): number[] => {
  if (["MBA"].includes(department)) return [1, 2];
  if (["MCA", "BBA"].includes(department)) return [1, 2, 3];
  return [1, 2, 3, 4];
};

export default function TeacherSetup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const availableYears = selectedDepartment ? getYearsForDepartment(selectedDepartment) : [];

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  // Reset year when department changes
  useEffect(() => {
    setSelectedYear("");
  }, [selectedDepartment]);

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

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data: requestsData } = await supabase
        .from("student_requests")
        .select(`
          *,
          student:student_id(id),
          class:class_id(name),
          semester:semester_id(name),
          subject:subject_id(name)
        `)
        .eq("teacher_id", session.user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      
      setRequests(requestsData || []);
    }
  };

  const handleConfirm = () => {
    if (selectedDepartment && selectedYear && selectedDate) {
      navigate(`/teacher/dashboard?department=${selectedDepartment}&year=${selectedYear}&date=${format(selectedDate, "yyyy-MM-dd")}`);
    }
  };

  const handleRequestAction = async (requestId: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("student_requests")
      .update({ status })
      .eq("id", requestId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Request ${status}`,
      });
      fetchData();
      setShowRequestModal(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const leaveRequests = requests.filter(r => r.type === "leave");
  const correctionRequests = requests.filter(r => r.type === "attendance_correction");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Teacher Setup</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Session Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Year</label>
                <Select 
                  value={selectedYear} 
                  onValueChange={setSelectedYear}
                  disabled={!selectedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedDepartment ? "Choose a year" : "Select department first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Date</label>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!selectedDepartment || !selectedYear || !selectedDate}
                onClick={handleConfirm}
              >
                Confirm & Continue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Requests Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted hover:bg-muted/80">
                  <span className="font-medium">Leave Requests ({leaveRequests.length})</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {leaveRequests.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-lg bg-background border cursor-pointer hover:border-primary"
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowRequestModal(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">Student Request</p>
                          <p className="text-xs text-muted-foreground">
                            {req.class?.name} • {req.semester?.name}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(req.date), "MMM dd")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{req.message}</p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(req.id, "approved");
                          }}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(req.id, "rejected");
                          }}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  {leaveRequests.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No pending leave requests
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted hover:bg-muted/80">
                  <span className="font-medium">Attendance Corrections ({correctionRequests.length})</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {correctionRequests.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-lg bg-background border cursor-pointer hover:border-primary"
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowRequestModal(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">Student Request</p>
                          <p className="text-xs text-muted-foreground">
                            {req.subject?.name} • {format(new Date(req.date), "MMM dd")}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{req.message}</p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(req.id, "approved");
                          }}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(req.id, "rejected");
                          }}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  {correctionRequests.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No pending correction requests
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground capitalize">{selectedRequest.type.replace("_", " ")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">{format(new Date(selectedRequest.date), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Class & Semester</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.class?.name} • {selectedRequest.semester?.name}
                </p>
              </div>
              {selectedRequest.subject && (
                <div>
                  <p className="text-sm font-medium">Subject</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.subject.name}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium">Message</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.message}</p>
              </div>
              {selectedRequest.file_path && (
                <div>
                  <p className="text-sm font-medium">Attachment</p>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View File
                  </Button>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => handleRequestAction(selectedRequest.id, "approved")}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleRequestAction(selectedRequest.id, "rejected")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
