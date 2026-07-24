# SKILL.md — Aibrium Studio Website
> Read this file completely before writing a single line of code.
> Build everything exactly as described. No deviations.
> Companion reference: `Aibrium_Website_Specification.pdf` — the client's design & copy brief. This file (SKILL.md) is the single source of truth for *how to build*; the PDF is the *why*. Where they overlap, this file wins.

---

## Working rules for Claude Code — READ FIRST, apply to every task

1. **Never touch git.** Do not run `git init`, `add`, `commit`, `push`, `branch`, `checkout`, or any git command, and do not stage or revert anything. The human owns all version control. (You may keep the `.gitignore` that `create-next-app` generates — just don't run git.)
2. **Build in phases — one phase per session.** Follow `BUILD_PLAN.md`. Do only the phase you were asked to do. Don't jump ahead or refactor earlier phases unless asked.
3. **Log every task in `CHANGELOG_work.md`** (repo root). At the **end of each task**, append an entry: what you built + files changed + status `⏳ built, untested`. Use the format already in that file.
4. **Mark verified only after it's tested.** Once the work has been run (`npm run dev`) and confirmed working, change that entry's status to `✅ verified`. Until then it stays `⏳ built, untested`.
5. **Placeholders are intentional.** The Calendly URL and all portfolio images are placeholders on purpose. Do not block on them and do not invent real ones — the site must render fully with placeholders.
6. **No deviation** from the palette, fonts, copy, or the "What NOT to do" list below.

---

## What you are building

A **single-page marketing site + one legal page** (`/privacy`) for **Aibrium Studio** — a creative studio that casts exclusive digital models for fashion & lifestyle brands and delivers campaign-quality on-model product visuals weekly.

**Primary job of the site:** validate a cold-email prospect in ~10 seconds and route them to a Calendly call or a sample request. It is **not** a lead-gen brochure — it is *validation + routing*. Three outcomes, in order: (1) instant credibility, (2) show the work, (3) route to Calendly / sample.

**Visitor context:** ~60% arrive on a phone from a cold email, deciding in seconds if we're real and premium. **Mobile-first is not optional.**

### Design intent (agreed direction)

- **Base tone:** *editorial calm* — quiet, premium, "a studio, not a startup." Large whitespace, large imagery, the design stays out of the way so the visuals do the selling.
- **Structure/composition** is borrowed from a premium reference layout: a **split hero with floating info-cards over the hero image**, a **horizontal facts strip**, a **big-number stat row**, a **card row with one highlighted card** (pricing), and an **image-forward showcase**. We take the *composition*, not the loudness.
- **One dramatic dark moment:** the **hero is dark (Ink `#1A1A1A`)** with a warm gold bloom behind the hero image. **Everything below the hero returns to the light editorial palette** (cream/white alternating), and the **footer is ink** again. This is the only dark section besides the footer.
- **Restraint rule:** spend all the boldness on the dark hero + the portfolio imagery. Keep everything else disciplined and quiet. No gimmicks.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion (subtle only) |
| Icons | Lucide React |
| Fonts | `Cormorant Garamond` 500/600 (display) + `Inter` 400/500 (body) via `next/font/google` |
| Scheduling | Calendly (popup + inline embed), loaded via deferred official widget script |
| Analytics | Plausible (cookieless — no cookie banner needed) |
| Theme | Light editorial — cream/white/gold/ink. **No dark mode toggle.** Hero + footer are ink; the rest is light. |

**No shadcn/ui.** It fights a custom editorial design and pulls in default styling. Build the few UI primitives by hand (they are small).

---

## Setup — build into `/web`

Adapted from the project's own install script (npm, framer-motion; shadcn removed; fonts via `next/font`).

```bash
# from repo root
npx create-next-app@14 web \
  --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"

cd web

# animations, icons, class utils
npm install framer-motion lucide-react clsx tailwind-merge

# (optional but recommended) formatting
npm install -D prettier prettier-plugin-tailwindcss
```

`vercel.json` (repo root of the app, i.e. inside `/web`) for deployment:
```json
{ "framework": "nextjs" }
```

`src/lib/utils.ts` — the `cn()` helper:
```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

> **Fonts:** do **not** use Google `<link>` tags. Load `Cormorant_Garamond` and `Inter` through `next/font/google` in `layout.tsx` with `display: 'swap'`. See "Global layout".

---

## Design system

Apply everywhere. No colors outside this palette. No gradients except the two noted (hero bloom, hero radial).

### Palette (exact hex — from the brief)

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#1A1A1A` | Headlines, body text on light, **hero background**, footer background |
| `cream` | `#F7F3EC` | Page background, alternating section background |
| `gold` | `#8A6D3B` | Accents, small-caps labels, buttons, hover states, hairlines |
| `gold-hover` | `#6F5730` | Gold on hover (darkened) |
| `white` | `#FFFFFF` | Cards, alternating section background |
| `grey` | `#666666` | Secondary text, captions |

Supporting (derive, do not invent new hues):
- `hairline` (on light): `rgba(26,26,26,0.10)`
- `hairline-gold`: `#8A6D3B` at 1px for featured pricing border
- On the **ink hero**, text is `cream` / `white`; secondary text is `#B9B2A6` (cream at reduced emphasis).

### CSS variables — add to `globals.css`

```css
:root {
  --color-ink: #1A1A1A;
  --color-cream: #F7F3EC;
  --color-gold: #8A6D3B;
  --color-gold-hover: #6F5730;
  --color-white: #FFFFFF;
  --color-grey: #666666;
  --hairline: rgba(26, 26, 26, 0.10);
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-feature-settings: 'liga' 1, 'calt' 1;
  -webkit-font-smoothing: antialiased;
}

/* Respect reduced motion globally */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Tailwind config extension — `tailwind.config.ts`

```ts
theme: {
  extend: {
    colors: {
      ink: '#1A1A1A',
      cream: '#F7F3EC',
      gold: '#8A6D3B',
      'gold-hover': '#6F5730',
      grey: '#666666',
    },
    fontFamily: {
      display: ['var(--font-cormorant)', 'Playfair Display', 'serif'],
      body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },
    maxWidth: {
      content: '1200px',
    },
    boxShadow: {
      card: '0 12px 40px -16px rgba(26,26,26,0.12)',
      float: '0 24px 60px -24px rgba(26,26,26,0.45)', // floating cards over dark hero
    },
    borderRadius: {
      btn: '4px',
    },
  },
}
```

### Typography scale

**Three-role type system** *(updated 2026-07-24 — brand identity alignment)*. Each role maps to a Tailwind token; never scatter raw font names across components.

- **Display face (`font-display`):** **EB Garamond**, weight 500–600. Use for H1, H2, card titles, wordmark. Generous, calm. *(Replaced Cormorant Garamond — same weights, same type scale; a face swap, not a redesign. EB Garamond runs slightly wider, so the hero H1 carries `letter-spacing: -0.01em`.)*
- **Label face (`font-label`):** **Montserrat**, weights 500 & 600 **only**. Geometric sans, used **exclusively** for small uppercase letter-spaced micro-copy: `SectionLabel`, button labels, nav items (header + footer), the lightbox counter, the pricing "Most Popular" tag, and the hero floating-card micro-labels. **Never** in body text.
- **Body face (`font-body`):** **Inter**, weight 400 (500 for emphasis). 17–18px body, line-height 1.6. All paragraphs, descriptions, captions.

All three load via `next/font/google` in `layout.tsx` (`display: 'swap'`, latin subset), exposed as CSS variables `--font-eb-garamond` / `--font-montserrat` / `--font-inter`.

| Element | Face / weight | Size | Notes |
|---|---|---|---|
| Hero H1 | EB Garamond 600 (`font-display`) | `clamp(44px, 6vw, 84px)` | line-height 1.05, `letter-spacing: -0.01em`, the only `<h1>` on the page |
| Section H2 | EB Garamond 600 (`font-display`) | `clamp(30px, 4vw, 52px)` | line-height 1.1 |
| Gold small-caps label | Montserrat 500 (`font-label`) | 12–13px | `text-transform: uppercase`, `letter-spacing: 0.22em`, color gold. Sits above every section H2. |
| Card / step title | EB Garamond 600 (`font-display`) | 22–26px | |
| Body | Inter 400 (`font-body`) | 17–18px | line-height 1.6, max ~68ch |
| Caption / meta | Inter 400 (`font-body`) | 14px | color grey |
| Button label | Montserrat 500 (`font-label`) | 13–14px | uppercase, `letter-spacing: 0.08em` |
| Nav item | Montserrat 500 (`font-label`) | 14–16px | header + footer navigation |

> The **gold small-caps label** (letter-spaced, e.g. `T H E  P R O C E S S`) is the signature detail from the brand documents — it appears above **every** section title, now set in the Montserrat label face. Implement letter-spacing by CSS tracking, not by typing spaces between letters.

### Buttons — two variants only (`Button.tsx`)

```
Primary:
  bg: #8A6D3B (gold)  |  text: #1A1A1A (ink)  |  radius: 4px
  label: uppercase, Inter 500, letter-spacing 0.08em
  hover: bg → #6F5730
  padding: 14px 26px

Secondary (outline):
  bg: transparent  |  border: 1.5px solid  |  radius: 4px
  On LIGHT sections: border + text = ink (#1A1A1A); hover: bg → ink, text → cream
  On the DARK hero:  border + text = cream (#F7F3EC); hover: bg → cream, text → ink
```

Props: `variant: 'primary' | 'secondary'`, `onDark?: boolean`, `size?: 'md' | 'lg'`, `href?`, `onClick?`, `children`.

### Cards

```
bg: #FFFFFF (on cream sections) or #F7F3EC (on white sections)
border: 1px solid var(--hairline)
border-radius: 6px
shadow: shadow-card
hover (portfolio + interactive cards only): image zoom 1.03 + hairline → gold
transition: 0.4s ease
```

### Texture & motion rules

- Section labels: gold small-caps, letter-spaced, above each H2. Optionally a short **24px gold hairline** to the left of / above the label.
- **Hero (ink) background:** a very subtle `radial-gradient` from `#242018` (warm) near the image toward `#1A1A1A`, plus a soft **gold bloom** (blurred radial `rgba(138,109,59,0.28)`) behind the hero image. This is the *only* place warm glow appears — it's the reskin of the reference's orange glow into gold.
- **Alternating section backgrounds:** cream → white → cream … (hero ink and footer ink are the exceptions). Keep the rhythm; it replaces borders as the section separator.
- Image hover: gentle zoom to `scale(1.03)` over 0.4s on portfolio covers.
- **No** parallax, **no** auto-playing sliders, **no** animated counters, **no** decorative motion. Motion is limited to: soft fade/translate-up on scroll enter, hero on-load stagger, image hover zoom, header solidify on scroll, accordion + lightbox transitions.
- Icons (Lucide): gold for primary, grey for decorative. Thin stroke (`strokeWidth={1.5}`).

---

## File structure

```
/web
  /public
    /work
      /solene        01.webp … 08.webp   (portfolio — placeholders now)
      /kaia-swim
      /mova-active
      /vela-skin
    hero.webp        (single best portfolio visual — placeholder now)
    favicon.ico      (gold "A." on ink — see SEO)
    og.jpg           (= hero visual)
  /src
    /app
      layout.tsx            ← fonts, <Header/>, <Footer/>, Calendly script, analytics, SEO base
      page.tsx              ← Home: assembles all section components in order
      globals.css
      /privacy
        page.tsx
    /components
      /layout
        Header.tsx          ← sticky slim; transparent over hero → solid cream on scroll
        Footer.tsx          ← ink bg, cream text, 3 columns
      /sections
        Hero.tsx            ← Block 2 (DARK)
        ProblemFix.tsx      ← Block 3
        Work.tsx            ← Block 4 (+ lightbox)
        ExclusiveModels.tsx ← Block 5
        Process.tsx         ← Block 6
        Pricing.tsx         ← Block 7
        Faq.tsx             ← Block 8
        FinalCta.tsx        ← Block 9 (inline Calendly)
      /ui
        Button.tsx
        SectionLabel.tsx    ← gold small-caps label (+ optional hairline)
        Card.tsx
        Lightbox.tsx        ← portfolio gallery modal
        CalendlyButton.tsx  ← opens Calendly popup
        CalendlyInline.tsx  ← inline widget for Block 9
    /lib
      utils.ts              ← cn()
      calendly.ts           ← CALENDLY_URL + popup helper (single place to set the URL)
      catalogues.ts         ← portfolio data (names, categories, image lists)
      motion.ts             ← shared Framer Motion variants
```

---

## Global layout — `layout.tsx`

1. **Fonts** via `next/font/google`:
```tsx
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['500', '600'], variable: '--font-cormorant', display: 'swap',
})
const inter = Inter({
  subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap',
})
// apply `${cormorant.variable} ${inter.variable}` on <html>, `font-body` on <body>
```
2. `<Header />` at top (fixed/sticky), `{children}`, `<Footer />` at bottom.
3. **Calendly widget script** — deferred, so it never blocks render:
```tsx
import Script from 'next/script'
// in layout, near end of body:
<Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
<link rel="preconnect" href="https://assets.calendly.com" />
// Calendly CSS (only if using their default popup styling):
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
```
4. **Plausible analytics** — deferred:
```tsx
<Script defer data-domain="aibrium.com"
  src="https://plausible.io/js/script.tagged-events.js" strategy="lazyOnload" />
```
5. **SEO base** (see SEO section) via the App Router `metadata` export.

---

## Home page — build block by block, top to bottom

All copy in the blocks below is **final — paste as written**. Text in `[brackets]` is an instruction, not copy.

### BLOCK 1 — Header (sticky, slim) — `Header.tsx`

- Left: **`Aibrium. Studio`** wordmark in Cormorant (the period after *Aibrium* is part of the mark). Links to top.
- Right nav: `Work · Process · Pricing · FAQ` (anchor links to `#work`, `#process`, `#pricing`, `#faq`) + primary button **`BOOK A CALL`** (opens Calendly popup).
- **Over the dark hero:** transparent background, text = cream.
- **On scroll (past ~40px):** background → solid cream `#F7F3EC` + subtle shadow (`0 1px 0 var(--hairline)` or a soft shadow) + text → ink. Transition 0.3s.
- Mobile: wordmark left, hamburger right → slide-in / full-width menu with the four anchors + `BOOK A CALL`.

### BLOCK 2 — Hero (DARK) — `Hero.tsx`

**The one dramatic moment. Ink background, split layout, floating cards over the image.**

- Background: ink `#1A1A1A` with the warm radial + gold bloom behind the image (see texture rules). Min height ~`88vh` desktop; comfortable auto height on mobile.
- **Left column (text):**
  - Gold small-caps label: `C R E A T I V E  S T U D I O · F A S H I O N  &  L I F E S T Y L E` (color gold, on ink).
  - `[H1]` **Your brand's own models. New visuals every week.** (Cormorant 600, cream, the page's single `<h1>`)
  - `[Sub]` Aibrium Studio casts exclusive digital models for fashion and lifestyle brands — then delivers campaign-quality on-model visuals of your products, week after week. No photoshoots, no studios, no waiting. (Inter, `#B9B2A6`)
  - Buttons: Primary **`BOOK A 15-MIN CALL`** (Calendly popup) + Secondary `onDark` **`SEE THE WORK`** (anchors to `#work`).
- **Right column (visual):** one full-bleed hero image (`/public/hero.webp` — best portfolio visual). Soft gold bloom behind it. Gentle rounded corners.
- **Floating cards over the image** (this is the reference's composition, translated — **state true facts only, no fake counters**). Two small cards, light (cream/white) with `shadow-float`:
  - Card A — gold micro-label `DELIVERY` + `Finished visuals every Friday`.
  - Card B — gold micro-label `YOUR MODEL` + `Exclusive to your brand — never reused` + a small initial/avatar dot.
- **Mobile / tablet (below `lg`):** *(approved deviation — 2026-07-23)* the entire hero **visual block is hidden** (image + both floating cards) below `lg`; the two-column split happens at `lg`, not `md`. The two facts from the floating cards must **not** disappear — render them as a compact block **under the CTA buttons**, using existing tokens (gold small-caps `SectionLabel` label + body-text value): `DELIVERY → Finished visuals every Friday` and `YOUR MODEL → Exclusive to your brand — never reused`. The hidden visual must not cause mobile to download the hero image (no `priority`; `display:none` + lazy). The visual block is placed **after** the text in source order, so when a real image later replaces the placeholder it can be brought back on mobile **below** the text by changing `hidden lg:block` → `block` — no markup rewrite. Desktop (`lg+`) is unchanged: text left, visual right, floating cards over the image.
- **On-load animation:** H1 + sub + buttons stagger fade-up (0.08s stagger). Restrained. Nothing else on the hero animates on load.

### BLOCK 3 — The Problem → The Fix — `ProblemFix.tsx`

Cream section. (This is the reference's "facts strip," rendered as three editorial cards.)

- Gold label: `W H Y  W E  E X I S T`
- `[H2]` **Great visuals shouldn't require a production.**
- `[Body]` Booking models, hiring photographers, renting studios, waiting weeks for edits — for 10 usable images. Meanwhile your ads and feed need fresh creative every single week. That gap is exactly what Aibrium closes.
- **Three fact cards in a row** (1 column on mobile):
  1. `Weekly delivery, every Friday`
  2. `Models exclusive to your brand`
  3. `Every visual in 3 ad-ready formats`

### BLOCK 4 — The Work (portfolio gallery) — `Work.tsx` `[id="work"]`

White section. **Image-forward — this is where the work sells.**

- Gold label: `T H E  W O R K`
- `[H2]` **Judge us by the images.**
- **Grid of 4 catalogue cards** (2×2 desktop, 1 col mobile). Data from `src/lib/catalogues.ts`:
  - **SOLÈNE** — *Elegant fashion*
  - **KAIA SWIM** — *Swimwear*
  - **MOVA ACTIVE** — *Activewear*
  - **VELA SKIN** — *Beauty*
  - Each card: cover visual + name (Cormorant) + category (grey caption). Hover: cover zoom 1.03, hairline → gold.
  - **Click → Lightbox** (`Lightbox.tsx`) opening a gallery of 6–10 visuals from that catalogue.
- **Lazy-load** everything below the first row (`loading="lazy"` / `next/image` default lazy).
- `[Caption under grid]` Sample collections produced by Aibrium Studio. Client work is shown only with written permission.
- `[Commented-out placeholder]` Leave a clearly-commented empty section **between Block 4 and Block 5** ready for: client logos strip, named testimonials, case-study block. These slot in when first clients convert. **Do not** fabricate logos/testimonials now — empty proof stays empty.

### BLOCK 5 — The Differentiator: exclusive models — `ExclusiveModels.tsx`

Cream section. **Use the reference's image-forward showcase layout:** a visual (a "casting board" — a tidy set of candidate thumbnails) on one side, text on the other.

- Gold label: `Y O U R  M O D E L S`
- `[H2]` **Cast once. Yours forever.**
- `[Body]` Every brand we work with gets its own models — cast for your aesthetic, chosen by you, and locked to your brand. We present 3–5 candidates; you pick. From that moment, your model appears only in your visuals — never in anyone else's. Your audience gets to know your faces the way they'd know brand ambassadors.
- **Three-step row:**
  1. **We cast** — candidates styled to your brief
  2. **You choose** — your model, your call
  3. **We lock** — same face, every image, exclusively yours

### BLOCK 6 — How It Works — `Process.tsx` `[id="process"]`

White section. **Four numbered cards** — numbering is justified here because this is a real time sequence.

- Gold label: `T H E  P R O C E S S`
- `[H2]` **From signing to your first delivery in two weeks.**
- Cards `01`–`04` (number in gold, Cormorant; title; body):
  - **01 · Casting & Style Lock** — week one: brand session, model casting, and a signed-off style guide that locks the look.
  - **02 · Submit Mondays** — drop product photos into your shared folder. That's your entire workload.
  - **03 · Delivered Fridays** — finished visuals in your folder, every week, in all three ad formats.
  - **04 · Refine** — two revision rounds per batch, returned within 48 hours.

### BLOCK 7 — Pricing — `Pricing.tsx` `[id="pricing"]`

Cream section. **This is the reference's "one highlighted card" pattern:** the featured pilot leads, and the ENGINE tier is marked MOST POPULAR.

- Gold label: `P R I C I N G`
- `[H2]` **Start with a pilot. Scale when it works.**
- **Featured card (gold border, first, full-width or prominent):**
  - **THE PILOT — $900** · Two weeks · We cast your first exclusive model and deliver 12–15 finished visuals of one product line. Continue after, and the full $900 is credited to your first month — the pilot ends up free.
  - Button: **`START WITH THE PILOT`** → Calendly popup.
- **Three tier cards** (ENGINE highlighted — subtle gold border + `MOST POPULAR` gold tag; slightly raised):
  - **CORE — $3,900/mo** · 40 visuals monthly · 1 exclusive model · 1 brand · weekly delivery · 2 revision rounds
  - **ENGINE — $5,900/mo** · 70 visuals monthly · up to 3 exclusive models · monthly strategy call · `[MOST POPULAR]`
  - **FULL STUDIO — $8,900/mo** · 120 visuals monthly · up to 5 exclusive models · up to 2 brands · priority delivery
- `[Line under cards]` Quarterly prepay −8% · 3-month minimum · every visual delivered in 1:1, 4:5, and 9:16.

### BLOCK 8 — FAQ — `Faq.tsx` `[id="faq"]`

White section. Accordion, **all closed by default**, one open at a time is fine. `AnimatePresence` + height transition.

- Gold label: `F A Q`
- Items (Q in Cormorant, A in Inter):
  1. **Are these real photographs?** — They're AI-powered productions run by human art direction and quality control — that's how we deliver weekly at this price. To your customers, they read as campaign photography. Judge for yourself in the work above, or ask us for a free sample with your own product.
  2. **Will my model ever appear for another brand?** — Never. Every model is cast for one client and contractually exclusive. When an engagement ends, the model is retired — not recycled.
  3. **What if I don't love the candidates?** — We re-run the casting. You approve your model before any production starts — we'd rather cast twice than lock a face you're not in love with.
  4. **How accurate are the products?** — Product accuracy is a quality-control step on every image — logos, colors, materials, and for apparel, the true cut and fit. You approve every visual before it goes anywhere.
  5. **Can we keep our photographer?** — Please do. Shoots are great for hero campaigns; we're the weekly volume in between that no shoot schedule can sustain.
  6. **What do we need to provide?** — Clear product photos each Monday, brand references at onboarding, and your feedback. That's the entire workload on your side.
  7. **Do you produce video?** — Not yet — current technology doesn't meet our quality bar, and we don't ship anything below it. The moment it does, our clients will be first to know.

> **Note:** the honest "AI-powered" answer lives **only here**, in Q1. The word "AI" must **not** appear in the hero, headlines, or navigation. The site sells outcomes.

### BLOCK 9 — Final CTA + Calendly (inline) — `FinalCta.tsx`

A calm closing section (cream, or a soft gold-tinted band — keep it quiet).

- Gold label: `N E X T  S T E P`
- `[H2]` **Fifteen minutes. Bring a product.**
- `[Body]` Book a call and we'll show you exactly what your products look like on your own model — or email us a product link and we'll send you free samples first. Either way, you judge real work, not promises.
- **Calendly INLINE embed** here — full widget (`CalendlyInline.tsx`).
- `[Line under widget]` Prefer email? **hello@aibrium.com** — we reply within 24 hours, Monday to Friday. `[mailto link]`

### BLOCK 10 — Footer — `Footer.tsx`

Ink background, cream text.
- **Column 1:** `Aibrium. Studio` (wordmark) — "Creative studio for fashion & lifestyle brands."
- **Column 2 — General:** hello@aibrium.com `[mailto]` · **Production:** office@aibriumstudio.com `[mailto]`
- **Column 3:** Work · Process · Pricing · FAQ · Book a call (anchors + Calendly)
- **Bottom line:** `© 2026 «Mining capital LLC» SRL, t/a Aibrium Studio · Chișinău, Republic of Moldova · Privacy Policy` (Privacy links to `/privacy`).

---

## `/privacy` page — `app/privacy/page.tsx`

Same styling, plain and quiet. A single `<article>` on cream, max-width ~760px, generous line-height. Standard privacy policy covering: what we collect (cookieless analytics events + emails you send us), how we use it, third parties (Calendly, Plausible), your rights, contact (hello@aibrium.com). Header/Footer shared. Add `Last updated: 2026`. Linked from the footer only. Realistic placeholder legal text — **not** Lorem Ipsum.

---

## Shared components

### SectionLabel (`SectionLabel.tsx`)
Gold small-caps, `letter-spacing: 0.22em`, uppercase, 12–13px, optional 24px gold hairline. `<SectionLabel>The Process</SectionLabel>` renders `T H E  P R O C E S S` via CSS tracking (do not type spaces).

### Card (`Card.tsx`)
Base card per the design system. Prop `interactive?` enables hover (zoom/hairline→gold) for portfolio & pricing.

### Lightbox (`Lightbox.tsx`)
- Opens from a Work card. Full-screen overlay, ink/90 backdrop, centered image, prev/next arrows, close (Esc + click-outside + X), keyboard nav, focus trap. Fade in/out only.
- Fire analytics `plausible('Lightbox Open', { props: { catalogue }})` on open.

### CalendlyButton (`CalendlyButton.tsx`) & CalendlyInline (`CalendlyInline.tsx`)
See next section.

---

## Calendly integration

**Set the URL in exactly one place** — `src/lib/calendly.ts`. *(Updated 2026-07-24: the real URL now lives as a **literal** in this file so the site works with zero configuration on any host. `NEXT_PUBLIC_CALENDLY_URL` is an **optional override** — read if present, otherwise the literal is used. A missing env var must never break the build or produce an undefined URL. Do not reintroduce a placeholder or a required env var.)*
```ts
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/hello-aibrium'

// popup helper (script is loaded in layout.tsx via next/script)
export function openCalendlyPopup() {
  // @ts-expect-error Calendly is injected by the external widget script
  if (typeof window !== 'undefined' && window.Calendly) {
    // @ts-expect-error
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    if (typeof window.plausible === 'function') window.plausible('Calendly Popup')
  }
  return false
}
```
- **Popup:** every `BOOK A CALL`, `BOOK A 15-MIN CALL`, and `START WITH THE PILOT` button calls `openCalendlyPopup()`.
- **Inline (Block 9):** render `<div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 680 }} />`. The widget script auto-initializes inline widgets.
- The real URL is committed as the literal default in `src/lib/calendly.ts` — no `.env.local` needed for the site to work. To point at a different Calendly (e.g. staging), optionally set `NEXT_PUBLIC_CALENDLY_URL` in the environment (or Vercel env vars) to override. Never blocks render — script is `lazyOnload`.
- **No contact form anywhere.** Calendly + mailto only.

---

## Portfolio data & images — `src/lib/catalogues.ts`

```ts
export type Catalogue = {
  slug: string
  name: string
  category: string
  cover: string          // /work/<slug>/01.webp
  images: string[]       // 6–10 items
}

export const catalogues: Catalogue[] = [
  { slug: 'solene', name: 'SOLÈNE', category: 'Elegant fashion',
    cover: '/work/solene/01.webp',
    images: Array.from({ length: 8 }, (_, i) => `/work/solene/0${i + 1}.webp`) },
  { slug: 'kaia-swim', name: 'KAIA SWIM', category: 'Swimwear',
    cover: '/work/kaia-swim/01.webp', images: [/* … */] },
  { slug: 'mova-active', name: 'MOVA ACTIVE', category: 'Activewear',
    cover: '/work/mova-active/01.webp', images: [/* … */] },
  { slug: 'vela-skin', name: 'VELA SKIN', category: 'Beauty',
    cover: '/work/vela-skin/01.webp', images: [/* … */] },
]
```
- **Placeholders until real assets arrive (must render with zero image files):** for now, set every `cover` / `images` entry **and** the hero to `placehold.co` URLs so the site renders immediately, e.g. `https://placehold.co/1000x1250/1A1A1A/F7F3EC?text=SOL%C3%88NE+01` (dark) or `https://placehold.co/1400x1000/F7F3EC/8A6D3B?text=Aibrium+Hero` (light). Use the palette hex in the URL so placeholders already look on-brand.
- To let `next/image` load those, add to `next.config.mjs`:
  ```js
  images: { remotePatterns: [{ protocol: 'https', hostname: 'placehold.co' }] }
  ```
- **Swap to real assets later with no code change beyond the paths:** the client will provide the hero visual + 6–10 real visuals per catalogue. Drop files into `/public/work/<slug>/` (`01.webp` … `08.webp`) and `/public/hero.webp`, then point `catalogues.ts` / the hero at the local paths and remove the `placehold.co` remotePattern.
- **Never use stock photography.** One stock image destroys the premise. Portfolio/placeholder only.

---

## Animations — `src/lib/motion.ts`

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}
```
Rules:
- Every `<section>`: `initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}`.
- Hero H1/sub/buttons: stagger on load.
- Portfolio cover hover: `scale(1.03)`, 0.4s.
- Header background: solidify on scroll, 0.3s.
- FAQ: `AnimatePresence` + height 0→auto.
- Lightbox: fade only.
- **All motion disabled** under `prefers-reduced-motion` (handled globally in CSS; also guard JS-driven motion).

---

## SEO

App Router `metadata`:
```tsx
export const metadata: Metadata = {
  title: 'Aibrium Studio — Exclusive On-Model Visuals for Fashion & Lifestyle Brands, Weekly',
  description:
    'We cast exclusive digital models for your brand and deliver campaign-quality on-model product visuals every week. No photoshoots. Start with a $900 pilot.',
  metadataBase: new URL('https://aibrium.com'),
  alternates: { canonical: 'https://aibrium.com' },
  openGraph: {
    title: 'Aibrium Studio — Exclusive On-Model Visuals, Weekly',
    description:
      'Exclusive digital models cast for your brand. Campaign-quality on-model visuals every week.',
    url: 'https://aibrium.com',
    siteName: 'Aibrium Studio',
    images: ['/og.jpg'], // = hero visual
    type: 'website',
  },
}
```
- Exactly **one `<h1>`** (the hero). All other titles are `<h2>`.
- Semantic `<section>` per block; `<nav>`, `<footer>`, `<article>` on privacy.
- Favicon: gold **"A."** on ink.
- Generate `robots.txt` + `sitemap.xml` (Next.js `app/sitemap.ts` / `app/robots.ts`), listing `/` and `/privacy`.

---

## Analytics (Plausible, cookieless)

- Script in `layout.tsx` (see Global layout). No cookie banner needed.
- Track custom events with `window.plausible('EventName')`:
  - `Calendly Popup` — any popup open (in `openCalendlyPopup`)
  - `Mailto Click` — on hello@ / office@ mailto links
  - `Lightbox Open` — with `{ props: { catalogue } }`
  - Inline Calendly bookings are captured by Calendly's own event; optionally listen to the Calendly `message` event for `calendly.event_scheduled` and fire `plausible('Booking')`.

---

## Performance

- Lighthouse target: **90+ on mobile.**
- Images: `next/image` with `width`, `height`, `alt`; serve WebP/AVIF; lazy-load below the fold; total page weight under ~2.5 MB including imagery.
- Fonts: `next/font` with `display: 'swap'`, preloaded — zero layout shift.
- Calendly + Plausible scripts: deferred (`lazyOnload`) — never block render.
- No raw `<img>`. No unused JS libraries.

---

## Responsive

Mobile-first. Every block collapses to a single column gracefully.

| Breakpoint | Width | Key behavior |
|---|---|---|
| default (mobile) | <640px | Single column; hero image above text; hamburger nav; floating hero cards simplified/hidden |
| `sm` | 640px | 2-col fact/step cards |
| `md` | 768px | Full nav; hero becomes true split; 2-col Work grid |
| `lg` | 1024px | Full editorial layout; pricing tiers in a row |
| `xl` | 1280px | `max-w-content (1200px) mx-auto px-6` container |

Section vertical padding: `clamp(72px, 12vw, 128px)`.

---

## Editing content later (hand this to the client)

| To change… | Edit… |
|---|---|
| Any page copy | the matching section component in `src/components/sections/` |
| Header nav / wordmark / buttons | `src/components/layout/Header.tsx` |
| Footer emails / links | `src/components/layout/Footer.tsx` |
| Calendly link | `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` (and Vercel) — one place |
| Portfolio catalogues / images | `src/lib/catalogues.ts` + drop files in `/public/work/<slug>/` |
| Hero image | replace `/public/hero.webp` (same name) |
| Prices / tiers | `src/components/sections/Pricing.tsx` |

---

## What NOT to do (explicit — from the brief)

- **No stock photography anywhere.** Portfolio/placeholder visuals only.
- **No "AI"** in headlines, hero, or navigation. The method is answered honestly in FAQ Q1; the site sells outcomes.
- **No chatbots, no popups** (except Calendly on click), **no newsletter capture, no cookie banner** (cookieless analytics), **no auto-playing anything.**
- **No fake urgency, fake counters, or fake testimonials.** Empty proof slots stay empty (and commented-out) until real proof exists.
- **No contact form** — Calendly + mailto only.
- No gradients except the hero radial + gold bloom. No dark mode toggle. No shadcn.

---

## Build order — follow exactly

1. Scaffold Next.js 14 into `/web` + install deps (framer-motion, lucide-react, clsx, tailwind-merge). Add `vercel.json`.
2. `globals.css` (CSS vars + reduced-motion) + `tailwind.config.ts` (colors, fonts, shadows).
3. Fonts (`Cormorant_Garamond` + `Inter`) via `next/font` in `layout.tsx`.
4. `src/lib/`: `utils.ts`, `calendly.ts`, `catalogues.ts`, `motion.ts`.
5. UI primitives: `Button.tsx`, `SectionLabel.tsx`, `Card.tsx`, `CalendlyButton.tsx`.
6. `Header.tsx` (scroll-aware, transparent-over-hero) + `Footer.tsx` (ink).
7. Home page — build sections **in order**: Hero (dark) → ProblemFix → Work (+ `Lightbox.tsx`) → ExclusiveModels → Process → Pricing → Faq → FinalCta (+ `CalendlyInline.tsx`). Assemble in `app/page.tsx`.
8. `/privacy` page.
9. Add Framer Motion (fade-up on scroll, hero on-load stagger, FAQ, lightbox, header) — subtle only.
10. SEO metadata (single H1), `sitemap.ts`, `robots.ts`, favicon, OG image.
11. Plausible script + custom events (Calendly popup, mailto, lightbox).
12. QA pass: mobile-first at every breakpoint; keyboard focus visible; reduced-motion respected; no raw colors (only tokens); Lighthouse mobile 90+.

---

## Content facts (paste-ready reference)

- Studio: **Aibrium. Studio** (period is part of the wordmark)
- Legal: **«Mining capital LLC» SRL, t/a Aibrium Studio** · Chișinău, Republic of Moldova
- Emails: **hello@aibrium.com** (general) · **office@aibriumstudio.com** (production)
- Catalogues: **SOLÈNE** (elegant fashion) · **KAIA SWIM** (swimwear) · **MOVA ACTIVE** (activewear) · **VELA SKIN** (beauty)
- All copy above is final. Industry-real language only — never Lorem Ipsum.

---

## Deploy (Vercel) — quick note

- Push `/web` to GitHub → Vercel → New Project → Framework: Next.js → Root Directory: `web` → Deploy.
- Set env var `NEXT_PUBLIC_CALENDLY_URL` in Vercel.
- Cold-email sending domains (`aibriumstudio.com`, `getaibrium.com`, etc.) **301-redirect to `aibrium.com`** (domain-level in Vercel or DNS). **Do not touch those domains' email DNS** (MX/SPF/DKIM/DMARC stay as-is).
