"use client";
import React, { useRef } from 'react';

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
    const sectionRef = useRef(null);


    return (
        <section 
            ref={sectionRef}
            className='relative bg-gradient-to-br from-gray-900 via-black to-gray-800'
        >
            <div className='lg:container mx-auto px-4'>
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
            </div>
        </section>
    )
}

export default ProjectsSection
