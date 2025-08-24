import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export interface NavLink {
    id: number;
    label: string;
    link: string;
}

export interface SocialLink {
    id: number;
    label: string;
    icon: React.ElementType;
    link: string;
}

export const NAV_LINKS: NavLink[] = [
    {
        id: 1,
        label: "Home",
        link: "/home"
    },
    {
        id: 2,
        label: "About",
        link: "/about"
    },
    {
        id: 3,
        label: "Blogs",
        link: "/blog"
    },
    {
        id: 4,
        label: "Contact",
        link: "/blog"
    }
]