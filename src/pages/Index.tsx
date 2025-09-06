import { Hero } from "@/components/Hero";
import { KonarkTempleSection } from "@/components/KonarkTempleSection";
import { ARExperience } from "@/components/ARExperience";
import { ArtisansSection } from "@/components/ArtisansSection";
import { RewardsSection } from "@/components/RewardsSection";
import SouvenirGenerator from "@/components/SouvenirGenerator";
import { Footer } from "@/components/Footer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
      };
    }
  }
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <KonarkTempleSection />
      <ARExperience />
      <ArtisansSection />
      <RewardsSection />
      <SouvenirGenerator />
      <Footer />
      <elevenlabs-convai agent-id="agent_7601k4etqsezf0dtwehskzky3b91"></elevenlabs-convai>
    </div>
  );
};

export default Index;
