import { Hero } from "@/components/Hero";
import { ARExperience } from "@/components/ARExperience";
import { ArtisansSection } from "@/components/ArtisansSection";
import { RewardsSection } from "@/components/RewardsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ARExperience />
      <ArtisansSection />
      <RewardsSection />
      <Footer />
    </div>
  );
};

export default Index;
