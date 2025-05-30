'use client';

import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

export default function MainLayout({ 
  children, 
  title = 'RE/MAX Blue Ocean | Luxury Real Estate in Nosara & Sámara, Costa Rica',
  description = 'Discover luxury properties in Costa Rica\'s Blue Zone with RE/MAX Blue Ocean. Expert real estate services in Nosara, Sámara, and surrounding areas.',
  keywords = 'real estate, Costa Rica, luxury properties, Nosara, Sámara, Blue Zone, RE/MAX, beachfront, vacation homes'
}: MainLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted on the client
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
