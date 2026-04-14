import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { SITE_CONFIG } from "@/lib/site-config";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: SITE_CONFIG.metadata.title,
	description: SITE_CONFIG.metadata.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<LenisProvider>
					{children}
				</LenisProvider>
				<Toaster
					position="bottom-right"
					theme="dark"
					toastOptions={{
						style: {
							background: '#0a0a0a',
							border: '1px solid rgba(255,255,255,0.1)',
							color: 'rgba(255,255,255,0.9)',
							fontFamily: 'var(--font-geist-sans)',
						},
						className: 'font-medium',
					}}
				/>
				<Analytics />
			</body>
		</html>
	);
}
