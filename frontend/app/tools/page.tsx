import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, BookOpen, FlaskConical, FileText, StickyNote } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Tools | Myles Goodrich",
  description:
    "Interactive study tools for accounting courses at LSU — flashcards, practice exams, and study guides.",
};

type ToolType = "Study Guide" | "Notecards" | "Practice Exam" | "Full App";

type Tool = {
  title: string;
  href: string;
  type: ToolType;
  description: string;
};

type Course = {
  code: string;
  name: string;
  color: "gold" | "purple" | "blue";
  tools: Tool[];
};

const TYPE_ICON: Record<ToolType, React.ElementType> = {
  "Study Guide": BookOpen,
  "Notecards": StickyNote,
  "Practice Exam": FlaskConical,
  "Full App": FileText,
};

const courses: Course[] = [
  {
    code: "ACCT 3121",
    name: "Cost Accounting I",
    color: "gold",
    tools: [
      {
        title: "Exam 1 Notecards",
        href: "/tools/acct3121-exam1-notecards.html",
        type: "Notecards",
        description: "Flashcard deck covering Exam 1 topics — job costing, cost behavior, and CVP.",
      },
      {
        title: "Exam 2 Study Guide",
        href: "/tools/acct3121-exam2-studyguide.html",
        type: "Study Guide",
        description: "Complete study guide for Exam 2 with formulas, chapter breakdowns, and traps.",
      },
      {
        title: "Exam 2 Notecards",
        href: "/tools/acct3121-exam2-notecards.html",
        type: "Notecards",
        description: "Flashcard set for Exam 2 — overhead allocation, process costing, and variance.",
      },
      {
        title: "Exam 2 Notecards (ACCT 3122)",
        href: "/tools/acct3122-exam2-notecards.html",
        type: "Notecards",
        description: "Flashcard deck for the second-semester cost accounting Exam 2 topics.",
      },
      {
        title: "Final Exam Study Tool",
        href: "/tools/acct3121-final.html",
        type: "Full App",
        description:
          "Full interactive study app for the final — study guide, practice exam, and flashcards in one.",
      },
      {
        title: "Final Exam Printable Flashcards",
        href: "/tools/acct3121-flashcards-printable.html",
        type: "Notecards",
        description: "Print-ready flashcard set for the Cost Accounting final exam.",
      },
    ],
  },
  {
    code: "ACCT 3221",
    name: "Tax Accounting",
    color: "gold",
    tools: [
      {
        title: "Full Study App",
        href: "/tools/acct3221-full/index.html",
        type: "Full App",
        description: "Complete interactive study app for Tax Accounting — all topics and practice questions.",
      },
      {
        title: "Notecards",
        href: "/tools/acct3221-notecards/index.html",
        type: "Notecards",
        description: "Flashcard set covering key tax concepts, rules, and computations.",
      },
      {
        title: "Exam 3 Study App",
        href: "/tools/acct3221-exam3-study-app.html",
        type: "Full App",
        description: "Focused interactive study app for Exam 3 material.",
      },
      {
        title: "Final Exam Study App v2",
        href: "/tools/acct3221-exam3-studyapp-v2.html",
        type: "Full App",
        description: "Updated study app with Kahoot Review and §351 Deep Dive practice tests.",
      },
      {
        title: "Final Exam Study App v5",
        href: "/tools/acct3221-studyapp-v5.html",
        type: "Full App",
        description: "Latest version of the Tax Accounting final exam study app.",
      },
      {
        title: "Final Exam Printable Notecards",
        href: "/tools/acct3221-notecards-printable.html",
        type: "Notecards",
        description: "63 printable notecards covering key Tax Accounting concepts for the final.",
      },
    ],
  },
  {
    code: "ACCT 3233",
    name: "Internal Audit (CIA)",
    color: "purple",
    tools: [
      {
        title: "Final Practice Exam",
        href: "/tools/acct3233-final-practice-exam.html",
        type: "Practice Exam",
        description: "Full-length practice exam for the Internal Audit final with answer explanations.",
      },
      {
        title: "Exam Study Guide",
        href: "/tools/acct3233-study-guide-exam.html",
        type: "Study Guide",
        description: "Comprehensive study guide covering audit standards, COSO, and risk concepts.",
      },
      {
        title: "Final Study Guide",
        href: "/tools/acct3233-study-guide-final.html",
        type: "Study Guide",
        description: "Study guide focused on final exam topics — governance, fraud, and reporting.",
      },
      {
        title: "Exam Prep Notecards",
        href: "/tools/acct3233-notecards-exam-prep.html",
        type: "Notecards",
        description: "Flashcards covering core internal audit terms, standards, and frameworks.",
      },
      {
        title: "Case Study Notecards",
        href: "/tools/acct3233-notecards-case-study.html",
        type: "Notecards",
        description: "Scenario-based flashcards for applying audit judgment to case studies.",
      },
      {
        title: "ITGC Concepts Notecards",
        href: "/tools/acct3233-notecards-itgc.html",
        type: "Notecards",
        description: "IT General Controls flashcards — access controls, change management, and operations.",
      },
    ],
  },
];

