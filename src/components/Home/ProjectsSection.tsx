"use client";
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: '01',
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce solution built with modern technologies. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        image: '/api/placeholder/800/600',
        year: '2024'
    },
    {
        id: '02',
        title: 'Task Management App',
        description: 'A collaborative project management tool with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking.',
        tech: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        image: '/api/placeholder/800/600',
        year: '2024'
    },
    {
        id: '03',
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management with data visualization, scheduling capabilities, and performance tracking.',
        tech: ['React', 'Express', 'Chart.js', 'MySQL'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        image: '/api/placeholder/800/600',
        year: '2023'
    },
    {
        id: '04',
        title: 'Weather Forecast App',
        description: 'A sleek weather application with location-based forecasts, interactive maps, severe weather alerts, and detailed meteorological data.',
        tech: ['React Native', 'Redux', 'Weather API', 'Maps SDK'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        image: '/api/placeholder/800/600',
        year: '2023'
    }
];

const ProjectsSection = () => {
    const [activeProject, setActiveProject] = useState(0);
    const sectionRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            projects.forEach((_, index) => {
                ScrollTrigger.create({
                    trigger: `[data-project="${index}"]`,
                    start: "top 30%",
                    end: "bottom 40%",
                    onEnter: () => {
                        setActiveProject(index)
                    },
                    onEnterBack: () => {
                        setActiveProject(index)
                    }
                })
            });

            gsap.utils.toArray('[data-project]').forEach((project, index) => {
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
        }, sectionRef)

        return () => ctx.revert();
    }, [])


    return (
        <section
            ref={sectionRef}
            className='relative bg-gradient-to-br from-gray-900 via-black to-gray-800'
        >
            <div className='lg:container mx-auto px-4 pb-50'>
                <div className='py-20 lg:py-32'>
                    <div className='flex'>
                        <div className="hidden lg:block w-1/4 pr-8"></div>
                        <div className='w-full lg:w-3/4'>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8 tracking-tight">
                                Selected Work
                            </h2>
                            <div className='flex items-center mb-16'>
                                <div className="h-px w-16 bg-white/30 mr-6"></div>
                                <p className="text-lg lg:text-xl text-white/70">
                                    Projects that showcase my expertise
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='relative flex'>
                    <div className='hidden lg:block w-1/4 pr-8'>
                        <div className='sticky top-8'>
                            <div
                                ref={counterRef}
                                className='text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-light text-white/15 leading-none tracking-tighter flex items-center'
                            >
                                <span>0</span>

                                <div
                                    className='overflow-hidden inline-block'
                                    style={{
                                        height: '1.2em',
                                        width: '0.6em'
                                    }}
                                >
                                    <div
                                        className='transition-transform duration-700 ease-out'
                                        style={{
                                            transform: `translateY(-${activeProject * 1.2}em)`
                                        }}
                                    >
                                        {projects.map((_, index) => (
                                            <div
                                                key={index}
                                                className='flex items-center justify-center'
                                                style={{
                                                    height: '1.2em', lineHeight: '1.2em'
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-base text-white/50 uppercase tracking-[0.4em] mt-6 ml-4">
                                Project
                            </div>
                            <div className="w-16 h-px bg-white/20 mt-6 ml-4"></div>
                        </div>
                    </div>
                    {/* Project Container */}

                    <div className='w-full lg:w-3/4 space-y-32 lg:space-y-40 pb-32'>
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                data-project={index}
                                className="relative"
                            >
                                <div className='lg:hidden mb-8'>
                                    <div className="text-4xl font-light text-white/40 leading-none mb-2">
                                        {project.id}
                                    </div>
                                    <div className="text-xs text-white/50 uppercase tracking-[0.3em]">
                                        Project
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-3 gap-8 lg:gap-12 items-center'>
                                    <div className='md:col-span-1 space-y-6'>
                                        <div>
                                            <div className='flex items-baseline gap-4 mb-4'>
                                                <h3 className='text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight tracking-tight'>
                                                    {project.title}
                                                </h3>
                                                <span className='text-sm text-white/50'>
                                                    {project.year}
                                                </span>
                                            </div>
                                            <p className="text-white/70 text-lg leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
                                                Technology
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="text-sm text-white/80"
                                                    >
                                                        {tech}
                                                        {techIndex < project.tech.length - 1 && <span className="text-white/40 ml-2">•</span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-8 pt-4">
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300"
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
                                                className="group flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300"
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
    )
}

export default ProjectsSection
