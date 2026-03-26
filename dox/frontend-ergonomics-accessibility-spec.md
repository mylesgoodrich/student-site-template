# Frontend ergonomics & accessibility — implementation specification

**Document type:** Site audit → implementation spec  
**Scope:** `frontend/` (Next.js App Router, Tailwind CSS v4)  
**Focus:** Ergonomics (comfortable interaction, predictable layout), accessibility (WCAG-aligned patterns), and **pixel-consistent** UI polish  
**Version:** 1.0  
**Date:** 2026-03-18  

---

## 1. Executive summary

The portfolio frontend already demonstrates strong visual craft: LSU brand colors, glassy surfaces, motion-aware patterns (`motion-reduce`), and thoughtful modal behavior on the projects page (dialog semantics, ESC, focus to close button, scroll affordances). Gaps cluster into four themes:

1. **Inconsistent interaction contracts** — primary controls use mixed focus styles (`focus-visible` rings on some buttons, missing on global nav links and several footer links).
2. **Responsive / navigation ergonomics** — `SiteNav` is a horizontal link row without a mobile pattern (overflow, wrap, or menu); touch targets and spacing are not standardized.
3. **Reduced-motion coverage** — Framer Motion and CSS keyframe animations exist; not all animated surfaces respect `prefers-reduced-motion` globally.
4. **Semantic structure** — root layout omits a skip link; `<main>` has no `id`; some interactive regions could use clearer headings/landmarks.

This document specifies **what to implement**, **acceptance criteria**, and **where** in the codebase changes typically land—without prescribing one library over another for mobile nav.

---

## 2. Audit methodology (what was reviewed)

- **Global styles & tokens:** `frontend/app/globals.css` (`:root`, `@theme`, component classes `.lsu-*`, modal utilities).
- **Shell & navigation:** `frontend/app/layout.tsx`, `frontend/app/components/Header.tsx`, `frontend/app/components/SiteNav.tsx`.
- **High-traffic pages:** `frontend/app/page.tsx` (home), `frontend/app/projects/page.tsx` (filters, modal), patterns from `frontend/app/journey/page.tsx`, `frontend/app/blog/page.tsx` (sample aria usage).
- **Cross-cutting:** grep for `aria-`, `focus-visible`, `motion-reduce`, `prefers-reduced-motion`, dialog patterns.

---

## 3. Current strengths (preserve)

| Area | Evidence | Guidance |
|------|----------|----------|
| Brand + surfaces | CSS variables, `.lsu-card`, gradients | Keep tokens centralized; avoid one-off hex except documented exceptions. |
| Modal UX (projects) | `role="dialog"`, `aria-modal`, ESC handler, close focus | Extend same pattern to any future modal/drawer. |
| Motion safety (partial) | `motion-reduce:hover:translate-y-0` on several home hovers | Extend to all hover-lift cards and Framer sections. |
| Journey map | `role="img"`, `aria-label` on map SVG area | Good precedent for decorative SVGs. |

---

## 4. Gaps & risks

### 4.1 Accessibility

| ID | Issue | Severity | Notes |
|----|--------|----------|--------|
| A1 | No **skip link** to main content | Medium | Keyboard and SR users repeat header on every page. |
| A2 | **Header nav links** lack visible `focus-visible` ring | Medium | Gold/white links on gradient; focus must be unmistakable. |
| A3 | **Footer links** rely on underline only for focus | Low–Medium | Add consistent ring or outline-offset. |
| A4 | **Dialog backdrop** click-to-close can trap focus if not using a focus trap | Medium | Verify focus order and tab cycle inside modal (recommended: focus trap + `aria-labelledby` pointing at title). |
| A5 | **`lsu-highlight-link`** sets `outline: none` on `:focus-visible` | Medium | Ensure focus indicator is not only the underline; add ring or 2px outline meeting contrast. |
| A6 | **Color contrast** for `text-muted-2` / gold on dark | Verify | Run automated contrast check on header (expanded + compact). |

### 4.2 Ergonomics & layout

| ID | Issue | Severity | Notes |
|----|--------|----------|--------|
| E1 | **SiteNav** horizontal `gap-7` with no mobile strategy | High | Small viewports: overflow, wrapping, or hamburger required. |
| E2 | **Touch target size** — text links and small icon-only controls | Medium | Aim for **44×44px** minimum interactive target (padding counts). |
| E3 | **Sticky header** scroll thresholds — tuned but scroll-heavy pages can still stress dev server | Low | Product concern: document `COOLDOWN_MS` / thresholds; optional `prefers-reduced-motion` to disable transition. |

