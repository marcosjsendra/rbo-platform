import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "RE/MAX Blue Ocean Real Estate",
  description: "Luxury real estate in Costa Rica's Blue Zone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <head>
        <style>{`
          :root {
            --font-sans: ${montserrat.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
