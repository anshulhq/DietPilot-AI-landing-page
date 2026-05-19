import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Setup from "@/components/Setup";
import PlayfulFood from "@/components/PlayfulFood";
import TechStack from "@/components/TechStack";
import Pipeline from "@/components/Pipeline";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import PlayfulStrawberry from "@/components/PlayfulStrawberry";
import PlayfulBroccoli from "@/components/PlayfulBroccoli";
import PlayfulOrange from "@/components/PlayfulOrange";
import PlayfulCarrot from "@/components/PlayfulCarrot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PlayfulFood />
      <Setup />
      <Features />
      <PlayfulStrawberry />
      <Showcase />
      <PlayfulOrange />
      <HowItWorks />
      <Pipeline />
      <PlayfulBroccoli />
      <TechStack />
      <CTA />
      <PlayfulCarrot />
      <Footer />
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-secondary/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
