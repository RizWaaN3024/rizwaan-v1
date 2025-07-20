import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <div className="min-h-screen"></div>
        </main>
    );
}
