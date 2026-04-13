"use client";
import dynamic from 'next/dynamic';

const ResumeViewer = dynamic(() => import('@/components/ResumeViewer'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-sm text-white/40 uppercase tracking-[0.3em]">Loading...</div>
        </div>
    ),
});

export default function ResumePage() {
    return <ResumeViewer />;
}
