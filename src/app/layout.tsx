import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import "./globals.css";
import HeroBackgroundLoader from "@/components/hero-background-loader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DATA.url;
const pageTitle = "Urvashi Vishwakarma | ECE Student & Hardware Builder";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: DATA.description,
  openGraph: {
    title: pageTitle,
    description: DATA.description,
    url: siteUrl,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
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
  twitter: {
    title: pageTitle,
    card: "summary_large_image",
    description: DATA.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <HeroBackgroundLoader />
            <div className="relative z-10 mx-auto w-full max-w-[680px] px-6 pb-28 pt-36 sm:pt-44">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
