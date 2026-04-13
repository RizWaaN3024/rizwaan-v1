"use client";
import Link from 'next/link';
import { BsArrowLeft, BsDownload } from 'react-icons/bs';
import { SITE_CONFIG } from '@/lib/site-config';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RESUME_PATH = '/rizwaan-ansari-resume.pdf';

export default function ResumeViewer() {
    const [numPages, setNumPages] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const mainRef = useRef<HTMLDivElement>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const update = () => {
            if (mainRef.current) {
                const padding = 64;
                setContainerWidth(Math.min(mainRef.current.clientWidth - padding, 900));
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const scrollToPage = (pageNumber: number) => {
        pageRefs.current[pageNumber - 1]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        setActivePage(pageNumber);
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <header className="border-b border-white/10 flex-shrink-0 z-10">
                <div className="px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-all duration-500 ease-out"
                    >
                        <BsArrowLeft
                            size={16}
                            className="transform group-hover:-translate-x-1 transition-transform duration-300"
                        />
                        <span className="uppercase tracking-[0.15em]">Back</span>
                    </Link>

                    <div className="hidden md:block text-xs text-white/40 uppercase tracking-[0.3em]">
                        {SITE_CONFIG.name} — Resume
                    </div>

                    <a
                        href={RESUME_PATH}
                        download
                        className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-white/90 border border-brand/30 hover:border-brand/60 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px] cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                        <span className="relative z-10">Download</span>
                        <BsDownload
                            size={14}
                            className="relative z-10 transform group-hover:translate-y-0.5 transition-transform duration-300"
                        />
                    </a>
                </div>
            </header>

            {/* Desktop: side-by-side layout */}
            <div className="hidden md:flex flex-1 overflow-hidden">
                {/* Left: Thumbnail sidebar */}
                <aside className="w-56 lg:w-64 flex-shrink-0 border-r border-white/10 overflow-y-auto bg-neutral-950">
                    <div className="p-5">
                        <p className="text-xs text-white/40 uppercase tracking-[0.3em] mb-5">
                            Pages
                        </p>
                        <Document
                            file={RESUME_PATH}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div className="text-xs text-white/30">Loading...</div>}
                            error={<div className="text-xs text-red-400/70">Failed to load</div>}
                        >
                            <div className="space-y-4">
                                {Array.from({ length: numPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => scrollToPage(i + 1)}
                                        className={`group block w-full text-left transition-all duration-300 cursor-pointer ${
                                            activePage === i + 1
                                                ? 'opacity-100'
                                                : 'opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <div
                                            className={`relative border transition-all duration-300 rounded overflow-hidden ${
                                                activePage === i + 1
                                                    ? 'border-brand/60 shadow-lg shadow-brand/10'
                                                    : 'border-white/10 group-hover:border-white/30'
                                            }`}
                                        >
                                            <Page
                                                pageNumber={i + 1}
                                                width={180}
                                                renderAnnotationLayer={false}
                                                renderTextLayer={false}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mt-2 px-1">
                                            <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                                                activePage === i + 1 ? 'text-brand' : 'text-white/40'
                                            }`}>
                                                Page {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {activePage === i + 1 && (
                                                <span className="w-1 h-1 rounded-full bg-brand"></span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Document>
                    </div>
                </aside>

                {/* Right: Main PDF viewer */}
                <div
                    ref={mainRef}
                    className="flex-1 overflow-y-auto bg-neutral-900"
                >
                    <div className="flex flex-col items-center py-8 px-8 gap-8">
                        <Document
                            file={RESUME_PATH}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div className="text-sm text-white/40 py-20">
                                    Loading resume...
                                </div>
                            }
                            error={
                                <div className="text-sm text-red-400/70 py-20">
                                    Failed to load resume. Try downloading instead.
                                </div>
                            }
                        >
                            {Array.from({ length: numPages }, (_, i) => (
                                <div
                                    key={i + 1}
                                    ref={el => { pageRefs.current[i] = el; }}
                                    className="shadow-2xl shadow-black/50"
                                >
                                    <Page
                                        pageNumber={i + 1}
                                        width={containerWidth}
                                        renderAnnotationLayer={false}
                                        renderTextLayer
                                    />
                                </div>
                            ))}
                        </Document>
                    </div>
                </div>
            </div>

            {/* Mobile fallback */}
            <div className="md:hidden flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="w-20 h-24 border border-white/20 rounded-lg flex items-center justify-center mb-8 bg-white/[0.02]">
                    <span className="text-xs text-white/40 uppercase tracking-wider">PDF</span>
                </div>
                <h1 className="text-2xl font-medium mb-3">My Resume</h1>
                <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-xs">
                    For the best experience, download and view the PDF on your device.
                </p>
                <a
                    href={RESUME_PATH}
                    download
                    className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wider uppercase text-white/90 border border-brand/30 hover:border-brand/60 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px] cursor-pointer"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                    <span className="relative z-10">Download Resume</span>
                    <BsDownload
                        size={14}
                        className="relative z-10 transform group-hover:translate-y-0.5 transition-transform duration-300"
                    />
                </a>
                <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 text-xs text-white/40 hover:text-brand uppercase tracking-[0.2em] transition-colors duration-500"
                >
                    Or open in browser →
                </a>
            </div>
        </main>
    );
}
