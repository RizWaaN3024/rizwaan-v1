"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    // Frontend
    { name: 'React', description: 'JavaScript Library', icon: '/react.svg', bgColor: 'bg-[#61DAFB]/20' },
    { name: 'Next.js', description: 'React Framework', icon: '/nextjs.svg', bgColor: 'bg-gray-100/20' },
    { name: 'TypeScript', description: 'JavaScript Superset', icon: '/typescript.svg', bgColor: 'bg-[#3178C6]/20' },
    { name: 'JavaScript', description: 'Programming Language', icon: '/javascript.svg', bgColor: 'bg-[#F7DF1E]/20' },
    { name: 'Java', description: 'Programming Language', icon: '/java.svg', bgColor: 'bg-[#ED8B00]/20' },
    { name: 'Tailwind CSS', description: 'CSS Framework', icon: '/tailwind.svg', bgColor: 'bg-[#0EA5E9]/20' },

    // Backend
    { name: 'Node.js', description: 'JavaScript Runtime', icon: '/node-js.svg', bgColor: 'bg-[#689F63]/20' },
    { name: 'Express.js', description: 'Web Framework', icon: '/express.png', bgColor: 'bg-white/10' },
    { name: 'PHP', description: 'Server-side Language', icon: '/php.svg', bgColor: 'bg-[#777BB4]/20' },
    { name: 'Socket.io', description: 'Real-time Communication', icon: '/socketio.svg', bgColor: 'bg-white/10' },
    { name: 'Symfony', description: 'PHP Framework', icon: '/symfony.svg', bgColor: 'bg-white/10' },

    // Database & ORM
    { name: 'MongoDB', description: 'NoSQL Database', icon: '/mongodb.svg', bgColor: 'bg-[#47A248]/20' },
    { name: 'MySQL', description: 'SQL Database', icon: '/mysql.svg', bgColor: 'bg-[#4479A1]/20' },
    { name: 'Prisma', description: 'Database ORM', icon: '/prisma.svg', bgColor: 'bg-[#2D3748]/20' },
    { name: 'Doctrine ORM', description: 'PHP ORM', icon: '/doctrine-orm.svg', bgColor: 'bg-[#FC6C2C]/20' },

    // Mobile
    { name: 'React Native', description: 'Mobile Development', icon: '/react.svg', bgColor: 'bg-[#61DAFB]/20' },

    // Tools & DevOps
    { name: 'Git', description: 'Version Control', icon: '/git.svg', bgColor: 'bg-[#F05032]/20' },
    { name: 'Docker', description: 'Containerization', icon: '/docker.svg', bgColor: 'bg-[#2496ED]/20' },
    { name: 'Postman', description: 'API Testing', icon: '/postman.svg', bgColor: 'bg-[#FF6C37]/20' },
    { name: 'Figma', description: 'Design Tool', icon: '/figma-logo.svg', bgColor: 'bg-[#F24E1E]/20' }
];

const SkillsSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        gsap.fromTo(section,
            {
                borderTopLeftRadius: "6rem",
                borderTopRightRadius: "6rem",
                y: 50
            },
            {
                borderTopLeftRadius: "0rem",
                borderTopRightRadius: "0rem",
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
        )
    }, [])

    return (
        <section
            ref={sectionRef}
            className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden relative py-16 lg:py-25'
            style={{
                borderTopLeftRadius: "6rem",
                borderTopRightRadius: "6rem",
                boxShadow: '0 -20px 40px rgba(0,0,0,0.1)'
            }}
        >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/5 to-cyan-500/3"></div>
            <div className='lg:container mx-auto px-4 relative z-10'>
                <div className='text-center mb-16'>
                    <h2 className="text-5xl md:text-7xl leading-snug font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        Technologies I work with to bring ideas to life
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer will-change-transform"
                        >
                            <div className="flex gap-4 items-center">
                                {/* Icon container */}
                                <div className={`p-3 ${skill.bgColor} rounded-lg w-fit`}>
                                    <Image
                                        src={skill.icon}
                                        width={32}
                                        height={32}
                                        alt={skill.name}
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>

                                {/* Text content */}
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-white mb-1">
                                        {skill.name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsSection