import AboutSection from "@/components/Home/AboutSection";
import ExperienceSection from "@/components/Home/ExperienceSection";
import HeroSection from "@/components/Home/HeroSection";
import OpenSourceSection from "@/components/Home/OpenSourceSection";
import ProjectsSection from "@/components/Home/ProjectsSection";
import SkillsSection from "@/components/Home/SkillsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <div className="sticky top-0 z-10">
                <HeroSection />
            </div>
            <div className="sticky top-0 z-20">
                <AboutSection />
            </div>
            <div className="relative z-30">
                <ExperienceSection />
            </div>
            {/* <div className="relative z-30"><SkillsSection /></div> */}
            <div className="relative z-40">
                <ProjectsSection />
            </div>
            {/* <div className="relative z-40">
                <OpenSourceSection />
            </div> */}
            <div className="relative z-40">
                <Footer />
            </div>
        </main>
    );
}
