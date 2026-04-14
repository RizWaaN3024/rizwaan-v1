"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { SITE_CONFIG } from '@/lib/site-config';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { contactSchema } from '@/lib/contact-schema';

type FormFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    textarea?: boolean;
    rows?: number;
    counter?: { value: number; max: number };
};

const FormField = ({
    id,
    label,
    value,
    onChange,
    error,
    disabled,
    placeholder,
    type = 'text',
    textarea = false,
    rows = 4,
    counter,
}: FormFieldProps) => {
    const hasError = Boolean(error);
    const filled = value.length > 0;

    const sharedInputCls = `peer w-full bg-transparent text-white text-base sm:text-lg py-3 focus:outline-none placeholder:text-white/20 disabled:opacity-50 caret-brand`;

    return (
        <div className="group relative">
            <div className="flex items-baseline justify-between mb-3">
                <label
                    htmlFor={id}
                    className={`block text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors duration-500 ${
                        hasError ? 'text-red-400/80' : filled ? 'text-brand/70' : 'text-white/30 group-focus-within:text-brand/70'
                    }`}
                >
                    {label}
                </label>
                {counter && (
                    <span className={`text-[10px] tabular-nums tracking-wider transition-colors duration-500 ${
                        counter.value > counter.max * 0.9 ? 'text-brand/70' : 'text-white/20'
                    }`}>
                        {counter.value} / {counter.max}
                    </span>
                )}
            </div>

            <div className="relative">
                {textarea ? (
                    <textarea
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        rows={rows}
                        placeholder={placeholder}
                        className={`${sharedInputCls} resize-none`}
                    />
                ) : (
                    <input
                        id={id}
                        name={id}
                        type={type}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={sharedInputCls}
                    />
                )}

                {/* Static baseline */}
                <span className={`pointer-events-none absolute bottom-0 left-0 right-0 h-px transition-colors duration-500 ${
                    hasError ? 'bg-red-400/40' : 'bg-white/15'
                }`}></span>

                {/* Animated brand underline — expands from left on focus */}
                <span className={`pointer-events-none absolute bottom-0 left-0 h-[1.5px] origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-out ${
                    hasError ? 'bg-red-400/60' : 'bg-brand'
                }`} style={{ right: 0 }}></span>
            </div>

            {error && (
                <p className="text-xs text-red-400/80 mt-2">{error}</p>
            )}
        </div>
    );
};

