import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./pages/StudentLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherSetup from "./pages/TeacherSetup";
import TeacherAttendanceList from "./pages/TeacherAttendanceList";
import TeacherRequests from "./pages/TeacherRequests";
import StudentTodayAttendance from "./pages/StudentTodayAttendance";
import StudentAttendanceHistory from "./pages/StudentAttendanceHistory";
import StudentRequestAttendance from "./pages/StudentRequestAttendance";
import StudentRequestLeave from "./pages/StudentRequestLeave";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher/setup" element={<TeacherSetup />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/attendance-list" element={<TeacherAttendanceList />} />
          <Route path="/teacher/requests" element={<TeacherRequests />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student/today-attendance" element={<StudentTodayAttendance />} />
          <Route path="/student/attendance-history" element={<StudentAttendanceHistory />} />
          <Route path="/student/request-attendance" element={<StudentRequestAttendance />} />
          <Route path="/student/request-leave" element={<StudentRequestLeave />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
