"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-7 text-sm font-medium tracking-tight">
      {links.map((l) => {
        const active = isActive(pathname, l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={
              "transition underline-offset-4 " +
              (active
                ? "text-brand-gold underline decoration-brand-gold/70 font-semibold"
                : "text-white/90 hover:text-white hover:underline decoration-brand-gold/40")
            }
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
