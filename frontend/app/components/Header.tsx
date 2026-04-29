"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { student } from "../lib/siteContent";
import SiteNav from "./SiteNav";

/** Scroll past this (px) to switch to compact sticky header */
const SCROLL_DOWN_THRESHOLD = 120;
/** Scroll back above this (px) to switch back to full header */
const SCROLL_UP_THRESHOLD = 60;
/** Ignore scroll for this long (ms) after a state change so layout shift doesn't retrigger */
const COOLDOWN_MS = 450;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrolled = useRef(false);
  const rafId = useRef<number | null>(null);
  const lockUntil = useRef(0);

  useEffect(() => {
    function updateFromScroll() {
      if (Date.now() < lockUntil.current) {
        rafId.current = null;
        return;
      }
      const y = window.scrollY;
      const wasScrolled = lastScrolled.current;
      if (!wasScrolled && y > SCROLL_DOWN_THRESHOLD) {
        lastScrolled.current = true;
        lockUntil.current = Date.now() + COOLDOWN_MS;
        setIsScrolled(true);
      } else if (wasScrolled && y <= SCROLL_UP_THRESHOLD) {
        lastScrolled.current = false;
        lockUntil.current = Date.now() + COOLDOWN_MS;
        setIsScrolled(false);
      }
      rafId.current = null;
    }
    function handleScroll() {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(updateFromScroll);
    }
    const y = typeof window !== "undefined" ? window.scrollY : 0;
    lastScrolled.current = y > SCROLL_DOWN_THRESHOLD;
    setIsScrolled(lastScrolled.current);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 overflow-x-clip text-white transition-[background,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none ${
        isScrolled
          ? "border-b border-border bg-surface/85 shadow-sm backdrop-blur"
          : "bg-gradient-to-br from-brand-purple via-[#2b0f52] to-[#0b0713] backdrop-blur-sm"
      }`}
    >
      {!isScrolled && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-90" />
          <div className="absolute -left-32 -top-40 h-80 w-80 rounded-full bg-brand-gold/[0.08] blur-2xl" />
          <div className="absolute -right-40 -top-24 h-80 w-80 rounded-full bg-white/[0.06] blur-2xl" />
        </>
      )}

      <div
        className={`lsu-container transition-all duration-300 ease-out ${
          isScrolled ? "py-4 sm:py-5" : "py-6 sm:py-8 lg:py-10"
        }`}
      >
        <div className="flex items-center justify-between gap-4 md:gap-6 lg:items-center">
          <Link
            href="/"
            className={`group flex min-w-0 flex-1 items-center rounded-md outline-none transition-[background,box-shadow,border-color] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-brand-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:flex-initial ${
              isScrolled ? "gap-3" : "gap-4"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center rounded-xl bg-brand-gold font-black tracking-tight text-brand-purple shadow-sm transition-all duration-300 ease-out ${
                isScrolled ? "h-9 w-9 text-sm" : "h-12 w-12 text-lg"
              }`}
            >
              LSU
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/90">
                Student Portfolio
              </p>
              <p
                className={`text-lg font-bold tracking-tight ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {student.name}
              </p>
            </div>
          </Link>

          <SiteNav compact={isScrolled} />
        </div>

        <div
          className={`hidden sm:block transition-all duration-300 ease-out ${
            isScrolled ? "mt-0 overflow-hidden opacity-0" : "mt-6"
          }`}
        >
          <p className="max-w-2xl text-sm leading-6 text-white/80">
            Purple and Gold — projects, writing, and what I&apos;m learning at LSU.
          </p>
        </div>
      </div>
    </header>
  );
}
