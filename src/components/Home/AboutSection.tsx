"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingShapes3D from '../FloatingShapes3D';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const threeDRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;
        const threeD = threeDRef.current;

        // Section animations
        gsap.fromTo(section,
            {
                borderTopLeftRadius: '6rem',
                borderTopRightRadius: '6rem',
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
        )

        // Content animations
        gsap.fromTo(content, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })

        // 3D container animation
        gsap.fromTo(threeD,
            {
                scale: 0.5,
                opacity: 0,
                rotation: -10
            },
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            }
        )

        // Parallax effect for 3D scene
        gsap.to(threeD,
            {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        )

    }, [])

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden"
            style={{
                borderTopLeftRadius: '6rem',
                borderTopRightRadius: '6rem',
                boxShadow: '0 -20px 40px rgba(0,0,0,0.1)'
            }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/8 to-gray-500/5"></div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10" 
                 style={{
                     backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
                 }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Content */}
                <div ref={contentRef} className="text-white">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <p className="text-xl md:text-xl mb-8 text-gray-300 leading-relaxed">
                        Hey, I&apos;m Rizwaan — a developer who loves building smooth, responsive websites and apps that people actually enjoy using.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        With over 2 years of hands-on experience, I&apos;ve worked on everything from real-time chat apps to mobile platforms for doctors and technicians. My toolbox includes React, Next.js, and React Native — and I'm always up for learning something new (or fighting with CSS, again).
                        When the code runs bug-free on the first try? That's my version of magic.
                    </p>

                    {/* Skills or stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">10+</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Projects Completed</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">2+</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* 3D Visual Section */}
                <div ref={imageRef} className="flex justify-center items-center relative">
                    <div ref={threeDRef} className="relative w-full max-w-lg">
                        {/* Glowing background for 3D scene */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl transform scale-110"></div>
                        
                        {/* 3D Scene Container */}
                        <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <FloatingShapes3D />
                        </div>

                        {/* Floating accent elements around 3D scene */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection