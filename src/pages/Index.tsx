import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Footer } from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        
      </main>
      <Footer />
    </div>;
};
export default Index;