import { AboutSection } from "@/components/AboutSection";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScheduleExperience } from "@/components/ScheduleExperience";
import { SpeakersSection } from "@/components/SpeakersSection";
import { StandSection } from "@/components/StandSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ScheduleExperience />
        <AboutSection />
        <SpeakersSection />
        <StandSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
