import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Navbar from './components/layout/Navbar';
import ScrollManager from './components/ScrollManager';
import RevealObserver from './components/RevealObserver';
import { site } from '@/lib/content';

const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  weight: '300 900',
  display: 'swap',
});

const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const title = `${site.name} | Personal Training in Tysons Corner, VA & Virtual`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  // Every host (old domain, vercel.app, previews) points search engines at the main domain.
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
  },
  appleWebApp: {
    title: site.shortName,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

// Runs before paint: enables scroll-reveal styles only when JS is available,
// and keeps the original "reload returns to top" behaviour.
const bootScript = `(function(){document.documentElement.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){window.scrollTo(0,0);if(location.hash)history.replaceState(null,'',location.pathname+location.search);}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollManager />
        <RevealObserver />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