const LOADING_LINES = [
    'Sending your message via carrier pigeon...',
    'Teaching an intern how to press Enter...',
    'Packaging bytes into envelopes...',
    'Rerouting through a chai stall...',
];

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        website: '', // honeypot
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        // Client-side validation with fun messages
        const parsed = contactSchema.safeParse(formData);
        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            parsed.error.issues.forEach(issue => {
                const key = String(issue.path[0] ?? '');
                if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            toast.error("Hold up — the form needs a little love.");
            return;
        }

        setSubmitting(true);
        const loadingLine = LOADING_LINES[Math.floor(Math.random() * LOADING_LINES.length)];
        const toastId = toast.loading(loadingLine);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsed.data),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error ?? 'Something broke. Probably my fault.', { id: toastId });
                return;
            }

            toast.success("Got it! I'll respond before your next chai gets cold ☕", { id: toastId });
            setFormData({ name: '', email: '', message: '', website: '' });
            setErrors({});
        } catch {
            toast.error('The internet decided today is not the day. Try again?', { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            id="contact"
            className="relative bg-black"
        >
            <div className="lg:container mx-auto px-5 sm:px-6">
                <div className="h-px bg-white/10"></div>
            </div>

            <div className="lg:container mx-auto px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-32 pb-6 sm:pb-8">
                <div className="max-w-6xl">
                    {/* Section label */}
                    <div className="flex items-center mb-10 sm:mb-16">
                        <div className="h-px w-10 sm:w-16 bg-brand mr-4 sm:mr-6"></div>
                        <p className="text-xs sm:text-sm text-brand uppercase tracking-[0.3em] font-medium">
                            Contact
                        </p>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight mb-14 sm:mb-20">
                        Let&apos;s build something
                        <span className="text-brand"> great</span>
                        <span className="text-white/40"> together.</span>
                    </h2>

                    {/* Content grid */}
                    <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
                        {/* Left — message + socials */}
                        <div>
                            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10">
                                Got a project in mind, a role that fits, or just want to say hi?
                                I&apos;m always open to interesting conversations and new opportunities.
                                Drop me a message and I&apos;ll get back to you soon.
                            </p>

                            <div className="mb-8 sm:mb-10">
                                <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-3">
                                    Email
                                </p>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="text-base sm:text-lg text-white/70 hover:text-brand transition-all duration-500 ease-out"
                                >
                                    {SITE_CONFIG.email}
                                </a>
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em] mb-4">
                                    Socials
                                </p>
                                <div className="flex gap-5">
                                    <Link href={SITE_CONFIG.social.github} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaGithub size={20} />
                                    </Link>
                                    <Link href={SITE_CONFIG.social.linkedin} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaLinkedin size={20} />
                                    </Link>
                                    <Link href={SITE_CONFIG.social.twitter} target="_blank" className="text-white/40 hover:text-brand transition-all duration-500 ease-out">
                                        <FaTwitter size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right — form */}
                        <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8">
                            {/* Honeypot — hidden from humans, bots love it */}
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                            />

                            <FormField
                                id="name"
                                label="Name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                disabled={submitting}
                                placeholder="Your name"
                            />
                            <FormField
                                id="email"
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                disabled={submitting}
                                placeholder="your@email.com"
                            />
                            <FormField
                                id="message"
                                label="Message"
                                value={formData.message}
                                onChange={handleChange}
                                error={errors.message}
                                disabled={submitting}
                                placeholder="Tell me about your project..."
                                textarea
                                rows={4}
                                counter={{ value: formData.message.length, max: 2000 }}
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="group relative inline-flex items-center px-8 py-4 text-sm font-medium tracking-wider uppercase text-white/90 border border-brand/30 hover:border-brand/60 transition-all duration-500 overflow-hidden hover:text-white rounded-[4px] cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-brand/5 to-brand/15 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
                                {submitting ? (
                                    <>
                                        <span className="relative z-10 inline-block w-3 h-3 border-2 border-brand/60 border-t-transparent rounded-full animate-spin mr-2"></span>
                                        <span className="relative z-10">Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10">Send Message</span>
                                        <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Giant CTA — integrated, no separate animation */}
                <div className="mt-16 sm:mt-24 pt-10 sm:pt-16 border-t border-white/10">
                    <a href={`mailto:${SITE_CONFIG.email}`} className="group block text-center">
                        <p className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.3em] mb-4 sm:mb-6 group-hover:text-white/50 transition-colors duration-500">
                            Have a project in mind?
                        </p>
                        <div className="relative inline-block">
                            <span className="block text-[11vw] sm:text-[9vw] lg:text-[7vw] font-bold tracking-tight leading-none text-brand/25 group-hover:text-brand transition-colors duration-700 ease-out">
                                LET&apos;S TALK
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
                            <span className="text-xs sm:text-sm text-white/20 group-hover:text-brand/60 transition-colors duration-500 tracking-wide">
                                {SITE_CONFIG.email}
                            </span>
                            <span className="text-white/20 group-hover:text-brand/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-lg">↗</span>
                        </div>
                    </a>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.06] mt-8 sm:mt-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-white/20 uppercase tracking-[0.15em]">
                    <span>© {new Date().getFullYear()} {SITE_CONFIG.name}</span>
                    <span className="hidden sm:inline">{SITE_CONFIG.location}</span>
                    <div className="flex items-center gap-6">
                        <Link href={SITE_CONFIG.social.github} target="_blank" className="hover:text-brand transition-colors duration-500">GH</Link>
                        <Link href={SITE_CONFIG.social.linkedin} target="_blank" className="hover:text-brand transition-colors duration-500">LI</Link>
                        <Link href={SITE_CONFIG.social.twitter} target="_blank" className="hover:text-brand transition-colors duration-500">TW</Link>
                    </div>
                    <button onClick={scrollToTop} className="hover:text-brand transition-all duration-500 cursor-pointer group flex items-center gap-1.5">
                        <span>Top</span>
                        <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
