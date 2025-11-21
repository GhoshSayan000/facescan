import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Check, X, AlertCircle, TrendingUp, Calendar, Bell, MessageSquare } from "lucide-react";
export const DashboardPreview = () => {
  return <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a glimpse of the intuitive dashboards designed for teachers and students
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Teacher Dashboard */}
          <div className="space-y-6 animate-fade-in-up cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => window.location.href = '/teacher-login'}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Teacher Dashboard</h3>
            </div>

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
                {[{
                name: "John Doe",
                status: "present",
                time: "09:02 AM"
              }, {
                name: "Jane Smith",
                status: "present",
                time: "09:01 AM"
              }, {
                name: "Mike Johnson",
                status: "pending",
                time: "---"
              }, {
                name: "Sarah Wilson",
                status: "absent",
                time: "---"
              }].map((student, i) => <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${student.status === "present" ? "bg-accent" : student.status === "pending" ? "bg-warning" : "bg-destructive"}`}></div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{student.time}</span>
                      <Badge variant={student.status === "present" ? "default" : student.status === "pending" ? "secondary" : "destructive"}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>)}
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
                {[{
                name: "Mike Johnson",
                reason: "Attendance not marked",
                time: "2 min ago"
              }, {
                name: "Emily Brown",
                reason: "Medical leave request",
                time: "5 min ago"
              }].map((request, i) => <div key={i} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
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
                  </div>)}
              </CardContent>
            </Card>
          </div>

          {/* Student Dashboard */}
          <div className="space-y-6 animate-fade-in-up cursor-pointer hover:scale-[1.02] transition-transform" style={{
          animationDelay: "0.2s"
        }} onClick={() => window.location.href = '/student-login'}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent rounded-lg p-2">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Student Dashboard</h3>
            </div>

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
                  {[{
                  date: "Today",
                  percentage: 75,
                  classes: "3/4"
                }, {
                  date: "Yesterday",
                  percentage: 100,
                  classes: "4/4"
                }, {
                  date: "2 days ago",
                  percentage: 100,
                  classes: "4/4"
                }, {
                  date: "3 days ago",
                  percentage: 75,
                  classes: "3/4"
                }].map((day, i) => <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{day.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{day.classes} classes</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{
                        width: `${day.percentage}%`
                      }}></div>
                        </div>
                        <span className="text-sm font-bold text-accent">{day.percentage}%</span>
                      </div>
                    </div>)}
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
        </div>
      </div>
    </section>;
};