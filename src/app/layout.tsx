import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSiteUrl } from '../lib/toolsConfig';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'PixelLocal - Fast, Free, Privacy-First Local Image Tools',
    template: '%s | PixelLocal',
  },
  description:
    'Free online image conversion, compression, and resizing tools. Files are processed locally in your browser with zero server uploads.',
  keywords: [
    'heic to jpg',
    'image compressor',
    'resize image',
    'batch image converter',
    'privacy first image tools',
    'local browser image processing',
  ],
  authors: [{ name: 'PixelLocal' }],
  creator: 'PixelLocal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getSiteUrl(),
    siteName: 'PixelLocal',
    title: 'PixelLocal - Fast, Free, Privacy-First Local Image Tools',
    description:
      'Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal image processing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelLocal - Fast, Free, Privacy-First Image Tools',
    description: '100% on-device local image conversion, compression, and resizing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
