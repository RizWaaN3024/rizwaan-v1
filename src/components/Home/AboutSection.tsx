"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;

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
                    start: "top 70%",
                    end: "top 10%",
                    scrub: 1
                }
            }
        )

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
        }
        )

        gsap.fromTo(image,
            {
                scale: 0.8,
                opacity: 0,
                rotation: -5
            },
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            }
        )
    })
    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden"
            style={{
                borderTopLeftRadius: '6rem',
                borderTopRightRadius: '6rem',
                boxShadow: '0 -20px 40px rgba(0,0,0,0.1)'
            }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>

            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Content */}
                <div ref={contentRef} className="text-white">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                        I'm a passionate developer who creates digital experiences that captivate and inspire.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        With expertise in modern web technologies, I help brands tell their story through
                        beautiful, functional websites that drive real results.
                    </p>

                    {/* Skills or stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                            <p className="text-gray-400">Projects Completed</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-2">3+</h3>
                            <p className="text-gray-400">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* Image/Visual */}
                <div ref={imageRef} className="flex justify-center">
                    <div className="relative">
                        {/* Main circle */}
                        <div className="w-80 h-80 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                            <div className="text-white text-6xl font-bold">RZ</div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-80"></div>
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-70"></div>
                        <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
