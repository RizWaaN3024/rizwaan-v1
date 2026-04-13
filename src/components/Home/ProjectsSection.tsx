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
            // Section header animations
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

            // Project scroll triggers
            PROJECTS.forEach((_, index) => {
                ScrollTrigger.create({
                    trigger: `[data-project="${index}"]`,
                    start: "top 30%",
                    end: "bottom 40%",
                    onEnter: () => setActiveProject(index),
                    onEnterBack: () => setActiveProject(index),
                });
            });

            // Project reveal animations
            gsap.utils.toArray<Element>('[data-project]').forEach((project) => {
                gsap.fromTo(project,
                    { opacity: 0.4, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: project,
                            start: "top 70%",
                            end: "bottom 30%",
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

                                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
                                    {/* Info */}
                                    <div className="md:col-span-1 space-y-5 sm:space-y-6">
                                        <div>
                                            <div className="flex items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4">
                                                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight tracking-tight">
                                                    {project.title}
                                                </h3>
                                                <span className="hidden lg:inline text-sm text-white/40">
                                                    {project.year}
                                                </span>
                                            </div>
                                            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech */}
                                        <p className="text-sm text-white/30">
                                            {project.tech.join(' · ')}
                                        </p>

                                        {/* Links */}
                                        <div className="flex gap-6 sm:gap-8 pt-2">
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-all duration-500 ease-out"
                                            >
                                                <span className="uppercase tracking-[0.1em]">
                                                    Live Site
                                                </span>
                                                <ExternalLink
                                                    size={14}
                                                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                                />
                                            </a>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-all duration-500 ease-out"
                                            >
                                                <span className="uppercase tracking-[0.1em]">
                                                    Code
                                                </span>
                                                <Github
                                                    size={14}
                                                    className="transform group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="md:col-span-2">
                                        <div className="relative overflow-hidden rounded-lg group">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={800}
                                                height={600}
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