### 4.3 Pixel-perfect UI consistency

| ID | Issue | Severity | Notes |
|----|--------|----------|--------|
| P1 | **Border radius scale** — mix of `rounded-xl`, `rounded-2xl`, `rounded-3xl` without a named scale | Low | Define 2–3 radii: `sm`, `md`, `lg` mapped to Tailwind classes. |
| P2 | **Shadow usage** — `shadow-md` on cards + hover lift | Low | Standardize hover: `shadow-md` → `shadow-lg` with same blur/y. |
| P3 | **Spacing rhythm** — `space-y-12`, `py-14`, ad-hoc `gap-*` | Low | Align section vertical rhythm to a 4px or 8px grid. |

---

## 5. Design tokens & layout grid (specification)

### 5.1 Spacing scale (recommendation)

Use **8px base grid** for vertical section spacing and internal padding:

| Token | Value | Usage |
|-------|-------|--------|
| `space-section` | `3rem`–`4rem` (`space-y-12` / `space-y-16`) | Between major sections on a page |
| `space-block` | `1.5rem`–`2rem` | Between heading and body |
| `space-tight` | `0.75rem`–`1rem` | Between label and control |

**Acceptance:** No arbitrary `mt-[13px]`-style values unless documented (charts/SVG exceptions).

### 5.2 Border radius scale

| Tier | Class | Use |
|------|-------|-----|
| Control | `rounded-xl` | Buttons, inputs |
| Card | `rounded-2xl` or `rounded-3xl` | Pick one as default for `.lsu-card` and stick to it |
| Pill | `rounded-full` | Tags, chips |

**Acceptance:** Identity card, project cards, and CTAs share the same tier per component family.

### 5.3 Elevation

- Default card: `shadow-md`
- Hover: `shadow-lg` + `translate-y` (disabled when `motion-reduce`)

---

## 6. Typography

**Current:** Geist sans via `next/font`, mixed `text-xs` / `text-sm` / `text-base` / `text-lg`.

**Specification:**

- **Page title (h1):** one scale: `text-3xl sm:text-4xl`, `font-semibold`, `tracking-tight`
- **Section title (h2):** `text-xl sm:text-2xl`, consistent underline decoration where used
- **Body:** `text-sm` or `text-base` with `leading-6` or `leading-7` — **pick one** for marketing paragraphs site-wide
- **Uppercase labels:** `text-xs font-semibold uppercase tracking-wider` — max **one** tracking preset (`tracking-wider` vs `tracking-[0.24em]` — align header “Student Portfolio” with card labels)

**Acceptance:** Lighthouse / manual check: no heading level skips (h1 → h2 → h3) on each route.

---

## 7. Color & contrast

- **Text on background:** `foreground` on `background` — target **≥ 4.5:1** for body text (WCAG AA).
- **Gold (`brand-gold`) on purple header:** verify large text vs small text thresholds.
- **Links:** Not by color alone — keep underline or add non-color cue on focus/hover.

**Tooling:** Add `eslint-plugin-jsx-a11y` (if not present) and run `@axe-core/react` in dev optionally.

---

## 8. Focus & keyboard

### 8.1 Global rules

1. Every interactive element receives a visible **`:focus-visible`** style.
2. Do not remove outline unless replacing with **equal-or-better** visibility (`ring-2 ring-offset-2` is the site default on several buttons—**extend to links**).
3. **Skip link** (first focusable element in `body`):

   ```html
   <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] ...">
     Skip to main content
   </a>
   ```

   And: `<main id="main-content" tabIndex={-1}>` (optional programmatic focus on route change—advanced).

### 8.2 SiteNav

- Add `focus-visible:ring-*` + `rounded-md` + `px-2 py-1` to enlarge focus ring box.
- **Keyboard:** Home/End optional; left/right not required for horizontal nav.

### 8.3 Projects quick view

- Add **`aria-labelledby`** referencing the `<h2>` id (in addition to `aria-label`).
- Consider **focus trap** (e.g. Radix Dialog or headlessui) — **acceptance:** Tab stays inside dialog while open; Shift+Tab works.

---

## 9. Touch & pointer targets

| Control | Minimum | Implementation |
|---------|---------|----------------|
| Nav links | 44×44px | Increase hit area with padding (`py-2 px-2`) |
| Icon buttons | 44×44px | Wrapper `min-h-[44px] min-w-[44px]` |
| Footer text links | 44×44px | Increase line-height + padding |

---

## 10. Motion & `prefers-reduced-motion`

**Rules:**

