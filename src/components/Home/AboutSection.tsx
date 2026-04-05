"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/site-config';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: '2+', label: 'Years Experience' },
    { value: '500+', label: 'Leads Handled Daily' },
    { value: '11', label: 'OSS PRs Merged' },
    { value: '∞', label: 'Cups of Chai' },
];

const AboutSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const statsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dividerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        // Section border radius animation
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? '3rem' : '6rem';
        gsap.fromTo(section,
            {
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius,
                y: 50
            },
            {
                borderTopLeftRadius: '0rem',
                borderTopRightRadius: '0rem',
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 20%",
                    end: "top 10%",
                    scrub: 1
                }
            }
        );

        // Heading reveal
        gsap.fromTo(headingRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Divider line
        gsap.fromTo(dividerRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Paragraphs stagger
        paragraphsRef.current.forEach((p, i) => {
            if (!p) return;
            gsap.fromTo(p,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 65%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Stats stagger
        statsRef.current.forEach((stat, i) => {
            if (!stat) return;
            gsap.fromTo(stat,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black flex items-center relative overflow-hidden rounded-t-[3rem] md:rounded-t-[6rem]"
            style={{
                boxShadow: '0 -20px 40px rgba(0,0,0,0.1)'
            }}
        >
            <div className="lg:container mx-auto px-5 sm:px-6 py-16 sm:py-24 lg:py-32 relative z-10">
                <div className="max-w-4xl">
                    {/* Section label */}
                    <div className="flex items-center mb-10 sm:mb-16">
                        <div
                            ref={dividerRef}
                            className="h-px w-10 sm:w-16 bg-brand mr-4 sm:mr-6"
                        ></div>
                        <p className="text-xs sm:text-sm text-brand uppercase tracking-[0.3em] font-medium">
                            About
                        </p>
                    </div>

                    {/* Heading */}
                    <h2
                        ref={headingRef}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight mb-10 sm:mb-16"
                    >
                        I build things
                        <span className="text-brand"> end-to-end</span>
                        <span className="text-white/40"> — from the pixel</span>
                        {' '}to the deploy.
                    </h2>

                    {/* Body */}
                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 sm:gap-y-8 mb-14 sm:mb-20">
                        <p
                            ref={el => { paragraphsRef.current[0] = el; }}
                            className="text-base sm:text-lg text-white/60 leading-relaxed"
                        >
                            Hey, I&apos;m {SITE_CONFIG.name} — a full-stack developer who&apos;s just
                            as comfortable wiring up a Razorpay payment flow on the backend as
                            I am obsessing over a 1px layout shift on the frontend. Based in{' '}
                            {SITE_CONFIG.location}, I&apos;ve spent the last 2+ years shipping
                            real products that handle real traffic and real money.
                        </p>
                        <p
                            ref={el => { paragraphsRef.current[1] = el; }}
                            className="text-base sm:text-lg text-white/60 leading-relaxed"
                        >
                            Right now I&apos;m leading development at Oro Media Lab, where I built
                            COSKO — a multi-city service marketplace running across 5 Indian
                            cities. Think React Native partner apps, Next.js dashboards,
                            Dockerized backends, and wallet-based payments processing
                            thousands every week. I also once took a PageSpeed score from 60
                            to 96+. That&apos;s still my proudest flex.
                        </p>
                        <p
                            ref={el => { paragraphsRef.current[2] = el; }}
                            className="text-base sm:text-lg text-white/60 leading-relaxed md:col-span-2"
                        >
                            Outside work, I contribute to open source (11 merged PRs to
                            OWASP Nest and counting), build side projects like real-time chat
                            apps, and occasionally convince myself that <span className="text-white/80">this
                            </span> will be the side project I actually finish.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-white/10">
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                ref={el => { statsRef.current[i] = el; }}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-1 sm:mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
