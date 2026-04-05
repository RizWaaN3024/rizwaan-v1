"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/site-config';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: integrate email service later
        console.log('Form submitted:', formData);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Single animation for the entire section content
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={sectionRef}
            id="contact"
            className="relative bg-black"
        >
            <div className="lg:container mx-auto px-5 sm:px-6">
                <div className="h-px bg-white/10"></div>
            </div>

            <div ref={contentRef} className="lg:container mx-auto px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-32 pb-6 sm:pb-8">
                <div className="max-w-6xl">
                    {/* Section label */}
                    <div className="flex items-center mb-10 sm:mb-16">
                        <div className="h-px w-10 sm:w-16 bg-brand mr-4 sm:mr-6"></div>
                        <p className="text-xs sm:text-sm text-brand uppercase tracking-[0.3em] font-medium">
                            Contact
                        </p>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight mb-14 sm:mb-20">
                        Let&apos;s build something
                        <span className="text-brand"> great</span>
                        <span className="text-white/40"> together.</span>
                    </h2>

                    {/* Content grid */}
                    <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
                        {/* Left — message + socials */}
                        <div>
                            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10">
                                Got a project in mind, a role that fits, or just want to say hi?
                                I&apos;m always open to interesting conversations and new opportunities.
                                Drop me a message and I&apos;ll get back to you soon.
                            </p>

                            <div className="mb-8 sm:mb-10">
                                <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3">
                                    Email
                                </p>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="text-base sm:text-lg text-white/70 hover:text-brand transition-all duration-500 ease-out"
                                >
                                    {SITE_CONFIG.email}
                                </a>
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-4">
                                    Socials
                                </p>
                                <div className="flex gap-5">
                                    <Link href={SITE_CONFIG.social.github} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaGithub size={20} />
                                    </Link>
                                    <Link href={SITE_CONFIG.social.linkedin} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaLinkedin size={20} />
                                    </Link>
                                    <Link href={SITE_CONFIG.social.twitter} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaTwitter size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right — form */}
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                                    className="w-full bg-transparent border-b border-white/15 text-white text-base sm:text-lg py-3 focus:outline-none focus:border-brand/50 transition-colors duration-500 placeholder:text-white/20"
                                    placeholder="Your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                                    className="w-full bg-transparent border-b border-white/15 text-white text-base sm:text-lg py-3 focus:outline-none focus:border-brand/50 transition-colors duration-500 placeholder:text-white/20"
                                    placeholder="your@email.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4}
                                    className="w-full bg-transparent border-b border-white/15 text-white text-base sm:text-lg py-3 focus:outline-none focus:border-brand/50 transition-colors duration-500 placeholder:text-white/20 resize-none"
                                    placeholder="Tell me about your project..." />
                            </div>
                            <button type="submit"
                                className="group relative inline-flex items-center px-8 py-4 text-sm font-medium tracking-wider uppercase text-white/90 border border-brand/30 hover:border-brand/60 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px] cursor-pointer mt-2">
                                <span className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                                <span className="relative z-10">Send Message</span>
                                <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Giant CTA — integrated, no separate animation */}
                <div className="mt-16 sm:mt-24 pt-10 sm:pt-16 border-t border-white/10">
                    <a href={`mailto:${SITE_CONFIG.email}`} className="group block text-center">
                        <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.3em] mb-4 sm:mb-6 group-hover:text-white/50 transition-colors duration-500">
                            Have a project in mind?
                        </p>
                        <div className="relative inline-block">
                            <span
                                className="text-[11vw] sm:text-[9vw] lg:text-[7vw] font-bold tracking-tight leading-none"
                                style={{ WebkitTextStroke: '1.5px rgba(18, 247, 214, 0.3)', color: 'transparent' }}
                            >
                                LET&apos;S TALK
                            </span>
                            <span
                                className="absolute inset-0 text-[11vw] sm:text-[9vw] lg:text-[7vw] font-bold tracking-tight leading-none text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                                aria-hidden
                            >
                                LET&apos;S TALK
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
                            <span className="text-xs sm:text-sm text-white/20 group-hover:text-brand/60 transition-colors duration-500 tracking-wide">
                                {SITE_CONFIG.email}
                            </span>
                            <span className="text-white/20 group-hover:text-brand/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-lg">↗</span>
                        </div>
                    </a>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.06] mt-8 sm:mt-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-white/20 uppercase tracking-[0.15em]">
                    <span>© {new Date().getFullYear()} {SITE_CONFIG.name}</span>
                    <span className="hidden sm:inline">{SITE_CONFIG.location}</span>
                    <div className="flex items-center gap-6">
                        <Link href={SITE_CONFIG.social.github} target="_blank" className="hover:text-brand transition-colors duration-500">GH</Link>
                        <Link href={SITE_CONFIG.social.linkedin} target="_blank" className="hover:text-brand transition-colors duration-500">LI</Link>
                        <Link href={SITE_CONFIG.social.twitter} target="_blank" className="hover:text-brand transition-colors duration-500">TW</Link>
                    </div>
                    <button onClick={scrollToTop} className="hover:text-brand transition-all duration-500 cursor-pointer group flex items-center gap-1.5">
                        <span>Top</span>
                        <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
