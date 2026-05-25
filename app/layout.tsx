import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import ScrollManager from './components/ScrollManager';
import { Analytics } from '@vercel/analytics/next';
import { site } from '@/lib/content';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const description =
  'Personalized 1:1 fitness coaching for in-person and online clients focused on strength, fat loss, body recomposition, habits, and long-term results.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Dorsa Wellness | In-Person & Online Fitness Coaching',
  description,
  openGraph: {
    title: 'Dorsa Wellness | In-Person & Online Fitness Coaching',
    description,
    url: site.url,
    siteName: site.name,
    images: [{ url: '/images/heroimage.JPG', width: 1200, height: 630, alt: site.name }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dorsa Wellness | In-Person & Online Fitness Coaching',
    description,
  },
  appleWebApp: {
    title: site.name,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if('scrollRestoration' in history)history.scrollRestoration='manual';var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){window.scrollTo(0,0);if(location.hash)history.replaceState(null,'',location.pathname+location.search);}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ScrollManager />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
