"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useLenis = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            syncTouch: false,
            syncTouchLerp: 0.075,
            gestureOrientation: 'vertical',
            touchMultiplier: 2,
            infinite: false,
            wheelMultiplier: 1,
            autoResize: true,
            prevent: (node) => {
                return node.tagName === 'INPUT' || 
                       node.tagName === 'TEXTAREA' || 
                       node.tagName === 'SELECT' ||
                       node.classList.contains('no-lenis');
            }
        })

        lenis.on('scroll', (e) => {
            ScrollTrigger.update();
        });

        const ticker = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);


        const handleResize = () => {
            lenis.resize();
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            lenis.destroy();
            gsap.ticker.remove(ticker);
        };
    }, [])
}