import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { NowSection } from "@/components/NowSection";
import { WorkSection } from "@/components/WorkSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="hairline mx-auto w-[min(1040px,calc(100%-2.5rem))]" />
      <NowSection />
      <hr className="hairline mx-auto w-[min(1040px,calc(100%-2.5rem))]" />
      <WorkSection />
      <hr className="hairline mx-auto w-[min(1040px,calc(100%-2.5rem))]" />
      <ExperienceSection />
      <hr className="hairline mx-auto w-[min(1040px,calc(100%-2.5rem))]" />
      <ContactSection />
    </>
  );
}
