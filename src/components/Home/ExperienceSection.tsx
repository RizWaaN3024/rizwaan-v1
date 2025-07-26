"use client";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, ExternalLink } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: '01',
        year: '2024',
        company: 'Oro Media Lab',
        role: 'Full-Stack Developer',
        location: 'Bangalore',
        duration: 'Feb 2024 – Present',
        type: 'Full-time',
        description: 'Leading full-stack development initiatives across multiple high-impact projects, from WordPress optimization to mobile app development.',
        achievements: [
            'Revamped MoEngage WordPress website, boosting Google PageSpeed from 60 to 96+',
            'Built RepairSeva mobile app (React Native + PHP) for technician workflow management',
            'Developed ScreenFixer platform using Next.js + PHP Symfony with custom APIs',
            'Integrated PhonePe payments for seamless transaction processing'
        ],
        tech: ['React Native', 'Next.js', 'PHP Symfony', 'MySQL', 'WordPress'],
        current: true
    },
    {
        id: '02',
        year: '2024',
        company: 'QuickFly.ae',
        role: 'Freelance Developer',
        location: 'Dubai (Remote)',
        duration: 'Oct 2024 – Nov 2024',
        type: 'Contract',
        description: 'Delivered a complete frontend solution for a Dubai-based cargo shipment company with modern tech stack.',
        achievements: [
            'Developed frontend using Next.js, TypeScript, and Tailwind CSS',
            'Integrated EmailJS for automated client registration notifications',
            'Delivered fully responsive and SEO-optimized web experience'
        ],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
        current: false
    },
    {
        id: '03',
        year: '2023',
        company: 'Indegene',
        role: 'Web Developer',
        location: 'Bangalore',
        duration: 'Sep 2023 – Feb 2024',
        type: 'Full-time',
        description: 'Specialized in creating responsive marketing solutions for top-tier healthcare clients with focus on cross-platform compatibility.',
        achievements: [
            'Built responsive marketing emailers and web pages for healthcare clients',
            'Ensured cross-platform compatibility across major browsers and email clients',
            'Delivered pixel-perfect designs with optimal performance'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'Email Development'],
        current: false
    }
];

