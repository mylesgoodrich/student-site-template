import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { student } from "./lib/siteContent";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${student.name} | LSU Student`,
  description: "A student portfolio site with projects and writing.",
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
        <a
          href="#main-content"
          className="lsu-skip-link"
        >
          Skip to main content
        </a>
        <div className="min-h-screen">
          <Header />

          <main
            id="main-content"
            tabIndex={-1}
            className="lsu-container py-10 sm:py-14 md:py-16 outline-none"
          >
            {children}
          </main>

          <div className="mt-10">
            <div className="lsu-container">
              <p className="py-10 text-center text-xs sm:text-sm text-foreground/60">
                Structure compounds.
              </p>
            </div>
          </div>

          <footer className="mt-2 bg-surface-2/95">
            <div className="lsu-container py-8 border-t border-border/60">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-2">
                  © {new Date().getFullYear()} {student.name}. Geaux Tigers.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/70 sm:gap-3">
                  <a
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href={`mailto:${student.email}`}
                  >
                    Email
                  </a>
                  <Link
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/journey"
                  >
                    Journey
                  </Link>
                  <Link
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/performance"
                  >
                    Performance
                  </Link>
                  <Link
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/projects"
                  >
                    Projects
                  </Link>
                  <Link
                    className="lsu-footer-link font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
