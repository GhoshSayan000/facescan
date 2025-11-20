import { Card, CardContent } from "@/components/ui/card";
import { Camera, Send, CheckCircle } from "lucide-react";

export const WorkflowSection = () => {
  const steps = [
    {
      icon: Camera,
      title: "Face Recognition",
      description: "Student stands in front of camera and AI captures their face instantly",
      color: "primary",
    },
    {
      icon: Send,
      title: "Quick Request",
      description: "If attendance is missed, student taps 'Ping Teacher' button to send request",
      color: "warning",
    },
    {
      icon: CheckCircle,
      title: "Instant Approval",
      description: "Teacher reviews and approves the request, updating attendance immediately",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and efficient attendance process in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-warning to-accent -z-10"></div>

          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative hover-lift animate-fade-in-up border-2"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="pt-12 text-center">
                <div className={`bg-${step.color} absolute -top-8 left-1/2 -translate-x-1/2 rounded-full p-6 shadow-lg`}>
                  <step.icon className={`h-8 w-8 text-${step.color}-foreground`} />
                </div>
                
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-accent/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-accent/20">
            <p className="text-lg font-medium">
              ⚡ Average process time: <span className="text-accent font-bold">Less than 5 seconds</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
