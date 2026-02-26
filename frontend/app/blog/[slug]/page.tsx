import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDate, getPostHref, getPostBySlug, posts, student } from "../../lib/siteContent";

type Props = {
  params: Promise<{ slug: string }>;
};

function getReadingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const isAlcatraz =
    post.slug === "shark-fest-alcatraz-cold-water-no-turning-back";

  const sortedByDate = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedByDate.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex >= 0 && currentIndex < sortedByDate.length - 1
    ? sortedByDate[currentIndex + 1]
    : null;
  const nextPost = currentIndex > 0 ? sortedByDate[currentIndex - 1] : null;

  return (
    <div className="space-y-10">
      <header className="lsu-card relative overflow-hidden">
        {isAlcatraz && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-purple/20 to-transparent animate-wave" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-gold/10 to-transparent animate-pulse-slow" />
          </div>
        )}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/15 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link className="lsu-link text-sm" href="/blog">
              ← Back to Blog
            </Link>
            <span className="lsu-badge">Purple &amp; Gold</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-2">
              {formatDate(post.date)} • {student.name} • {getReadingTimeMinutes(post.content)} min read
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-base leading-7 text-muted">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-purple/25 bg-brand-purple/5 px-3 py-1 text-xs font-medium text-brand-purple"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent my-8" />

      <div className="relative">
        {/* Atmospheric blurs behind article */}
        <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 h-96 w-96 rounded-full bg-brand-purple/10 blur-3xl" />

        <article className="lsu-card prose prose-zinc max-w-none prose-a:text-brand-purple prose-a:decoration-brand-gold/70 prose-a:underline-offset-4 prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-brand-gold/10 prose-blockquote:rounded-xl prose-blockquote:px-6 prose-blockquote:py-4">
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <div className="mt-12 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-6 text-sm">
            <p className="font-semibold text-brand-gold">— Myles</p>
            <p className="mt-1 text-muted">Discipline compounds.</p>
          </div>
        </article>

        <nav
          className="mt-10 grid gap-4 sm:grid-cols-2"
          aria-label="Previous and next posts"
        >
          {prevPost ? (
            <Link
              href={getPostHref(prevPost.slug)}
              className="lsu-card flex items-center gap-3 transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="text-2xl text-brand-gold" aria-hidden>←</span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-2">Previous</p>
                <p className="font-semibold text-foreground truncate">{prevPost.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={getPostHref(nextPost.slug)}
              className="lsu-card flex items-center justify-end gap-3 transition hover:shadow-lg hover:-translate-y-0.5 sm:col-start-2"
            >
              <div className="min-w-0 text-right">
                <p className="text-xs font-medium text-muted-2">Next</p>
                <p className="font-semibold text-foreground truncate">{nextPost.title}</p>
              </div>
              <span className="text-2xl text-brand-gold shrink-0" aria-hidden>→</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
