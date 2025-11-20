import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Edit, 
  Bell, 
  MessageSquare, 
  Clock, 
  FileText, 
  CheckCircle2,
  Users
} from "lucide-react";

export const FeaturesSection = () => {
  const teacherFeatures = [
    {
      icon: Camera,
      title: "Face-Image Attendance",
      description: "Automatically marks students present using live camera snapshot with AI recognition.",
    },
    {
      icon: Edit,
      title: "Manual Override",
      description: "Teachers can review and correct missed or incorrect attendance entries instantly.",
    },
    {
      icon: MessageSquare,
      title: "Student Requests Panel",
      description: "Receive pings from students for attendance correction or medical/event leave requests.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get real-time alerts when students request attendance reconsideration or submit leave.",
    },
  ];

  const studentFeatures = [
    {
      icon: Clock,
      title: "Real-Time Attendance Status",
      description: "View your attendance status instantly after each class with complete history.",
    },
    {
      icon: MessageSquare,
      title: "Ping Teacher Button",
      description: "Quick action to notify teacher if attendance was not marked or marked incorrectly.",
    },
    {
      icon: FileText,
      title: "Medical/Event Leave Requests",
      description: "Submit leave requests with proof directly through the app for quick approval.",
    },
    {
      icon: CheckCircle2,
      title: "Fast Issue Resolution",
      description: "No long formalities — teacher approves instantly, keeping records accurate.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed to streamline attendance management for both teachers and students
          </p>
        </div>

        {/* Teacher Features */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary rounded-lg p-2">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold">For Teachers</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teacherFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="hover-lift border-2 hover:border-primary/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Features */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent rounded-lg p-2">
              <Users className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold">For Students</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="hover-lift border-2 hover:border-accent/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="bg-accent/10 rounded-lg p-3 w-fit mb-3">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
