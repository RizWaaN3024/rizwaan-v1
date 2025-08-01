"use client";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, GitPullRequest, GitMerge, Star, GitFork, Calendar, Award, ExternalLink } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        id: '01',
        name: 'GSSoC 2025',
        fullName: 'Girl Script Summer of Code',
        status: 'Active Contributor',
        duration: 'Jan 2025 - Present',
        description: 'Contributing to OWASP/Nest project as part of the prestigious open source program.',
        project: 'OWASP/Nest',
        projectDescription: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
        contributions: '12+ merged PRs',
        tech: ['Node.js', 'TypeScript', 'Testing', 'Security'],
        current: true,
        logo: '🌸'
    },
    {
        id: '02',
        name: 'Hacktoberfest 2024',
        fullName: 'Hacktoberfest',
        status: 'Upcoming Participant',
        duration: 'Oct 2024',
        description: 'Planning to contribute to multiple open source projects during the annual celebration.',
        project: 'Various Projects',
        projectDescription: 'Contributing to diverse projects across different technologies and domains.',
        contributions: 'Planned',
        tech: ['JavaScript', 'React', 'Node.js', 'Open Source'],
        current: false,
        logo: '🎃'
    }
];

const contributions = [
    {
        id: 1,
        title: 'Enhanced Authentication System',
        repo: 'OWASP/Nest',
        type: 'Feature',
        status: 'Merged',
        prNumber: '#245',
        description: 'Implemented JWT-based authentication with enhanced security features',
        additions: '+156',
        deletions: '-23',
        files: 8
    },
    {
        id: 2,
        title: 'Security Middleware Implementation',
        repo: 'OWASP/Nest',
        type: 'Security',
        status: 'Merged',
        prNumber: '#238',
        description: 'Added comprehensive security middleware for request validation',
        additions: '+89',
        deletions: '-12',
        files: 5
    },
    {
        id: 3,
        title: 'Unit Tests Coverage Improvement',
        repo: 'OWASP/Nest',
        type: 'Testing',
        status: 'Merged',
        prNumber: '#231',
        description: 'Increased test coverage from 65% to 85% for core modules',
        additions: '+234',
        deletions: '-18',
        files: 12
    },
    {
        id: 4,
        title: 'Documentation Enhancement',
        repo: 'OWASP/Nest',
        type: 'Docs',
        status: 'Review',
        prNumber: '#252',
        description: 'Updated API documentation with comprehensive examples',
        additions: '+67',
        deletions: '-8',
        files: 4
    }
];

const githubStats = {
    currentStreak: 45,
    totalContributions: 267,
    publicRepos: 12,
    totalStars: 34,
    languagesContributed: ['JavaScript', 'TypeScript', 'Python', 'PHP'],
    thisYear: {
        commits: 156,
        prs: 23,
        issues: 8,
        reviews: 12
    }
};

