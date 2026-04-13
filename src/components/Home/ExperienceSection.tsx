"use client";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { EXPERIENCES } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const dividerRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header
            gsap.fromTo(dividerRef.current,
                { scaleX: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Experience items stagger
            itemsRef.current.forEach((item, i) => {
                if (!item) return;
                gsap.fromTo(item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative bg-black"
        >
            <div className="lg:container mx-auto px-5 sm:px-6 py-16 sm:py-24 lg:py-32">
                <div className="max-w-4xl">
                    {/* Section label */}
                    <div className="flex items-center mb-10 sm:mb-16">
                        <div
                            ref={dividerRef}
                            className="h-px w-10 sm:w-16 bg-brand mr-4 sm:mr-6"
                        ></div>
                        <p className="text-xs sm:text-sm text-brand uppercase tracking-[0.3em] font-medium">
                            Experience
                        </p>
                    </div>

                    {/* Heading */}
                    <h2
                        ref={headingRef}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight mb-14 sm:mb-20"
                    >
                        Places I&apos;ve
                        <span className="text-brand"> built</span>
                        <span className="text-white/40"> things at.</span>
                    </h2>

                    {/* Experience items */}
                    <div className="space-y-12 sm:space-y-16">
                        {EXPERIENCES.map((exp, i) => (
                            <div
                                key={exp.id}
                                ref={el => { itemsRef.current[i] = el; }}
                                className="group relative pl-6 sm:pl-8 border-l border-white/10 hover:border-brand/40 transition-colors duration-500"
                            >
                                {/* Dot on the border */}
                                <div className="absolute left-0 top-1 w-2 h-2 -translate-x-[calc(50%+0.5px)] rounded-full bg-white/20 group-hover:bg-brand transition-colors duration-500" />

                                {/* Duration + badge */}
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="text-xs sm:text-sm text-brand font-medium tracking-wide">
                                        {exp.duration}
                                    </span>
                                    <span className="text-xs text-white/40 px-2 py-0.5 border border-white/10 rounded">
                                        {exp.type}
                                    </span>
                                    {exp.current && (
                                        <span className="text-xs text-brand px-2 py-0.5 border border-brand/30 bg-brand/5 rounded">
                                            Current
                                        </span>
                                    )}
                                </div>

                                {/* Company & Role */}
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-1">
                                    {exp.company}
                                </h3>
                                <p className="text-base sm:text-lg text-white/50 mb-1">
                                    {exp.role}
                                </p>
                                <p className="text-sm text-white/30 mb-5 sm:mb-6">
                                    {exp.location}
                                </p>

                                {/* Description */}
                                <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-5 sm:mb-6">
                                    {exp.description}
                                </p>

                                {/* Achievements */}
                                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                                    {exp.achievements.map((achievement, j) => (
                                        <li
                                            key={j}
                                            className="flex items-start gap-3 text-sm sm:text-base text-white/50 leading-relaxed"
                                        >
                                            <span className="text-brand/60 mt-1.5 text-xs">▸</span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech */}
                                <p className="text-sm text-white/30">
                                    {exp.tech.join(' · ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
