import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { student } from "./lib/siteContent";
import SiteNav from "./components/SiteNav";

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
        <div className="min-h-screen">
          <header className="relative overflow-hidden bg-gradient-to-br from-brand-purple via-[#2b0f52] to-[#0b0713] text-white backdrop-blur-sm">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-90" />
            <div className="absolute -left-32 -top-40 h-80 w-80 rounded-full bg-brand-gold/[0.08] blur-2xl" />
            <div className="absolute -right-40 -top-24 h-80 w-80 rounded-full bg-white/[0.06] blur-2xl" />

            <div className="lsu-container py-12 sm:py-14">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="group flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-lg font-black tracking-tight text-brand-purple shadow-sm">
                    LSU
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/90">
                      Student Portfolio
                    </p>
                    <p className="text-lg font-bold tracking-tight text-white">
                      {student.name}
                    </p>
                  </div>
                </Link>

                <SiteNav />
              </div>

              <div className="mt-6 hidden sm:block">
                <p className="max-w-2xl text-sm leading-6 text-white/65">
                  Purple and Gold — projects, writing, and what I’m learning at LSU.
                </p>
              </div>
            </div>
          </header>

          <main className="lsu-container py-14 sm:py-16">{children}</main>

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
                <div className="flex flex-wrap gap-3 text-xs text-foreground/70">
                  <a
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href={`mailto:${student.email}`}
                  >
                    Email
                  </a>
                  <Link
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/journey"
                  >
                    Journey
                  </Link>
                  <Link
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/performance"
                  >
                    Performance
                  </Link>
                  <Link
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
                    href="/projects"
                  >
                    Projects
                  </Link>
                  <Link
                    className="font-medium text-foreground/70 underline decoration-brand-gold/40 underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition"
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