1. **CSS:** Wrap non-essential animations:

   ```css
   @media (prefers-reduced-motion: reduce) {
     .lsu-card { transition: none; }
     .animate-* { animation: none !important; }
   }
   ```

2. **Framer Motion:** `useReducedMotion()` already used in places — apply to large section entrances site-wide OR disable `initial/animate` when reduced motion.

3. **Header:** optional — shorten `transition-all` to `transition-[background,box-shadow,border-color]` to reduce jank.

**Acceptance:** With OS “Reduce motion” on, no infinite decorative motion remains (waves/pings).

---

## 11. Semantic HTML & landmarks

| Element | Requirement |
|---------|-------------|
| `html` | `lang="en"` ✓ (keep) |
| Header | Implicit `<header>` via `Header` component ✓ |
| Main | Single `<main>` ✓ — add `id="main-content"` |
| Nav | Wrap `SiteNav` in `<nav aria-label="Primary">` |
| Footer | Implicit `<footer>` ✓ |

---

## 12. Component-specific implementation notes

### 12.1 `Header.tsx`

- Ensure compact mode does not reduce **touch targets** below minimum (brand link row).
- Consider `aria-expanded` if mobile menu added later.

### 12.2 `SiteNav.tsx`

- **P0:** Responsive behavior (wrap + smaller gap, or drawer).
- **P1:** `aria-current="page"` on active link (stronger than styling alone).

### 12.3 `projects/page.tsx` (quick view)

- **P1:** `aria-labelledby` + title `id`
- **P1:** Focus trap / restore focus to triggering card on close
- **P2:** Announce open/close via `aria-live="polite"` (optional)

### 12.4 Journey / home motion sections

- Align all `hover:-translate-y` cards with `motion-reduce` (pattern exists on home — extend to any remaining cards).

### 12.5 Images (`next/image`)

- Meaningful `alt` text (name + context) ✓ pattern in place — avoid empty alts for headshot.
- **LCP:** `priority` only for above-the-fold hero image(s).

---

## 13. Phased roadmap

### Phase 0 — Quick wins (1–2 sessions)

- [x] Skip link + `main` id  
- [x] `focus-visible` rings on `SiteNav` and footer links  
- [x] `aria-current` on active nav link  
- [x] Fix `lsu-highlight-link` focus visibility (no outline removal without replacement)  

### Phase 1 — Navigation ergonomics (2–4 sessions)

- [x] Mobile nav pattern (hamburger + dialog **or** wrap + scroll with visible overflow affordance)  
- [x] Standardize min touch targets for nav/footer  

### Phase 2 — Modal hardening

- [x] Focus trap + focus restore (projects quick view)  
- [x] `aria-labelledby` wiring  

### Phase 3 — Pixel-perfect pass

- [ ] Radius + shadow audit across `.lsu-card` and buttons  
- [ ] Section spacing audit (`space-y-*` alignment)  
- [ ] Typography scale consolidation  

### Phase 4 — Tooling

- [x] `eslint-plugin-jsx-a11y` (direct dependency + full recommended rules merged in `eslint.config.mjs`; plugin also ships with `eslint-config-next`)  
- [ ] Optional axe DevTools CI step on PRs  

---

## 14. Acceptance test checklist (manual)

- [ ] Tab through header → main → footer: every focusable element shows visible focus  
- [ ] Skip link appears on focus and jumps to main  
- [ ] Screen reader: landmarks announced (header, nav, main, footer)  
- [ ] Projects quick view: ESC closes; focus returns sensibly  
- [ ] 200% browser zoom: no overlapping text in hero + identity card  
- [ ] iPhone SE width: nav usable without horizontal page scroll (after Phase 1)  
- [ ] Reduced motion: no distracting infinite animations  

**Implementation note (2026-03-24):** Phases 0–2 and 4 items above are implemented in code; re-run this checklist after substantive UI changes.

---

## 15. File map (typical owners)

| Concern | Primary files |
|---------|----------------|
| Tokens, globals | `frontend/app/globals.css` |
| Landmarks, skip link | `frontend/app/layout.tsx` |
| Header / nav a11y | `frontend/app/components/Header.tsx`, `SiteNav.tsx` |
| Projects modal | `frontend/app/projects/page.tsx` |
| Home motion | `frontend/app/page.tsx` |
| Journey | `frontend/app/journey/page.tsx`, `components/JourneyMapPremium.tsx` |

---

## 16. Out of scope (for this spec)

- Backend API accessibility  
- PDF or document content inside blog posts (author responsibility)  
- Third-party embeds unless added later  

---

## Document control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial audit → implementation specification |
