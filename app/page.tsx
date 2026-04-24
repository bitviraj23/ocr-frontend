import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pipeline from "@/components/Pipeline";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <Features />
      <Pipeline />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}