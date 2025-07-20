import React from 'react'
import SplashCursor from '../SplashCursor'
import { BsArrowDown } from 'react-icons/bs'
import Link from 'next/link'
import CircularText from '../CircularText'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const HeroSection = () => {
    return (
        <section className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-[175px] flex flex-col">
            <div className="lg:container mx-auto px-4 flex-1">
                <div className="max-w-5xl relative">
                    <div>
                        <p className='text-lg md:text-xl mb-6 font-light tracking-wide mx-2'>
                            Hi, I&apos;m Rizwaan
                        </p>
                        <div className="mb-10">
                            <h1 className="text-[12vw] tracking-tighter font-medium leading-[0.9]">Full Stack</h1>
                            <h1 className="text-[12vw] font-medium leading-[0.9]">Developer</h1>
                            <div className='absolute right-0 top-[-10%]'>
                                <CircularText
                                    text="CODE*CREATE*INNOVATE*"
                                    onHover="speedUp"
                                    spinDuration={20}
                                    className="!w-40 !h-40 !z-50"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-[1px] w-[60px] bg-white mr-4"></div>
                        <p className="text-base md:text-lg text-white/70">Based in Bengaluru, India</p>
                    </div>
                    <div className='mt-8 flex items-center gap-4'>
                        <Link
                            href={"/"}
                            className='group z-50 relative inline-flex items-center px-8 py-4 text-sm font-medium tracking-wider uppercase text-white/90 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px]'>
                            <span className='absolute inset-0 bg-gradient-to-r from-white/5 to-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out'></span>
                            <span className='relative z-10'>View My Resume</span>
                            <span className='relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'>→</span>
                        </Link>
                        <div className='flex gap-4'>
                            <Link href={"/"} className='z-50 cursor-pointer hover:translate-x-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300'>
                                <FaGithub size={42} />
                            </Link>
                            <Link href={"/"} className='z-50 cursor-pointer hover:translate-x-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300'>
                                <FaLinkedin size={42} />
                            </Link>
                            <Link href={"/"} className='z-50 cursor-pointer hover:translate-x-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300'>
                                <FaTwitter size={42} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center pb-8 group cursor-pointer">
                <div className="relative overflow-hidden">
                    <p className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 group-hover:text-white group-hover:tracking-[0.3em]">
                        Scroll
                    </p>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 group-hover:w-full"></div>
                </div>
                <div className="mt-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <BsArrowDown
                        size={18}
                        className="text-white/70 group-hover:text-white transition-all duration-500 animate-bounce group-hover:animate-pulse relative z-10 group-hover:scale-110"
                    />
                </div>
            </div>

            <SplashCursor />
        </section>
    )
}

export default HeroSection