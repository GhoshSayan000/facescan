import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type Feature = {
  icon: any;
  title: string;
  description: string;
  details: {
    fullDescription: string;
    steps: string[];
    benefits: string[];
  };
};

export const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const teacherFeatures: Feature[] = [
    {
      icon: Camera,
      title: "Face-Image Attendance",
      description: "Automatically marks students present using live camera snapshot with AI recognition.",
      details: {
        fullDescription: "Our advanced AI-powered facial recognition system automatically identifies and marks students present as they enter the classroom. No manual roll call needed!",
        steps: [
          "Open the camera interface from your teacher dashboard",
          "Position the camera to capture students as they enter",
          "The AI automatically recognizes registered faces",
          "Attendance is marked instantly in real-time",
          "Review and confirm the attendance list"
        ],
        benefits: [
          "Saves 10-15 minutes of class time daily",
          "99% accuracy with AI recognition",
          "Eliminates proxy attendance",
          "Instant attendance records",
          "Works with large class sizes"
        ]
      }
    },
    {
      icon: Edit,
      title: "Manual Override",
      description: "Teachers can review and correct missed or incorrect attendance entries instantly.",
      details: {
        fullDescription: "Sometimes technology needs a human touch. Quickly review and correct any attendance discrepancies with our intuitive manual override system.",
        steps: [
          "Navigate to the attendance list for your class",
          "Click on any student's attendance status",
          "Select Present, Absent, or Pending",
          "Add optional notes for your records",
          "Changes are saved automatically"
        ],
        benefits: [
          "Fix missed detections immediately",
          "Handle special cases (late arrivals, early departures)",
          "Maintain 100% accurate records",
          "Add context with notes",
          "Complete audit trail of changes"
        ]
      }
    },
    {
      icon: MessageSquare,
      title: "Student Requests Panel",
      description: "Receive pings from students for attendance correction or medical/event leave requests.",
      details: {
        fullDescription: "Centralized hub for all student requests. Handle attendance corrections and leave requests efficiently from one place.",
        steps: [
          "Access the Requests Panel from your dashboard",
          "View all pending student requests",
          "Click on any request to see full details",
          "Review attached documents or proof",
          "Approve or reject with one click"
        ],
        benefits: [
          "No paper forms needed",
          "All requests in one place",
          "Quick approval workflow",
          "Automatic notifications to students",
          "Complete request history"
        ]
      }
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get real-time alerts when students request attendance reconsideration or submit leave.",
      details: {
        fullDescription: "Stay informed with real-time notifications. Never miss an important student request or attendance issue.",
        steps: [
          "Enable notifications in your profile settings",
          "Receive instant alerts for new requests",
          "See notification badges on your dashboard",
          "Click to view and respond immediately",
          "Notifications sync across all devices"
        ],
        benefits: [
          "Respond to urgent requests quickly",
          "Never miss important communications",
          "Improve student satisfaction",
          "Real-time updates",
          "Multi-device support"
        ]
      }
    },
  ];

  const studentFeatures: Feature[] = [
    {
      icon: Clock,
      title: "Real-Time Attendance Status",
      description: "View your attendance status instantly after each class with complete history.",
      details: {
        fullDescription: "Track your attendance in real-time. See your status for each class immediately and monitor your attendance percentage throughout the semester.",
        steps: [
          "Login to your student dashboard",
          "View today's attendance on the main screen",
          "Check status: Present, Absent, or Pending",
          "Access detailed history anytime",
          "Monitor your attendance percentage"
        ],
        benefits: [
          "Always know your attendance status",
          "Plan ahead to meet requirements",
          "No surprises at semester end",
          "Complete transparency",
          "Historical data available"
        ]
      }
    },
    {
      icon: MessageSquare,
      title: "Request Attendance Correction",
      description: "Quick action to notify teacher if attendance was not marked or marked incorrectly.",
      details: {
        fullDescription: "Found an error in your attendance? Request a correction instantly with our streamlined process. Provide context and proof for quick resolution.",
        steps: [
          "Select 'Request Attendance Correction' from dashboard",
          "Choose the date and subject",
          "Explain the issue clearly",
          "Attach proof if available (optional)",
          "Submit and track your request status"
        ],
        benefits: [
          "Fix errors quickly",
          "Direct communication with teacher",
          "Attach supporting documents",
          "Track request status",
          "Fast resolution"
        ]
      }
    },
    {
      icon: FileText,
      title: "Leave Requests",
      description: "Submit leave requests with proof directly through the app for quick approval.",
      details: {
        fullDescription: "Need to take leave? Submit your request digitally with supporting documents. No paper forms, no long queues - just quick, efficient processing.",
        steps: [
          "Click 'Request Leave' from your dashboard",
          "Select the date(s) for leave",
          "Choose specific subject or full day",
          "Provide reason and attach proof",
          "Submit and receive instant confirmation"
        ],
        benefits: [
          "Paperless process",
          "Submit from anywhere",
          "Attach medical certificates easily",
          "Get quick approvals",
          "Digital proof of submission"
        ]
      }
    },
    {
      icon: CheckCircle2,
      title: "Fast Issue Resolution",
      description: "No long formalities — teacher approves instantly, keeping records accurate.",
      details: {
        fullDescription: "Experience lightning-fast resolution of attendance issues. Teachers can review and approve your requests within minutes, not days.",
        steps: [
          "Submit your request through the app",
          "Teacher receives instant notification",
          "Teacher reviews with all context visible",
          "One-click approval or rejection",
          "You receive immediate notification of decision"
        ],
        benefits: [
          "Resolution in minutes, not days",
          "No administrative delays",
          "Direct teacher communication",
          "Transparent process",
          "Peace of mind"
        ]
      }
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
                className="hover-lift border-2 hover:border-primary/50 animate-fade-in-up cursor-pointer transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedFeature(feature)}
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
                className="hover-lift border-2 hover:border-accent/50 animate-fade-in-up cursor-pointer transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedFeature(feature)}
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

        {/* Feature Details Modal */}
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedFeature && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <selectedFeature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl">{selectedFeature.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    {selectedFeature.details.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* How It Works */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-sm text-primary">1</span>
                      How It Works
                    </h3>
                    <ol className="space-y-2">
                      {selectedFeature.details.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <span className="bg-accent/10 rounded-full w-6 h-6 flex items-center justify-center text-sm text-accent">✓</span>
                      Key Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
