"use client";

import { useLenis } from "@/app/hooks/useLenis";


export default function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    useLenis();
    return <>{children}</>
}