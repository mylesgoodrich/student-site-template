import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDate, getPostBySlug, posts, student } from "../../lib/siteContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="space-y-10">
      <header className="lsu-card relative overflow-hidden">
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
              {formatDate(post.date)} • {student.name}
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

      <article className="lsu-card prose prose-zinc max-w-none prose-a:text-brand-purple prose-a:decoration-brand-gold/70 prose-a:underline-offset-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
