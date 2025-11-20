import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">AI-Powered Attendance</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Smart Attendance.{" "}
              <span className="gradient-text">Zero Roll Call.</span>{" "}
              Instant Recognition.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              AI-powered face detection makes attendance automatic, fast, and accurate. 
              Say goodbye to manual roll calls and hello to seamless classroom management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/teacher-login">
                <Button size="lg" className="w-full sm:w-auto group font-medium">
                  Try as Teacher
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/student-login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium">
                  Try as Student
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div>
                <div className="text-3xl font-bold text-primary">&lt;2s</div>
                <div className="text-sm text-muted-foreground">Recognition Time</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl -z-10"></div>
            <img
              src="/placeholder.svg"
              alt="Students using face recognition attendance"
              className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
