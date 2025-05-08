import { NAV_LINKS, NavLink } from '@/data/data'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="lg:container mx-auto px-4 py-16">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-medium text-[32px]"><span className="text-[#12F7D6]">{`<R/>`}</span> RizwaanAnsari</h1>
                </div>
                <div>
                    <ul className="flex list-none">
                        {NAV_LINKS.map((navItem: NavLink, id: number) => {
                            return (
                                <li key={`navLink-${id}`}>
                                    <Link href={navItem.link} className="font-medium text-2xl px-8">{navItem.label}</Link>
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
