import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function TeacherRequests() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchRequests();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/teacher-login");
      return;
    }

    setLoading(false);
  };

  const fetchRequests = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data } = await supabase
        .from("student_requests")
        .select(`
          *,
          class:class_id(name),
          semester:semester_id(name),
          subject:subject_id(name)
        `)
        .eq("teacher_id", session.user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      
      setRequests(data || []);
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
      fetchRequests();
      setShowModal(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const leaveRequests = requests.filter((r) => r.type === "leave");
  const correctionRequests = requests.filter((r) => r.type === "attendance_correction");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">All Student Requests</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="corrections" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="corrections">
              Attendance Corrections ({correctionRequests.length})
            </TabsTrigger>
            <TabsTrigger value="leave">Leave Requests ({leaveRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="corrections" className="mt-6">
            <div className="space-y-3">
              {correctionRequests.map((req) => (
                <Card
                  key={req.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    setSelectedRequest(req);
                    setShowModal(true);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Student Request</p>
                        <p className="text-sm text-muted-foreground">
                          {req.subject?.name} • {format(new Date(req.date), "PPP")}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(req.created_at), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{req.message}</p>
                    <div className="flex gap-2">
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
                  </CardContent>
                </Card>
              ))}
              {correctionRequests.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No pending correction requests</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leave" className="mt-6">
            <div className="space-y-3">
              {leaveRequests.map((req) => (
                <Card
                  key={req.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    setSelectedRequest(req);
                    setShowModal(true);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Leave Request</p>
                        <p className="text-sm text-muted-foreground">
                          {req.class?.name} • {req.semester?.name} • {format(new Date(req.date), "PPP")}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(req.created_at), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{req.message}</p>
                    <div className="flex gap-2">
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
                  </CardContent>
                </Card>
              ))}
              {leaveRequests.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No pending leave requests</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {selectedRequest.type.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedRequest.date), "PPP")}
                </p>
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
                <p className="text-sm font-medium">Full Reason</p>
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
