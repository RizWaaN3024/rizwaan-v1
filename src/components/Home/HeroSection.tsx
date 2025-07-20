import React from 'react'
import SplashCursor from '../SplashCursor'

const HeroSection = () => {
    return (
        <section className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-[175px]">
            <div className="lg:container mx-auto px-4">
                <div className="max-w-5xl">
                    <p className='text-lg md:text-xl mb-6 font-light tracking-wide mx-2'>
                        Hi, I'm Rizwaan
                    </p>
                    <div className="mb-10">
                        <h1 className="text-[12vw] tracking-tighter font-medium leading-[0.9]">Full Stack</h1>
                        <h1 className="text-[12vw] font-medium leading-[0.9]">Developer</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="h-[1px] w-[60px] bg-white mr-4"></div>
                        <p className="text-base md:text-lg text-white/70">Based in Bengaluru, India</p>
                    </div>
                </div>
            </div>
            <SplashCursor />
        </section>
    )
}

export default HeroSection