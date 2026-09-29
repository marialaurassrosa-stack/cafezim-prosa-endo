import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScheduleExperience } from "@/components/ScheduleExperience";
import { SpeakersSection } from "@/components/SpeakersSection";
import { StandSection } from "@/components/StandSection";
import { buildSchedule } from "@/lib/schedule";

// Vagas mudam a cada inscrição — sem isso a página seria pré-renderizada uma
// vez no build e todo mundo veria a contagem de vagas do dia do deploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  const schedule = await buildSchedule();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ScheduleExperience initialSchedule={schedule} />
        <StandSection />
        <SpeakersSection initialSchedule={schedule} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
