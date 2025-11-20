import { Button } from "@/components/ui/button";
import { Camera, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary rounded-lg p-2">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">FaceScan Attendance</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <Link to="/teacher-login">
              <Button variant="outline" className="font-medium">
                Teacher Login
              </Button>
            </Link>
            <Link to="/student-login">
              <Button className="font-medium">Student Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in-up">
            <a
              href="#home"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <Link to="/teacher-login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full font-medium">
                Teacher Login
              </Button>
            </Link>
            <Link to="/student-login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full font-medium">Student Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
