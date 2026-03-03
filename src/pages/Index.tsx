import { useEffect } from "react";
import HeroSection from "@/components/section/HeroSection";
import Section from "@/components/section/Section";
import ProfileSection from "@/components/section/ProfileSection";
import Experience from "@/components/section/Experience";
import Project from "@/components/section/Project";
import Footer from "@/components/section/Footer";
import MobileDotWaves from "@/components/MobileDotWaves";

const formulas = [
  { tex: String.raw`\lim_{n \to \infty} \sum_{k=1}^n \frac{1}{k} = \infty`, label: "Harmonic Series" },
  { tex: String.raw`\frac{\partial^2 \psi}{\partial t^2} = c^2 \nabla^2 \psi`, label: "Wave Equation" },
  { tex: String.raw`\int_0^\infty e^{-x} x^{s-1}\,dx = \Gamma(s)`, label: "Gamma Function" },
];

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const timer = setTimeout(() => {
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    }, 500);
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <main className="w-full overflow-hidden">
        <HeroSection />

        {/* Satu instance DotWaves khusus mobile — overlap ke Hero & Section */}
        <MobileDotWaves />

        <Section
          id="about"
          useDotWaves={true}
          formulas={formulas}
          leftImage="/images/left-img.jpg"
          rightImage="/images/right-img.jpg"
          bgColor="bg-[#f7f6f4]"
          isFullScreen={true}
        />

        <ProfileSection />
        <Experience />
        <Project />
      </main>
      <Footer />
    </>
  );
};

export default Index;