const OpenSourceSection = () => {
    const [activeTab, setActiveTab] = useState('programs');
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.opensource-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.opensource-header',
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate program cards
            gsap.utils.toArray('[data-program]').forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.2)",
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Animate contribution cards
            gsap.utils.toArray('[data-contribution]').forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Animate stats
            gsap.utils.toArray('[data-stat]').forEach((stat, index) => {
                gsap.fromTo(stat,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Merged': return 'text-green-400 bg-green-400/10 border-green-400/30';
            case 'Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'Active Contributor': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
            default: return 'text-white/60 bg-white/10 border-white/20';
        }
    };

    return (
        <section
            ref={sectionRef}
            className='relative bg-gradient-to-br from-gray-900 via-black to-gray-800'
        >
            <div className='lg:container mx-auto px-4'>
                {/* Header */}
                <div className='opensource-header py-20 lg:py-32'>
                    <div className='flex'>
                        <div className="hidden lg:block w-1/4 pr-8"></div>
                        <div className='w-full lg:w-3/4'>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8 tracking-tight">
                                Open Source
                            </h2>
                            <div className='flex items-center mb-16'>
                                <div className="h-px w-16 bg-white/30 mr-6"></div>
                                <p className="text-lg lg:text-xl text-white/70">
                                    Contributing to the community, one commit at a time
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex'>
                    {/* <div className="hidden lg:block w-1/4 pr-8"></div> */}
                    <div className='w-full pb-32'>
                        
                        {/* Active Programs */}
                        <div className='mb-20'>
                            <h3 className="text-2xl lg:text-3xl font-medium mb-8 text-white/90">
                                Active Programs
                            </h3>
                            <div className='grid md:grid-cols-2 gap-6'>
                                {programs.map((program, index) => (
                                    <div
                                        key={program.id}
                                        data-program={index}
                                        className={`relative p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105
                                            ${program.current 
                                                ? 'border-blue-400/30 ring-1 ring-blue-400/20 shadow-lg shadow-blue-400/10' 
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        {program.current && (
                                            <div className='absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50' />
                                        )}
                                        
                                        <div className='flex items-start gap-4 mb-4'>
                                            <div className='text-3xl'>{program.logo}</div>
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <h4 className='text-xl font-semibold text-white'>{program.name}</h4>
                                                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(program.status)}`}>
                                                        {program.status}
                                                    </span>
                                                </div>
                                                <p className='text-sm text-white/60'>{program.fullName}</p>
                                                <p className='text-sm text-white/50'>{program.duration}</p>
                                            </div>
                                        </div>

                                        <p className='text-white/80 mb-4 leading-relaxed'>{program.description}</p>

                                        <div className='mb-4'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Github size={16} className='text-white/60' />
                                                <span className='font-medium text-white'>{program.project}</span>
                                                <span className='text-blue-400 text-sm'>{program.contributions}</span>
                                            </div>
                                            <p className='text-sm text-white/70 ml-6'>{program.projectDescription}</p>
                                        </div>

                                        <div className='flex flex-wrap gap-2'>
                                            {program.tech.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Contributions */}
                        <div className='mb-20'>
                            <h3 className="text-2xl lg:text-3xl font-medium mb-8 text-white/90">
                                Recent Contributions
                            </h3>
                            <div className='space-y-4'>
                                {contributions.map((contribution, index) => (
                                    <div
                                        key={contribution.id}
                                        data-contribution={index}
                                        className='p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300'
                                    >
                                        <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <GitPullRequest size={18} className='text-blue-400' />
                                                    <h4 className='font-medium text-white'>{contribution.title}</h4>
                                                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(contribution.status)}`}>
                                                        {contribution.status}
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-4 text-sm text-white/60 mb-2'>
                                                    <span>{contribution.repo}</span>
                                                    <span>{contribution.prNumber}</span>
                                                    <span className='px-2 py-1 bg-white/10 rounded text-xs'>{contribution.type}</span>
                                                </div>
                                                <p className='text-white/80 text-sm'>{contribution.description}</p>
                                            </div>
                                            <div className='flex items-center gap-4 text-sm'>
                                                <span className='text-green-400'>{contribution.additions}</span>
                                                <span className='text-red-400'>{contribution.deletions}</span>
                                                <span className='text-white/60'>{contribution.files} files</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* GitHub Stats */}
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-medium mb-8 text-white/90">
                                GitHub Activity
                            </h3>
                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                                <div data-stat="0" className='p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10'>
                                    <div className='text-2xl font-bold text-white'>{githubStats.currentStreak}</div>
                                    <div className='text-sm text-white/60'>Day Streak</div>
                                </div>
                                <div data-stat="1" className='p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10'>
                                    <div className='text-2xl font-bold text-white'>{githubStats.totalContributions}</div>
                                    <div className='text-sm text-white/60'>Contributions</div>
                                </div>
                                <div data-stat="2" className='p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10'>
                                    <div className='text-2xl font-bold text-white'>{githubStats.thisYear.prs}</div>
                                    <div className='text-sm text-white/60'>PRs Merged</div>
                                </div>
                                <div data-stat="3" className='p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10'>
                                    <div className='text-2xl font-bold text-white'>{githubStats.publicRepos}</div>
                                    <div className='text-sm text-white/60'>Public Repos</div>
                                </div>
                            </div>

                            <div className='p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10'>
                                <h4 className='font-medium text-white mb-4'>Languages Contributed To</h4>
                                <div className='flex flex-wrap gap-3'>
                                    {githubStats.languagesContributed.map((lang, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white/90 text-sm rounded-lg border border-blue-400/30"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpenSourceSection;