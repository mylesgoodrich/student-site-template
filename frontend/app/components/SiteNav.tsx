"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/journey", label: "Journey" },
  { href: "/performance", label: "Performance" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type SiteNavProps = { compact?: boolean };

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md";

export default function SiteNav({ compact = false }: SiteNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  const inactiveClass = compact
    ? "text-foreground/90 hover:text-foreground hover:underline decoration-brand-gold/40"
    : "text-white/90 hover:text-white hover:underline decoration-brand-gold/40";

  const inactiveClassMobile = compact
    ? "text-foreground hover:bg-surface-2"
    : "text-white hover:bg-white/10";

  useEffect(() => {
    // Close drawer when route changes (e.g. browser back); effect is the reliable hook for pathname.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset on navigation
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop */}
      <nav
        aria-label="Primary"
        className="hidden items-center gap-4 text-sm font-medium tracking-tight md:flex lg:gap-7"
      >
        {links.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                `${linkFocus} transition underline-offset-4 inline-flex min-h-[44px] items-center px-2 py-2 ` +
                (active
                  ? "text-brand-gold underline decoration-brand-gold/70 font-semibold"
                  : inactiveClass)
              }
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu control */}
      <div className="flex shrink-0 items-center md:hidden">
        <button
          type="button"
          className={
            compact
              ? `inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-border bg-surface text-foreground backdrop-blur-sm transition hover:bg-surface-2 ${linkFocus}`
              : `inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/10 ${linkFocus}`
          }
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </div>

      {/* Mobile overlay + panel */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id={panelId}
            aria-label="Primary"
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-semibold text-foreground">Menu</span>
              <button
                type="button"
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-foreground transition hover:bg-surface ${linkFocus}`}
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <ul className="mt-4 flex flex-col gap-1">
              {links.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        `block rounded-xl px-4 py-3 text-base font-medium transition ${linkFocus} ` +
                        (active
                          ? "bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/40"
                          : inactiveClassMobile)
                      }
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
