"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/about' },
  { label: 'Projects', link: '/projects' },
  { label: 'Contact', link: '/contact' },
];

const AnimatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const navItemsRef = useRef([]);
  const hamburgerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current
      .set(overlayRef.current, { display: 'flex' })
      .fromTo(overlayRef.current, 
        { clipPath: 'circle(0% at 95% 5%)' }, 
        { 
          clipPath: 'circle(150% at 95% 5%)', 
          duration: 0.8, 
          ease: 'power2.inOut' 
        }
      )
      .fromTo(navItemsRef.current, 
        { 
          y: 100, 
          opacity: 0, 
          rotateX: -90 
        }, 
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'back.out(1.7)' 
        }, '-=0.3'
      );
  }, []);

  const toggleNav = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    gsap.to(hamburgerRef.current.children, {
      rotation: newState ? 45 : 0,
      transformOrigin: 'center',
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(hamburgerRef.current.children[1], {
      scaleX: newState ? 0 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(hamburgerRef.current.children[2], {
      rotation: newState ? -45 : 0,
      y: newState ? -8 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(hamburgerRef.current.children[0], {
      y: newState ? 8 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    if (newState) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="lg:container mx-auto px-4">
        <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 lg:px-12">
            <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative z-50">
                <h1 className="font-bold text-2xl text-white mix-blend-difference">
                Rizwaan
                </h1>
            </div>

            {/* Hamburger Menu */}
            <button 
                ref={hamburgerRef}
                onClick={toggleNav}
                className="relative z-[999] w-8 h-8 flex flex-col justify-between mix-blend-difference"
                aria-label="Toggle menu"
            >
                <span className="w-full h-0.5 bg-white transform transition-transform origin-center"></span>
                <span className="w-full h-0.5 bg-white transform transition-transform"></span>
                <span className="w-full h-0.5 bg-white transform transition-transform origin-center"></span>
            </button>
            </div>
        </nav>
      </div>

      {/* Fullscreen Navigation Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 z-40 hidden items-center justify-center"
        style={{ clipPath: 'circle(0% at 95% 5%)' }}
      >
        <div className="text-center">
          <ul className="space-y-8">
            {NAV_LINKS.map((item, index) => (
              <li 
                key={index}
                ref={el => navItemsRef.current[index] = el}
                className="overflow-hidden px-6"
              >
                <a 
                  href={item.link}
                  onClick={() => toggleNav()}
                  className="inline-block text-6xl md:text-8xl font-bold text-white hover:text-purple-400 transition-colors duration-300 transform hover:scale-110 hover:rotate-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="mt-16 space-x-8">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
              <a 
                key={social}
                href="#"
                ref={el => navItemsRef.current[NAV_LINKS.length + index] = el}
                className="text-white/60 hover:text-white text-lg transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default AnimatedNavbar;