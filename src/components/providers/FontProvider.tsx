"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.variable} font-sans`}>
      {children}
    </div>
  );
}
