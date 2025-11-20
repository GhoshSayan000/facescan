import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StudentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back, Student!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gradient-hero)] p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border-2 shadow-xl animate-fade-in-up">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto bg-accent rounded-2xl p-4 w-fit">
              <Camera className="h-10 w-10 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">Student Login</CardTitle>
              <CardDescription className="text-base mt-2">
                View your attendance status and history
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="STU123456"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full h-11 font-medium">
                <Camera className="h-4 w-4 mr-2" />
                Login with Face Recognition
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              New student?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Register Now
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;
