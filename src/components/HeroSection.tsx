import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import cameraInterface from "@/assets/camera-interface-mockup.jpg";

export const HeroSection = () => {
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    cameraInputRef.current?.click();
  };

  return (
    <section id="home" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent -z-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-primary/15 shadow-soft">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI-Powered Attendance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Smart Attendance.{" "}
              <span className="gradient-text">Zero Roll Call.</span>{" "}
              Instant Recognition.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
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

            <div className="flex items-center gap-6 pt-6">
              <div className="text-center px-4 py-3 rounded-xl bg-card/50 border border-transparent hover:border-primary/20 hover:bg-primary/10 hover:scale-110 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
              </div>
              <div className="h-14 w-px bg-border/60"></div>
              <div className="text-center px-4 py-3 rounded-xl bg-card/50 border border-transparent hover:border-primary/20 hover:bg-primary/10 hover:scale-110 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-primary">&lt;2s</div>
                <div className="text-sm text-muted-foreground mt-1">Recognition Time</div>
              </div>
              <div className="h-14 w-px bg-border/60"></div>
              <div className="text-center px-4 py-3 rounded-xl bg-card/50 border border-transparent hover:border-primary/20 hover:bg-primary/10 hover:scale-110 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300 cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[2rem] blur-2xl -z-10"></div>
            <div className="relative cursor-pointer group" onClick={handleImageClick}>
              <img
                src={cameraInterface}
                alt="Face recognition camera interface for attendance"
                className="rounded-2xl shadow-[var(--shadow-elegant)] w-full hover:scale-[1.02] transition-transform duration-500 border border-border/30"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium shadow-lg">
                  📸 Open Camera
                </div>
              </div>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  console.log("Camera image captured:", e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
