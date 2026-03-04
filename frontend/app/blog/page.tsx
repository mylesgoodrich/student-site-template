"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Pill from "../components/ui/Pill";
import TagPill from "../components/TagPill";
import { formatDate, getPostHref, posts, student } from "../lib/siteContent";

type SortOption = "newest" | "oldest";

function getUniqueTags() {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  const tags = Array.from(set).sort();
  if (tags.includes("Journey")) {
    return ["Journey", ...tags.filter((t) => t !== "Journey")];
  }
  return tags;
}

function getReadingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function sortPostsNewestFirst(list: typeof posts) {
  return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogIndexPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const uniqueTags = useMemo(() => getUniqueTags(), []);

  const heroPosts = useMemo(() => {
    const newest = sortPostsNewestFirst(posts);
    const pinned = newest.filter((p) => p.pinned);
    const notPinned = newest.filter((p) => !p.pinned);
    const combined = [...pinned, ...notPinned];
    return combined.slice(0, 3);
  }, []);

  useEffect(() => {
    if (heroPaused) return;
    if (heroPosts.length <= 1) return;

    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroPosts.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [heroPaused, heroPosts.length]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroIndex((i) => (heroPosts.length ? i % heroPosts.length : 0));
  }, [heroPosts.length]);

  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = posts.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = tagFilter == null || p.tags.includes(tagFilter);
      return matchSearch && matchTag;
    });
    list = [...list].sort((a, b) => {
      const d = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === "newest" ? -d : d;
    });
    return list;
  }, [search, tagFilter, sort]);

  useEffect(() => {
    if (!sortMenuOpen) return;

    function handleClick(event: MouseEvent) {
      if (!sortMenuRef.current) return;
      if (!(event.target instanceof Node)) return;
      if (!sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSortMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [sortMenuOpen]);

  return (
    <div className="space-y-10">
      <header className="lsu-card relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/[0.08] blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/[0.10] blur-2xl" />
        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="lsu-badge">Blog</span>
            <p className="text-sm text-muted">
              Writing by{" "}
              <span className="font-semibold text-foreground">{student.name}</span>
            </p>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Notes in Purple &amp; Gold
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Short essays, project updates, and what I&rsquo;m learning at LSU.
          </p>
        </div>
      </header>

      {heroPosts.length > 0 && (
        <section
          className="lsu-card relative overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/[0.08] blur-2xl" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/[0.10] blur-2xl" />

          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="lsu-badge">Featured</span>
                <span className="text-sm text-muted">
                  Rotating highlights • {heroPaused ? "Paused" : "Auto"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHeroIndex((i) => (i - 1 + heroPosts.length) % heroPosts.length)}
                  className="rounded-xl border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition hover:bg-surface-2"
                  aria-label="Previous featured post"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((i) => (i + 1) % heroPosts.length)}
                  className="rounded-xl border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition hover:bg-surface-2"
                  aria-label="Next featured post"
                >
                  →
                </button>
              </div>
            </div>

            {(() => {
              const post = heroPosts[heroIndex];
              const minutes = getReadingTimeMinutes(post.content);
              const accent = post.cover?.accent ?? "gold";
              const barClass =
                accent === "purple" ? "bg-brand-purple/70" : "bg-brand-gold/70";

              return (
                <div className="relative">
                  <div className={`h-1 w-full rounded-full ${barClass}`} />

                  <div className="mt-5 space-y-3">
                    {post.cover?.eyebrow && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                        {post.cover.eyebrow}
                      </p>
                    )}

                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      <Link
                        href={getPostHref(post.slug)}
                        className="underline decoration-brand-gold/40 underline-offset-4 transition hover:text-brand-purple hover:decoration-brand-gold"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="max-w-3xl text-base leading-7 text-muted">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-2">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{minutes} min read</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">{student.name}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <TagPill key={tag} label={tag} />
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={getPostHref(post.slug)}
                        className="inline-flex items-center rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                      >
                        Read featured post →
                      </Link>

                      <div className="flex items-center gap-2">
                        {heroPosts.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setHeroIndex(idx)}
                            aria-label={`Go to featured post ${idx + 1}`}
                            className={
                              "h-2.5 w-2.5 rounded-full transition " +
                              (idx === heroIndex
                                ? "bg-brand-gold"
                                : "bg-border hover:bg-brand-gold/60")
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent my-12" />

      <div className="space-y-4">
        <input
          type="search"
          placeholder="Search by title, excerpt, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-purple/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
          aria-label="Search posts"
        />
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Pill
              as="button"
              active={tagFilter == null}
              onClick={() => setTagFilter(null)}
            >
              All
            </Pill>
            {uniqueTags.map((tag) => (
              <Pill
                key={tag}
                as="button"
                active={tagFilter === tag}
                onClick={() => setTagFilter(tag)}
              >
                {tag}
              </Pill>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Sort:</span>
            <div className="relative" ref={sortMenuRef}>
              <button
                type="button"
                className="flex items-center gap-1 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-foreground shadow-sm transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
                onClick={() => setSortMenuOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={sortMenuOpen}
              >
                <span>{sort === "newest" ? "Newest first" : "Oldest first"}</span>
                <span className="text-[10px] text-muted-2">▾</span>
              </button>
              {sortMenuOpen ? (
                <div
                  className="absolute right-0 z-30 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-surface/95 text-xs text-foreground shadow-lg backdrop-blur"
                  role="listbox"
                  aria-label="Sort posts"
                >
                  <button
                    type="button"
                    className={`flex w-full items-center px-3 py-2 text-left transition hover:bg-surface-2 ${
                      sort === "newest" ? "bg-brand-purple/25 text-foreground" : ""
                    }`}
                    onClick={() => {
                      setSort("newest");
                      setSortMenuOpen(false);
                    }}
                    role="option"
                    aria-selected={sort === "newest"}
                  >
                    Newest first
                  </button>
                  <button
                    type="button"
                    className={`flex w-full items-center px-3 py-2 text-left transition hover:bg-surface-2 ${
                      sort === "oldest" ? "bg-brand-purple/25 text-foreground" : ""
                    }`}
                    onClick={() => {
                      setSort("oldest");
                      setSortMenuOpen(false);
                    }}
                    role="option"
                    aria-selected={sort === "oldest"}
                  >
                    Oldest first
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent my-12" />

      <section className="grid gap-4">
        {filteredAndSorted.map((post) => {
          const minutes = getReadingTimeMinutes(post.content);
          const accent = post.cover?.accent ?? "gold";
          const barClass =
            accent === "purple" ? "bg-brand-purple/70" : "bg-brand-gold/70";
          return (
            <article
              key={post.slug}
              className="lsu-card overflow-hidden"
            >
              <div className={`-mx-6 -mt-6 h-1 rounded-t-3xl ${barClass}`} />
              <div className="pt-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-base font-semibold leading-7">
                    <Link
                      href={getPostHref(post.slug)}
                      className="underline decoration-brand-gold/60 underline-offset-4 hover:text-brand-purple hover:decoration-brand-gold"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time dateTime={post.date} className="text-sm text-muted-2 shrink-0">
                    {formatDate(post.date)} • {minutes} min read
                  </time>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <TagPill key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {filteredAndSorted.length === 0 && (
        <p className="text-sm text-muted">No posts match your search or filter.</p>
      )}
    </div>
  );
}
