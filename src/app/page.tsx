import AboutSection from "@/components/Home/AboutSection";
import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <div className="sticky top-0 z-10">
                <HeroSection />
            </div>
            {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800"></div> */}
            <div className="relative z-20">
                <AboutSection />
            </div>
        </main>
    );
}
