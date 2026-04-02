"use client";

import { useLenis } from '@/hooks/useLenis';


export default function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    useLenis();
    return <>{children}</>
}