import { NAV_LINKS, NavLink, SOCIAL_LINKS, SocialLink } from '@/data/data'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="lg:container mx-auto px-4 py-16 border-b border-b-gray-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-medium text-[32px]"><span className="text-[#12F7D6]">{`<R/>`}</span> RizwaanAnsari</h1>
                </div>
                <div className="flex items-center">
                    <ul className="flex list-none">
                        {NAV_LINKS.map((navItem: NavLink, id: number) => {
                            return (
                                <li key={`navLink-${id}`}>
                                    <Link href={navItem.link} className="font-medium text-2xl px-8">{navItem.label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex gap-x-8">
                        {SOCIAL_LINKS.map((socialItem: SocialLink, id: number) => {
                            const Icon = socialItem.icon;
                            return (
                                <div className="" key={`socialItem-${id}`}>
                                    <Link href={socialItem.link} className="flex items-center gap-x-2">
                                        <Icon size={28} color={"#12F7D6"} />
                                        <p className="font-medium text-lg">{socialItem.label}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
