import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        </main>
    );
}
