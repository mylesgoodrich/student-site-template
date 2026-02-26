// Single source of truth for site content
export const siteContent = {
  name: "Myles Goodrich",
  tagline: "Accounting student at LSU | Internal Audit & Risk Focused",
  email: "Myles.D.Goodrich@gmail.com",
  location: "Baton Rouge, LA",

  about:
    "I'm Myles Goodrich, an Accounting student at Louisiana State University pursuing the CIA & CRM Internal Audit minor. My academic focus centers on internal audit, risk management, controls, and financial analysis. I'm driven by structure, precision, and building systems that scale. Whether it's evaluating internal controls, analyzing financial data, or designing dashboards in Excel and Power BI, I approach problems with discipline and attention to detail. In addition to academics, I serve as a Private First Class in the Louisiana Army National Guard, where accountability, composure under pressure, and execution are non-negotiable.",

  interests: [
    "Internal Audit & Controls",
    "Risk Management",
    "Financial Reporting & Analysis",
    "Excel & Power BI Systems",
    "Process Improvement",
    "Leadership & Discipline",
  ],

  links: {
    linkedin: "",
    github: "",
    resume: "",
  },

  highlights: [
    "Accounting @ LSU (Ourso College of Business)",
    "CIA & CRM Internal Audit Minor",
    "Louisiana Army National Guard (PFC)",
    "Focused on scalable financial systems and control design",
  ],

  blog: {
    enabled: true,
    intro:
      "This blog documents what I'm learning in internal audit, accounting systems, risk analysis, and practical applications of financial controls.",
  },
};

export default siteContent;

// --- Types for blog & projects (used by existing pages) ---
export type BlogPostSummary = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  tags: string[];
  content: string; // markdown text
};

export type ProjectSummary = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  href?: string;
};

// Compatibility: derive student from siteContent so layout, home, blog, projects pages keep working
export const student = {
  name: siteContent.name,
  tagline: siteContent.tagline,
  email: siteContent.email,
  location: siteContent.location,
  about: siteContent.about,
  interests: siteContent.interests,
};

export const posts: BlogPostSummary[] = [
  {
    slug: "why-i-picked-the-cia-crm-internal-audit-minor",
    title: "Why I picked the CIA & CRM Internal Audit minor",
    date: "2026-02-25",
    excerpt:
      "I dropped Finance and doubled down on internal audit because I like work that's structured, evidence-based, and actually improves how organizations run.",
    tags: ["Learning", "Internal Audit"],
    content: "",
  },
  {
    slug: "building-a-coso-style-controls-exhibit-from-scratch",
    title: "Building a COSO-style controls exhibit from scratch",
    date: "2026-02-18",
    excerpt:
      "Turning a messy real-world process into clear controls, risks, and evidence taught me what internal audit really looks like beyond the textbook.",
    tags: ["Projects", "Controls", "COSO"],
    content: "",
  },
  {
    slug: "how-i-approach-a-10-k-as-an-accounting-student",
    title: "How I approach a 10-K as an accounting student",
    date: "2026-02-05",
    excerpt:
      "My checklist for reading disclosures without getting lost: start with what moves the numbers, then trace policies, estimates, and risks.",
    tags: ["Learning", "Financial Reporting"],
    content: "",
  },
  {
    slug: "what-im-building-this-semester",
    title: "What I'm building this semester (and why)",
    date: "2026-01-10",
    excerpt:
      "A quick overview of my goals, the project I'm focusing on, and the habits I'm using to stay consistent.",
    tags: ["Personal", "Projects"],
    content: `
## What I'm focused on
This semester I'm prioritizing projects that build real skills in internal audit and analytics—stuff I can explain clearly in an interview.

## What I'm building
- A simple budgeting + tracking system that's easy to audit
- A repeatable workflow for documenting controls and evidence
- A clean portfolio that shows results, not just buzzwords

## Key takeaway
Consistency beats intensity. A small weekly system compounds fast.
`.trim(),
  },
  {
    slug: "three-design-lessons-portfolio",
    title: "Three small design lessons from redesigning my portfolio",
    date: "2025-12-02",
    excerpt:
      "I kept the changes small: type scale, spacing, and clearer hierarchy. Here are the before/after takeaways.",
    tags: ["Design", "Process"],
    content: "",
  },
];

export const projects: ProjectSummary[] = [
  {
    slug: "portfolio-site",
    title: "This portfolio site",
    excerpt: "A student portfolio built with Next.js—projects, blog, and a Purple & Gold theme.",
    tags: ["Web", "Next.js"],
  },
  {
    slug: "semester-project",
    title: "Semester project",
    excerpt: "Add your project description, tech stack, and a link to the repo or live demo.",
    tags: [siteContent.interests[0]],
  },
];

export function getPostHref(slug: string) {
  return `/blog/${slug}`;
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}
