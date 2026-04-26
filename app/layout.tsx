import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-provider";
import "./globals.css";

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Made Resto | Blip Project",
  description: "Restoran yang menyajikan kelezat dan kualitas, memberikan pengalaman kuliner terbaik untuk setiap pengunjung. Temukan menu spesial kami dan rasakan suasana yang nyaman.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${barlow.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[var(--color-base-dark-1)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html >
  );
}
