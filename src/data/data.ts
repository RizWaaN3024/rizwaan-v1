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

export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 1,
        label: "Instagram",
        icon: FaInstagram,
        link: "",
    },
    {
        id: 2,
        label: "Github",
        icon: FaGithub,
        link: "",
    },
    {
        id: 3,
        label: "LinkedIn",
        icon: FaLinkedin,
        link: "",
    },
]