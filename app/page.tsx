import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { DestinationsSection } from "@/components/destinations-section";
import { AIPlannerSection } from "@/components/ai-planner-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <AIPlannerSection />
      <AboutSection />
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