const ExperienceSection = () => {
    const [activeExperience, setActiveExperience] = useState(0);
    const sectionRef = useRef(null);
    const timelineLineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the main timeline line
            gsap.fromTo(timelineLineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 20%",
                        scrub: 1
                    }
                }
            );

            // Set up scroll triggers for active state
            experiences.forEach((_, index) => {
                ScrollTrigger.create({
                    trigger: `[data-timeline-item="${index}"]`,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => setActiveExperience(index),
                    onEnterBack: () => setActiveExperience(index)
                });
            });

            // Animate timeline items
            experiences.forEach((_, index) => {
                const isLeft = index % 2 === 0;
                
                // Animate year number
                gsap.fromTo(`[data-year="${index}"]`,
                    { opacity: 0, x: isLeft ? -30 : 30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: `[data-timeline-item="${index}"]`,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Animate content card
                gsap.fromTo(`[data-content="${index}"]`,
                    { opacity: 0, x: isLeft ? 30 : -30, y: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: `[data-timeline-item="${index}"]`,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Animate timeline dot
                gsap.fromTo(`[data-dot="${index}"]`,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        delay: 0.4,
                        scrollTrigger: {
                            trigger: `[data-timeline-item="${index}"]`,
                            start: "top 75%",
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
            className='relative bg-gradient-to-br from-gray-900 via-black to-gray-800'
        >
            <div className='lg:container mx-auto px-4'>
                {/* Header */}
                <div className='py-16 lg:py-25'>
                    <div className='flex'>
                        <div className="hidden lg:block w-1/4 pr-8"></div>
                        <div className='w-full lg:w-3/4'>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8 tracking-tight">
                                Experience
                            </h2>
                            <div className='flex items-center mb-16'>
                                <div className="h-px w-16 bg-white/30 mr-6"></div>
                                <p className="text-lg lg:text-xl text-white/70">
                                    2+ years building production-ready applications
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className='relative max-w-7xl mx-auto pb-32'>
                    {/* Central Timeline Line */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block'>
                        <div
                            ref={timelineLineRef}
                            className='w-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 origin-top'
                            style={{ height: '100%' }}
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className='space-y-24 lg:space-y-32'>
                        {experiences.map((experience, index) => {
                            const isLeft = index % 2 === 0;
                            
                            return (
                                <div
                                    key={experience.id}
                                    data-timeline-item={index}
                                    className={`relative flex flex-col lg:flex-row items-center gap-8`}
                                >
                                    {/* Year (Left side for even items, right side for odd items) */}
                                    <div
                                        data-year={index}
                                        className={`w-full lg:w-5/12 flex ${isLeft ? 'lg:justify-end lg:pr-8' : 'lg:justify-start lg:pl-8 lg:order-3'}`}
                                    >
                                        <div className={`text-center ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                                            <div className='text-[6rem] lg:text-[10rem] xl:text-[12rem] font-light text-white/10 leading-none tracking-tighter'>
                                                {experience.year}
                                            </div>
                                            <div className='text-sm text-white/50 uppercase tracking-[0.3em] mt-2'>
                                                Year
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Dot (Desktop only) */}
                                    <div className='hidden lg:flex lg:w-2/12 justify-center lg:order-2'>
                                        <div
                                            data-dot={index}
                                            className={`w-6 h-6 rounded-full border-4 border-gray-900 z-10 transition-all duration-300
                                                ${activeExperience === index 
                                                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-400/50 scale-110' 
                                                    : 'bg-white/20'
                                                }`}
                                        />
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        data-content={index}
                                        className={`w-full lg:w-5/12 ${isLeft ? 'lg:order-3' : 'lg:order-1 lg:pl-8'}`}
                                    >
                                        <div className={`relative p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300
                                            ${activeExperience === index ? 'ring-1 ring-blue-400/30 shadow-xl shadow-blue-400/10 scale-105' : 'hover:scale-102'}
                                        `}>
                                            {/* Mobile Timeline Dot */}
                                            <div className='lg:hidden mb-6 flex justify-center'>
                                                <div className={`w-4 h-4 rounded-full
                                                    ${activeExperience === index 
                                                        ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                                                        : 'bg-white/30'
                                                    }`}
                                                />
                                            </div>

                                            {/* Company & Role */}
                                            <div className='mb-6'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <h3 className='text-2xl lg:text-3xl font-semibold text-white'>
                                                        {experience.company}
                                                    </h3>
                                                    {experience.current && (
                                                        <span className='px-3 py-1 text-xs bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-300 rounded-full border border-green-400/30 animate-pulse'>
                                                            Present
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className='text-xl text-blue-300 font-medium mb-4'>
                                                    {experience.role}
                                                </h4>
                                                
                                                <div className='flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6'>
                                                    <div className='flex items-center gap-1'>
                                                        <MapPin size={14} />
                                                        <span>{experience.location}</span>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <Calendar size={14} />
                                                        <span>{experience.duration}</span>
                                                    </div>
                                                    <span className='px-2 py-1 bg-white/10 rounded text-xs'>
                                                        {experience.type}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-white/80 leading-relaxed mb-6">
                                                {experience.description}
                                            </p>

                                            {/* Achievements */}
                                            <div className='mb-6'>
                                                <h5 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
                                                    Key Achievements
                                                </h5>
                                                <ul className='space-y-2'>
                                                    {experience.achievements.map((achievement, achIndex) => (
                                                        <li
                                                            key={achIndex}
                                                            className='flex items-start gap-3 text-white/70 text-sm leading-relaxed'
                                                        >
                                                            <div className='w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0' />
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Tech Stack */}
                                            <div>
                                                <h5 className="text-sm font-medium text-white/70 mb-3 uppercase tracking-wider">
                                                    Technology Stack
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {experience.tech.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-lg border border-white/20 hover:border-blue-400/30 transition-colors duration-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;