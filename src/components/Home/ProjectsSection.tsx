"use client";
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
    const [activeProject, setActiveProject] = useState(0);
    const sectionRef = useRef(null);
    const counterRef = useRef(null);
    const headingRef = useRef(null);
    const dividerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header — combined timeline, one trigger, plays once
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                }
            });
            headerTl
                .fromTo(dividerRef.current,
                    { scaleX: 0, transformOrigin: 'left center' },
                    { scaleX: 1, duration: 0.8, ease: "power2.out" }
                )
                .fromTo(headingRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    '-=0.6'
                );

            // Active project tracking (keep per-project triggers — needed for counter)
            PROJECTS.forEach((_, index) => {
                ScrollTrigger.create({
                    trigger: `[data-project="${index}"]`,
                    start: "top 30%",
                    end: "bottom 40%",
                    onEnter: () => setActiveProject(index),
                    onEnterBack: () => setActiveProject(index),
                });
            });

            // Project reveal — batched, plays once
            gsap.fromTo('[data-project]',
                { opacity: 0.4, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '[data-project]',
                        start: "top 80%",
                        once: true,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative bg-black"
        >
            <div className="lg:container mx-auto px-5 sm:px-6">
                {/* Section header */}
                <div className="py-16 sm:py-24 lg:py-32">
                    <div className="max-w-4xl">
                        <div className="flex items-center mb-10 sm:mb-16">
                            <div
                                ref={dividerRef}
                                className="h-px w-10 sm:w-16 bg-brand mr-4 sm:mr-6"
                            ></div>
                            <p className="text-xs sm:text-sm text-brand uppercase tracking-[0.3em] font-medium">
                                Projects
                            </p>
                        </div>

                        <h2
                            ref={headingRef}
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight"
                        >
                            Selected
                            <span className="text-brand"> work</span>
                            <span className="text-white/40"> I&apos;m proud of.</span>
                        </h2>
                    </div>
                </div>

                {/* Projects content */}
                <div className="relative flex">
                    {/* Sticky counter — desktop only */}
                    <div className="hidden lg:block w-1/4 pr-8">
                        <div className="sticky top-8">
                            <div
                                ref={counterRef}
                                className="text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-light text-white/10 leading-none tracking-tighter flex items-center"
                            >
                                <span>0</span>
                                <div
                                    className="overflow-hidden inline-block"
                                    style={{ height: '1.2em', width: '0.6em' }}
                                >
                                    <div
                                        className="transition-transform duration-700 ease-out"
                                        style={{ transform: `translateY(-${activeProject * 1.2}em)` }}
                                    >
                                        {PROJECTS.map((_, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center"
                                                style={{ height: '1.2em', lineHeight: '1.2em' }}
                                            >
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-brand/50 uppercase tracking-[0.4em] mt-6 ml-4">
                                Project
                            </div>
                            <div className="w-12 h-px bg-brand/30 mt-4 ml-4"></div>
                        </div>
                    </div>

                    {/* Project list */}
                    <div className="w-full lg:w-3/4 space-y-24 sm:space-y-32 lg:space-y-40 pb-24 sm:pb-32">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                data-project={index}
                                className="relative"
                            >
                                {/* Mobile project number */}
                                <div className="lg:hidden flex items-center gap-3 mb-6">
                                    <span className="text-2xl sm:text-3xl font-light text-brand/40">
                                        {project.id}
                                    </span>
                                    <div className="h-px flex-1 bg-white/10"></div>
                                    <span className="text-xs text-white/30 uppercase tracking-[0.2em]">
                                        {project.year}
                                    </span>
                                </div>

                                <div className="space-y-6 sm:space-y-8">
                                    {/* Desktop meta bar above image */}
                                    <div className="hidden lg:flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/30">
                                        <span>{project.year}</span>
                                        <span>/ {project.id}</span>
                                    </div>

                                    {/* Image — dominant, clickable to live site */}
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative overflow-hidden rounded-lg border border-white/5 group"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={1600}
                                            height={900}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <span>View Live</span>
                                            <ExternalLink size={14} />
                                        </div>
                                    </a>

                                    {/* Title + description */}
                                    <div className="grid md:grid-cols-5 gap-5 md:gap-10 pt-2">
                                        <h3 className="md:col-span-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tight">
                                            {project.title}
                                        </h3>
                                        <p className="md:col-span-2 text-base sm:text-lg text-white/60 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech chips + Links */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-white/5">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-3 py-1.5 border border-white/10 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-6 sm:gap-8">
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/link flex items-center gap-2 text-sm text-white/70 hover:text-brand transition-all duration-500 ease-out"
                                            >
                                                <span className="uppercase tracking-[0.15em]">
                                                    Live Site
                                                </span>
                                                <ExternalLink
                                                    size={14}
                                                    className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300"
                                                />
                                            </a>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/link flex items-center gap-2 text-sm text-white/70 hover:text-brand transition-all duration-500 ease-out"
                                            >
                                                <span className="uppercase tracking-[0.15em]">
                                                    Code
                                                </span>
                                                <Github
                                                    size={14}
                                                    className="transform group-hover/link:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
