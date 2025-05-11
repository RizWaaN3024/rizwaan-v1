import { NAV_LINKS, NavLink, SOCIAL_LINKS, SocialLink } from '@/data/data'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="lg:container mx-auto px-4 py-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-medium text-lg text-black">Rizwaan</h1>
                </div>
                <div className="flex items-center">
                    <ul className="flex list-none">
                        {NAV_LINKS.map((navItem: NavLink, id: number) => {
                            return (
                                <li key={`navLink-${id}`}>
                                    <Link href={navItem.link} className="font-medium text-base px-[10px] text-black">{navItem.label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
