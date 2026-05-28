import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Hanken_Grotesk, Courier_Prime } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/shared/SplashScreen";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "CareerOS | Your AI-Powered Path to Career Success",
    template: "%s | CareerOS",
  },
  description:
    "Ace interviews, optimize resumes, and build your career with AI. CareerOS is your all-in-one AI placement assistant for jobs, internships, and career growth.",
  keywords: [
    "AI resume analyzer",
    "mock interview",
    "career roadmap",
    "placement assistant",
    "ATS score",
    "job preparation",
    "career development",
    "interview practice",
  ],
  authors: [{ name: "CareerOS" }],
  creator: "CareerOS",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://careeros.ai"
  ),
  openGraph: {
    title: "CareerOS | Your AI-Powered Path to Career Success",
    description:
      "Ace interviews, optimize resumes, and build your career with AI.",
    type: "website",
    siteName: "CareerOS",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerOS | Your AI-Powered Path to Career Success",
    description:
      "Ace interviews, optimize resumes, and build your career with AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { SharedAuthProvider } from "@/lib/auth-shim";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SharedAuthProvider>
      <ThemeProvider>
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${hankenGrotesk.variable} ${courierPrime.variable}`}>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          </head>
          <body
            className="min-h-screen bg-background font-body-md text-on-background text-body-md antialiased transition-colors duration-300"
          >
            <SplashScreen />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </SharedAuthProvider>
  );
}
