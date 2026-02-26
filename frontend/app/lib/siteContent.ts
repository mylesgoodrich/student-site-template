// Single source of truth for site content
export const siteContent = {
  name: "Myles Goodrich",
  tagline: "Structured thinking. Measurable outcomes. Repeatable systems.",
  email: "Myles.D.Goodrich@gmail.com",
  location: "Baton Rouge, LA",

  about:
    "I'm Myles Goodrich, an Accounting student at LSU pursuing the CIA & CRM Internal Audit minor. I'm interested in internal audit because I like work that is testable, evidence-based, and built to scale. My projects focus on translating messy processes into clear controls, clean documentation, and dashboards that make decisions easier. I also serve as a PFC in the Louisiana Army National Guard, where standards, accountability, and execution are non-negotiable.",

  interests: [
    "Controls & Evidence",
    "Risk Thinking",
    "Audit-Ready Documentation",
    "Excel & Power BI Systems",
    "Process Improvement",
    "Structured Execution",
  ],

  links: {
    linkedin: "https://linkedin.com/in/your-link",
    github: "",
    resume: "/Myles_Goodrich_Resume.pdf",
  },

  highlights: [
    "Accounting @ LSU (Ourso College of Business)",
    "CIA & CRM Internal Audit Minor",
    "Louisiana Army National Guard (PFC)",
    "Focused on scalable financial systems and control design",
  ],

  service: {
    branch: "Louisiana Army National Guard",
    rank: "Private First Class (PFC)",
    roleSummary:
      "I serve as a Private First Class in the Louisiana Army National Guard. The Guard reinforced discipline, accountability, and execution under pressure — the same mindset I bring to accounting and internal audit work.",
    values: [
      {
        label: "Discipline",
        description:
          "I follow standards and routines even when it's not convenient. I don't rely on motivation — I rely on systems.",
      },
      {
        label: "Accountability",
        description:
          "I take ownership of outcomes. If something is unclear or off, I document it, communicate it, and fix it.",
      },
      {
        label: "Execution under pressure",
        description:
          "When timelines are tight and stakes are high, I stay calm, prioritize correctly, and finish strong.",
      },
    ],
  },

  comeback: {
    headline: "Academic Comeback",
    summary:
      "I didn't start college perfectly. My strength is persistence: I rebuilt my habits and improved semester after semester. I turned a rough start into consistent performance by building structure, tracking results, and raising my standards.",
    milestones: [
      {
        year: "Early college",
        title: "Rough start, honest reset",
        detail:
          "I realized effort alone wasn't enough. I stopped winging it, got serious about time management, and built a weekly plan I could actually follow.",
      },
      {
        year: "Building consistency",
        title: "Systems over motivation",
        detail:
          "I started using structured routines: weekly planning, tighter study blocks, and checklists. Consistency became the difference-maker.",
      },
      {
        year: "Now",
        title: "Higher standards, better outcomes",
        detail:
          "I take on more responsibility while keeping my performance steady. My focus is internal audit, controls, and analytics — work that rewards structure and precision.",
      },
    ],
  },

  metrics: [
    { label: "Controls documented", value: 31, suffix: "" },
    { label: "Dashboards built", value: 3, suffix: "+" },
    { label: "Semesters improving", value: 5, suffix: "+" },
  ],

  leadership: {
    title: "VP of Accounting & Finance — AI Club",
    summary:
      "As VP of Accounting & Finance for the AI Club, I focus on building financial systems that scale — real-time budget visibility, clear categories, and lightweight controls so leadership always knows where funds stand.",
    bullets: [
      "Built a structured budget tracking approach for transparency",
      "Created a simple sponsorship tracking pipeline concept",
      "Focused on repeatable processes, not one-off fixes",
    ],
  },

  athletics: {
    title: "Training Mindset",
    summary:
      "Outside of class, I train like I study: structured, consistent, and measurable. I'm currently training for the Alcatraz swim, and I've also pushed long-distance running goals that taught me discipline and patience.",
    bullets: [
      "Alcatraz swim training: consistency, cold-water tolerance, and pacing",
      "Endurance mindset: systems beat motivation",
      "Progress tracking: weekly goals, feedback, and adjustment",
    ],
  },

  personal: {
    title: "A few things that describe me",
    bullets: [
      "I like work that's testable: if it can't be verified, it isn't finished",
      "I'm big on checklists, clean documentation, and reducing ambiguity",
      "I'm at my best when the standard is high and deadlines are real",
    ],
  },

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
  content: string;
  pinned?: boolean;
  cover?: {
    eyebrow?: string;
    accent?: "gold" | "purple";
  };
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
    slug: "shark-fest-alcatraz-cold-water-no-turning-back",
    title: "Shark Fest Alcatraz: cold water, no turning back",
    date: "2025-07-20",
    excerpt:
      "Cold water, current, the San Francisco skyline ahead and Alcatraz behind me. I said yes to the challenge — and finished it.",
    tags: ["Journey", "Resilience", "Challenge", "Discipline"],
    pinned: true,
    cover: { eyebrow: "Resilience", accent: "gold" },
    content: `
## Why I said yes

I never planned to swim across the San Francisco Bay.

My godfather asked if I wanted to do Shark Fest — the Alcatraz swim.

That was it.

And I don’t back down from a challenge.

This was the summer before I transferred to LSU — a season where I was saying yes to hard things and proving to myself I could finish them.

---

## The training

Training wasn’t dramatic.

It was repetition.

Cold exposure.  
Long swims.  
Consistency when no one was watching.

There’s nothing glamorous about building tolerance.

But that’s the point.

Discipline compounds quietly.

---

## The swim

Halfway through, I stopped for a moment and looked up.

In front of me:
The San Francisco skyline.

Behind me:
Alcatraz prison.

Below me:
Water known for sharks and strong currents.

It felt surreal.

Not loud.  
Not dramatic.

Just real.

The same stretch of water that made the prison nearly impossible to escape from — and I was crossing it by choice.

---

## What it reinforced

Cold water doesn’t negotiate.

Currents don’t care how you feel.

You either stay calm and keep moving — or you panic.

The lesson carried into everything else:

Exams.  
Guard weekends.  
Moving across the country.

You don’t wait until you feel ready.

You execute the plan.

---

## What it represents now

That swim wasn’t about proving toughness.

It was about following through.

Skyline ahead.  
Prison behind.  
Just keep moving.

---

## Key takeaway

Most limits are imagined.

Say yes to the challenge.

Then finish it.
`.trim(),
  },

  {
    slug: "moving-to-lsu-without-ever-visiting",
    title: "Moving to LSU without ever visiting Louisiana",
    date: "2026-02-26",
    excerpt:
      "I moved to Baton Rouge without ever stepping foot in Louisiana. No friends, no plan B, and a rough academic start behind me.",
    tags: ["Journey", "Growth", "Resilience", "LSU", "Personal"],
    cover: { eyebrow: "Built, Not Given", accent: "purple" },
    content: `
## Starting over

The first time I came to Louisiana was two weeks before the semester started.

I came to look at housing in person.

That was it.

I had never visited the state before.  
No friends waiting.  
No comfort zone.

Just a decision.

---

## The rough beginning

Before LSU, I tried community college online.

It didn’t work for me.

I thought I had dropped my classes before the deadline, but there was a miscommunication with my counselor.

My first college grades were:
- F
- D
- A

Not exactly the start you plan for.

I took the next semester off.

That was the reset.

---

## The rebuild

I returned to community college — this time in person.

That changed everything.

I earned a 3.7 GPA.

But more importantly, I built structure.

At that point, I was jealous of my friends already at four-year universities.

So I did something aggressive:

15 credits fall  
15 credits winter  
15 credits spring  
15 credits summer  

60 credit hours in one year.

No excuses. Just execution.

That’s how I earned my transfer to LSU.

---

## LSU performance

My first semester at LSU:
3.7 GPA — Dean’s List.

Most recent semester:
3.9 GPA — three A+ grades and one B-.

That arc means more to me than the numbers themselves.

It represents discipline earned, not given.

---

## What moving taught me

Moving to Baton Rouge forced growth.

No built-in circle.  
No reputation.  
No shortcuts.

It forced me to build confidence the same way I built grades:
through consistency.

---

## Key takeaway

Starting fresh isn’t scary.

Wasting the opportunity is.

I chose not to waste it.
`.trim(),
  },

  {
    slug: "from-rough-start-to-structured-comeback",
    title: "From a rough start to a structured comeback",
    date: "2026-02-25",
    excerpt:
      "I didn't start college perfectly. What changed everything was building a system that made improvement automatic, semester after semester.",
    tags: ["Journey", "Growth", "Systems", "Learning"],
    pinned: true,
    cover: { eyebrow: "Built, Not Given", accent: "gold" },
    content: `
## The reality

I didn't start college perfectly.

I used to think improvement was about trying harder. It wasn't.
The real problem was that I had **no structure**—just bursts of effort and a lot of guessing.

---

## The turning point

The shift happened when I stopped asking:

- *"Do I feel motivated today?"*

…and started asking:

- *"What does my system say I do today?"*

I built a weekly routine I could repeat:

- A weekly planning session (one page, clear priorities)
- Time-blocked study windows
- A simple tracker for deadlines and scores
- A standard for what "good work" looks like

---

## What changed semester after semester

Once the structure was in place, results followed.

Not because every day was perfect—because the system made it hard to drift.

If I missed one day, I didn't spiral.
I returned to the plan the next day.

That's what "comeback" actually is: **returning to the standard**.

---

## The standard I keep now

- Clarity over chaos
- Consistency over intensity
- Documentation over vibes

---

## Key takeaway

My comeback didn't come from motivation.

It came from building a system I could follow when motivation wasn't there.
`.trim(),
  },

  {
    slug: "balancing-national-guard-and-accounting-deadlines",
    title: "Balancing the National Guard and accounting deadlines",
    date: "2026-02-22",
    excerpt:
      "Drill weekends and exam weeks taught me the same lesson: execution isn't about having time — it's about using it with standards.",
    tags: ["National Guard", "Discipline", "Systems"],
    cover: { eyebrow: "Pressure-tested", accent: "purple" },
    content: `
## The constraint is real

Balancing LSU coursework with the Louisiana Army National Guard means your calendar isn't always yours.

Some weeks are normal.
Other weeks get compressed fast.

And when time compresses, one thing matters most:

> Standards.

---

## What the Guard reinforced

The Guard doesn't reward excuses.
It rewards preparation, clarity, and follow-through.

That mindset carries directly into accounting and internal audit:

- Know the objective
- Execute the process
- Document the result
- Improve the weak points

---

## My approach during high-pressure weeks

When things stack up, I don't "push harder."
I simplify and execute:

1. Identify the 2–3 outcomes that matter most
2. Schedule the hard work first (not last)
3. Use checklists so nothing slips
4. Finish the task to a standard — then move on

---

## Why this matters for internal audit

Audit work is pressure-tested by nature:
deadlines, documentation, and accountability.

The Guard sharpened the exact traits audit requires:
calm execution, clear standards, and clean evidence.

---

## Key takeaway

When time is limited, standards become your advantage.

Execution beats intention every time.
`.trim(),
  },

  {
    slug: "what-31-controls-taught-me-about-clarity",
    title: "What 31 internal controls taught me about clarity",
    date: "2026-02-18",
    excerpt:
      "Writing controls forced me to stop being vague. If someone else can't test it, it's not a control — it's an opinion.",
    tags: ["Internal Audit", "Controls", "COSO", "Projects"],
    cover: { eyebrow: "Controls mindset", accent: "gold" },
    content: `
## The problem with "kind of" controls

Early on, it's easy to write controls that sound good but can't be tested.

They read like:

- "Management ensures…"
- "Employees should…"
- "The company verifies…"

But none of that tells you **what actually happens**, **who does it**, or **what evidence exists**.

---

## What changed when I treated it like audit workpapers

When I documented 31 controls, my mindset shifted:

- A control must be **specific**
- A control must be **testable**
- A control must produce **evidence**

If it can't be verified, it isn't controlled.

---

## The structure that worked

For each control, I forced the same pattern:

1. **Risk** — what could go wrong?
2. **Control** — what prevents/detects it?
3. **Evidence** — what proves it happened?
4. **Frequency/owner** — who/when?
5. **Failure mode** — what does "not working" look like?

That structure removed ambiguity.

---

## The real lesson

Controls aren't just policies.

Controls are behaviors you can prove.

---

## Key takeaway

Clarity is a control's best feature.

If someone else can't test it, it needs to be rewritten.
`.trim(),
  },

  {
    slug: "reading-a-10-k-like-an-auditor-not-a-student",
    title: "Reading a 10-K like an auditor, not a student",
    date: "2026-02-12",
    excerpt:
      "I stopped reading 10-Ks straight through. Now I scan for what moves the numbers, where judgment lives, and where risk concentrates.",
    tags: ["Financial Reporting", "10-K", "Internal Audit", "Learning"],
    cover: { eyebrow: "Framework", accent: "purple" },
    content: `
## The biggest mistake I used to make

I used to read a 10-K like a textbook — straight through — and I'd get lost.

Now I treat it like a map.

I'm trying to answer three questions:

- What moves the numbers?
- Where does judgment live?
- Where does risk concentrate?

---

## My checklist

### 1) Start with what actually moves the statements

- Revenue streams
- Cost structure
- Major estimates
- Anything that swings margin or cash flow

### 2) Read policies like assumptions

Policies are management's translation layer:
business reality → accounting reality.

That's where the "why" shows up.

### 3) Look for judgment-heavy areas

- Estimates
- Impairment language
- Revenue timing
- Stock compensation
- Tax complexity (DTAs/DTLs, uncertain tax positions)

### 4) Tie notes back to line items

If a note matters, I should be able to point to:

- The line item it affects
- The direction of impact
- What would change the outcome

---

## Why this connects to internal audit

The skill is the same:

> Follow the logic.
> Document the evidence.
> Identify the risk concentration.

---

## Key takeaway

Don't memorize the 10-K.

Learn how to trace the story behind the numbers.
`.trim(),
  },

  {
    slug: "why-i-chose-internal-audit-over-finance",
    title: "Why I chose internal audit over finance",
    date: "2026-02-05",
    excerpt:
      "I dropped Finance because I wanted work built on verification, controls, and repeatable systems — not just stories and projections.",
    tags: ["Internal Audit", "Growth", "Direction"],
    cover: { eyebrow: "Decision", accent: "gold" },
    content: `
## The honest reason

I dropped Finance because I realized I'm most energized by work that is:

- Structured
- Evidence-based
- Built to scale
- Focused on improving how things actually operate

Internal audit fits that perfectly.

---

## What I like about internal audit

Internal audit rewards:

- Clear documentation
- Testable logic
- Accountability
- Process improvement

I like that the work is real.

You're not only analyzing outcomes — you're strengthening the system that produces them.

---

## What changed my direction

My best projects weren't the ones with the fanciest models.

They were the ones where I could:

- map risk clearly
- define controls precisely
- collect evidence
- make recommendations that reduce repeat issues

---

## Key takeaway

Choosing internal audit wasn't a step back.

It was choosing the lane where structure and discipline create the most value.
`.trim(),
  },

  {
    slug: "building-financial-systems-for-ai-club",
    title: "Building financial systems for AI Club as VP of Accounting & Finance",
    date: "2026-01-30",
    excerpt:
      "Student org finances get messy fast. My goal is simple: real-time visibility, clean categories, and lightweight controls that scale.",
    tags: ["Leadership", "Systems", "Projects"],
    cover: { eyebrow: "Leadership", accent: "purple" },
    content: `
## The problem student orgs run into

Most student org finances break down the same way:

- spending happens fast
- receipts go missing
- categories get fuzzy
- nobody knows the real budget until it's too late

That's not a people problem.
It's a systems problem.

---

## My goal as VP of Accounting & Finance

Build a finance setup that is:

- easy to track
- easy to explain
- easy to audit

---

## The system mindset

### Real-time visibility
Leadership shouldn't guess where funds stand.

### Clear categories
If categories are vague, reporting becomes useless.

### Lightweight controls
Not bureaucracy — just enough structure to prevent avoidable mistakes.

Examples:
- a standard receipt workflow
- quick approval thresholds
- consistent sponsor tracking

---

## Key takeaway

Good systems reduce stress.

Clarity makes organizations faster, not slower.
`.trim(),
  },

  {
    slug: "if-it-cant-be-tested-it-isnt-controlled",
    title: "If it can't be tested, it isn't controlled",
    date: "2026-01-12",
    excerpt:
      "This is the simplest internal audit idea I've learned at LSU: clarity matters because verification is the whole point.",
    tags: ["Internal Audit", "Controls", "Principles"],
    cover: { eyebrow: "Principle", accent: "purple" },
    content: `
## The principle

If you can't test it, you can't trust it.

A "control" that can't be verified is just a statement.

---

## Where people go wrong

A lot of controls fail in the writing stage:

- unclear owner
- unclear frequency
- no evidence trail
- no defined "pass/fail"

That's why documentation matters.
Not to be formal — to be verifiable.

---

## The question I now ask first

> What evidence would prove this happened?

If there's no clear answer, the control needs work.

---

## Key takeaway

Clarity protects decisions.

Evidence protects organizations.
`.trim(),
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
