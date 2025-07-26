"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const floatingRef1 = useRef(null);
    const floatingRef2 = useRef(null);
    const floatingRef3 = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;
        const elements = [floatingRef1.current, floatingRef2.current, floatingRef3.current];

        elements.forEach((el, idx) => {
            if (el) {
                gsap.to(el,
                    {
                        y: -20,
                        duration: 2 + idx * 0.5,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: idx * 0.3
                    }
                )

                gsap.to(el,
                    {
                        rotation: 360,
                        duration: 8 + idx * 2,
                        ease: "none",
                        repeat: -1
                    }
                )

                el.addEventListener('mouseenter', () => {
                    gsap.to(el,
                        {
                            scale: 1.2,
                            duration: 0.3,
                            ease: "back.out(1.7)"
                        }
                    )
                })

                el.addEventListener('mouseleave', () => {
                    gsap.to(el,
                        {
                            scale: 1,
                            duration: 0.3,
                            ease: "back.out(1.7)"
                        }
                    )
                })
            }
        })

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
                scale: 0.5,
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

        gsap.to(section,
            {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        )

        return () => {
            elements.forEach((el) => {
                if (el) {
                    el.removeEventListener('mouseenter', () => { });
                    el.removeEventListener('mouseleave', () => { });
                }
            })
        }
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
                        With over 3 years of hands-on experience, I&apos;ve worked on everything from real-time chat apps to mobile platforms for doctors and technicians. My toolbox includes React, Next.js, and React Native — and I’m always up for learning something new (or fighting with CSS, again).
                        When the code runs bug-free on the first try? That’s my version of magic.
                    </p>

                    {/* Skills or stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
                            <p className="text-gray-400">Projects Completed</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-2">2+</h3>
                            <p className="text-gray-400">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* Image/Visual */}
                <div ref={imageRef} className="flex justify-center">
                    <div ref={containerRef} className="relative">
                        {/* Main circle */}
                        <div className="w-80 h-80 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                            <div className="text-white text-6xl font-bold drop-shadow-lg">RZ</div>
                        </div>

                        {/* Floating elements */}
                        <div ref={floatingRef1} className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-80"></div>
                        <div ref={floatingRef2} className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-70"></div>
                        <div ref={floatingRef3} className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
