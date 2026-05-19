import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Setup from "@/components/Setup";
import TechStack from "@/components/TechStack";
import Pipeline from "@/components/Pipeline";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Setup />
      <Features />
      <Showcase />
      <HowItWorks />
      <Pipeline />
      <TechStack />
      <CTA />
      <Footer />
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-secondary/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