const colorMap = {
  gold: {
    border: "border-brand-gold/25",
    badge: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
    accent: "bg-brand-gold/60",
    hover: "hover:border-brand-gold/50",
  },
  purple: {
    border: "border-brand-purple/25",
    badge: "bg-brand-purple/10 text-brand-purple-light border-brand-purple/30",
    accent: "bg-brand-purple/60",
    hover: "hover:border-brand-purple/50",
  },
  blue: {
    border: "border-blue-500/25",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    accent: "bg-blue-500/60",
    hover: "hover:border-blue-400/50",
  },
};

function TypeBadge({ type }: { type: ToolType }) {
  const Icon = TYPE_ICON[type];
  const styles: Record<ToolType, string> = {
    "Study Guide": "bg-amber-500/10 text-amber-300 border-amber-500/30",
    "Notecards": "bg-violet-500/10 text-violet-300 border-violet-500/30",
    "Practice Exam": "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    "Full App": "bg-sky-500/10 text-sky-300 border-sky-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${styles[type]}`}>
      <Icon size={11} />
      {type}
    </span>
  );
}

export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
          Study Tools
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Interactive study tools
          <span className="mt-2 block text-base font-normal text-muted-2 sm:text-lg">
            Built for LSU accounting courses — flashcards, practice exams, and study guides
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted">
          I built these tools to study for my own exams. Each one opens in your browser — no login,
          no download. Use them however helps you most.
        </p>
      </div>

      {/* Course sections */}
      <div className="space-y-10">
        {courses.map((course) => {
          const c = colorMap[course.color];
          return (
            <section key={course.code} className="space-y-4">
              {/* Course header */}
              <div className="flex items-center gap-3">
                <div className={`h-5 w-1 rounded-full ${c.accent}`} />
                <div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                    {course.code}
                  </span>
                  <span className="ml-2 text-sm font-medium text-muted-2">{course.name}</span>
                </div>
              </div>

              {/* Tool cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {course.tools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col gap-3 rounded-xl border ${c.border} ${c.hover} bg-surface/70 p-4 transition hover:bg-surface hover:shadow-md hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground group-hover:text-white transition">
                        {tool.title}
                      </p>
                      <ExternalLink size={14} className="mt-0.5 shrink-0 text-muted-2 group-hover:text-brand-gold transition" />
                    </div>
                    <p className="text-xs leading-relaxed text-muted">{tool.description}</p>
                    <div className="mt-auto">
                      <TypeBadge type={tool.type} />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="rounded-xl border border-border bg-surface/50 px-5 py-4">
        <p className="text-xs leading-relaxed text-muted">
          These tools were built using HTML, CSS, and JavaScript for personal exam prep at LSU.
          Content reflects course material from the E. J. Ourso College of Business.{" "}
          <Link href="/projects" className="text-brand-purple underline underline-offset-4 hover:decoration-brand-gold">
            See the full projects page →
          </Link>
        </p>
      </div>
    </div>
  );
}
