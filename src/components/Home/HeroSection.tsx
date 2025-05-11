import React from 'react'

const HeroSection = () => {
    return (
        <div className="lg:container mx-auto px-4">
            <div className="mt-[175px] max-w-5xl">
                <p className='text-lg md:text-xl mb-6 font-light tracking-wide mx-2'>
                    Hi, I'm Rizwaan
                </p>
                <div className="mb-10">
                    <h1 className="text-[12vw] tracking-tighter font-medium leading-[0.9]">Full Stack</h1>
                    <h1 className="text-[12vw] font-medium leading-[0.9]">Developer</h1>
                </div>
                <div className="flex items-center">
                    <div className="h-[1px] w-[60px] bg-black mr-4"></div>
                    <p className="text-base md:text-lg text-gray-700">Based in Bengaluru, India</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection