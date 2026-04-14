import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';

// Simple in-memory rate limit. Good enough for a portfolio.
// (For scale, swap to upstash/redis. Not needed here.)
const RATE_WINDOW_MS = 60_000;
const ipHits = new Map<string, number>();

function getClientIp(req: Request) {
    const xff = req.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        const now = Date.now();
        const lastHit = ipHits.get(ip) ?? 0;

        if (now - lastHit < RATE_WINDOW_MS) {
            return NextResponse.json(
                { error: 'Whoa there, enthusiast. Give it a minute.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            const first = parsed.error.issues[0];
            return NextResponse.json(
                { error: first?.message ?? 'That form looks a bit off.' },
                { status: 400 }
            );
        }

        // Honeypot — silently accept bots, don't tell them they failed
        if (parsed.data.website) {
            return NextResponse.json({ ok: true });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;

        if (!apiKey || !to) {
            console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars');
            return NextResponse.json(
                { error: 'Something broke on my end. Try again?' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const { name, email, message } = parsed.data;

        const { error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [to],
            replyTo: email,
            subject: `New message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px;">
                    <h2 style="color:#12F7D6; margin:0 0 16px;">New portfolio message</h2>
                    <p style="margin:4px 0;"><strong>From:</strong> ${escapeHtml(name)}</p>
                    <p style="margin:4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                    <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                    <div style="white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Email service is grumpy today. Try again in a bit.' },
                { status: 502 }
            );
        }

        ipHits.set(ip, now);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Contact route error:', err);
        return NextResponse.json(
            { error: 'Something broke. Probably my fault.' },
            { status: 500 }
        );
    }
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
