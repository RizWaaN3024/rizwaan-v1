"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { NAV_LINKS } from '@/data/navigation';
import { SITE_CONFIG } from '@/lib/site-config';

const SECTION_IDS = NAV_LINKS.map(l => l.link.replace('#', ''));

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    const overlayRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLElement | null)[]>([]);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Scroll detection — rAF-batched + only updates state when values change
    useEffect(() => {
        let rafId = 0;
        let lastScrolled = false;
        let lastAtTop = true;

        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const y = window.scrollY;
                const nextScrolled = y > 50;
                const nextAtTop = y < window.innerHeight * 0.5;

                if (nextScrolled !== lastScrolled) {
                    lastScrolled = nextScrolled;
                    setScrolled(nextScrolled);
                }
                if (nextAtTop !== lastAtTop) {
                    lastAtTop = nextAtTop;
                    if (nextAtTop) setActiveSection('');
                }
                rafId = 0;
            });
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Active section tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        SECTION_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Overlay timeline (mobile menu)
    useEffect(() => {
        timelineRef.current = gsap.timeline({ paused: true });
        timelineRef.current
            .set(overlayRef.current, { display: 'flex' })
            .set(closeRef.current, { opacity: 0, rotation: -90, scale: 0 })
            .fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            )
            .to(closeRef.current, {
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(2)'
            }, '-=0.2')
            .fromTo(navItemsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power3.out'
                }, '-=0.3'
            );
    }, []);

    const toggleNav = () => {
        if (!hamburgerRef.current) return;
        const newState = !isOpen;
        setIsOpen(newState);

        // Hamburger → X animation
        gsap.to(hamburgerRef.current.children[0], {
            y: newState ? 6 : 0,
            rotation: newState ? 45 : 0,
            duration: 0.3,
            ease: 'power2.out',
        });
        gsap.to(hamburgerRef.current.children[1], {
            scaleX: newState ? 0 : 1,
            opacity: newState ? 0 : 1,
            duration: 0.3,
            ease: 'power2.out',
        });

        if (newState) {
            timelineRef.current?.timeScale(1).play();
        } else {
            timelineRef.current?.timeScale(1.8).reverse();
        }
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-40 opacity-0 animate-[fadeIn_1s_ease-in-out_1.5s_forwards] transition-all duration-500 ease-out ${
                    scrolled
                        ? 'bg-black/80 backdrop-blur-sm border-b border-white/10'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="lg:container mx-auto px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative z-50 text-lg font-medium text-white hover:text-brand transition-colors duration-500 ease-out"
                    >
                        {SITE_CONFIG.firstName}
                        <span className="text-brand">.</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-10">
                        {NAV_LINKS.map((item) => {
                            const id = item.link.replace('#', '');
                            const isActive = activeSection === id;
                            return (
                                <a
                                    key={item.label}
                                    href={item.link}
                                    className={`relative text-xs uppercase tracking-[0.15em] font-medium transition-all duration-500 ease-out ${
                                        isActive ? 'text-brand' : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand transition-all duration-500 ease-out ${
                                            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                        }`}
                                    ></span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Desktop Resume CTA */}
                    <Link
                        href="/resume"
                        className="hidden md:inline-flex group relative items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-brand/30 hover:border-brand/60 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px]"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                        <span className="relative z-10">Resume</span>
                        <span className="relative z-10 transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </Link>

                    {/* Mobile Hamburger — 2 bars, cleaner */}
                    <button
                        ref={hamburgerRef}
                        onClick={toggleNav}
                        className="md:hidden relative z-[110] w-8 h-6 flex flex-col justify-center gap-[5px] cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <span className="w-full h-[1.5px] bg-white origin-center"></span>
                        <span className="w-full h-[1.5px] bg-white"></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black z-[100] hidden flex-col items-center justify-center opacity-0 md:!hidden"
            >
                {/* Close Button */}
                <button
                    ref={closeRef}
                    onClick={toggleNav}
                    className="absolute top-4 right-5 sm:top-5 sm:right-6 z-10 w-10 h-10 flex items-center justify-center cursor-pointer group"
                    aria-label="Close menu"
                >
                    <span className="absolute w-5 h-[1.5px] bg-white rotate-45 transition-all duration-300 group-hover:bg-brand"></span>
                    <span className="absolute w-5 h-[1.5px] bg-white -rotate-45 transition-all duration-300 group-hover:bg-brand"></span>
                </button>

                {/* Section label */}
                <div className="absolute top-6 left-5 flex items-center">
                    <div className="h-px w-8 bg-brand mr-3"></div>
                    <p className="text-[10px] text-brand uppercase tracking-[0.3em] font-medium">
                        Menu
                    </p>
                </div>

                {/* Nav Links */}
                <ul className="w-full px-8 space-y-2">
                    {NAV_LINKS.map((item, index) => {
                        const id = item.link.replace('#', '');
                        const isActive = activeSection === id;
                        return (
                            <li
                                key={item.label}
                                ref={el => { navItemsRef.current[index] = el; }}
                            >
                                <a
                                    href={item.link}
                                    onClick={() => toggleNav()}
                                    className="group flex items-baseline gap-4 py-2"
                                >
                                    <span className="text-[11px] text-white/30 tabular-nums tracking-wider">
                                        0{index + 1}
                                    </span>
                                    <span
                                        className={`text-4xl sm:text-5xl font-medium leading-tight tracking-tight transition-all duration-500 ease-out ${
                                            isActive
                                                ? 'text-brand'
                                                : 'text-white/80 group-hover:text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        );
                    })}

                    {/* Resume link */}
                    <li ref={el => { navItemsRef.current[NAV_LINKS.length] = el; }}>
                        <Link
                            href="/resume"
                            onClick={() => toggleNav()}
                            className="group flex items-baseline gap-4 py-2"
                        >
                            <span className="text-[11px] text-white/30 tabular-nums tracking-wider">
                                0{NAV_LINKS.length + 1}
                            </span>
                            <span className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-white/80 group-hover:text-white transition-all duration-500 ease-out">
                                Resume
                                <span className="text-brand ml-2">↗</span>
                            </span>
                        </Link>
                    </li>
                </ul>

                {/* Socials */}
                <div
                    ref={el => { navItemsRef.current[NAV_LINKS.length + 1] = el; }}
                    className="absolute bottom-8 left-0 right-0 px-8 flex items-center justify-between"
                >
                    <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/30">
                        <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors duration-500">GH</a>
                        <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors duration-500">LI</a>
                        <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors duration-500">TW</a>
                    </div>
                    <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-brand transition-colors duration-500"
                    >
                        Email ↗
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
