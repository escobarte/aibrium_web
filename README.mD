# Aibrium Studio — website

## How to add images and Calendly link
Is described in instructions.md

Single-page marketing site + `/privacy` for **Aibrium Studio** (exclusive on-model visuals for fashion & lifestyle brands). Job of the site: validate a cold-email prospect in ~10 seconds and route them to a Calendly call or a sample request.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion (subtle) |
| Icons | Lucide React |
| Fonts | Cormorant Garamond (display) + Inter (body) — via `next/font` |
| Scheduling | Calendly (popup + inline) |
| Analytics | Plausible (cookieless) |
| Theme | Light editorial (cream/white/gold/ink). Dark hero + ink footer only. No dark-mode toggle. |

Palette: Ink `#1A1A1A` · Cream `#F7F3EC` · Gold `#8A6D3B` · White `#FFFFFF` · Grey `#666666`.

---

## What's what (the files in this folder)

| File | What it is |
|---|---|
| **`SKILL.md`** | The full build spec — single source of truth. Palette, fonts, every section's final copy, components, Calendly/analytics/SEO, "what NOT to do". You don't have to read it all — Claude Code reads the relevant parts per phase. |
| **`BUILD_PLAN.md`** | **Start here.** 8 phases, each a paste-ready prompt for Claude Code. One phase per session. |
| **`CHANGELOG_work.md`** | Build log. Claude Code appends an entry per task and marks it `✅ verified` once tested. |
| `Aibrium_Website_Specification.pdf` | The client's original design & copy brief (the "why"). Reference only. |
| `/web` | The Next.js project itself (created in Phase 0). |

---

## How to build

1. Open **`BUILD_PLAN.md`**.
2. Copy the **Phase 0** prompt into Claude Code. Let it run.
3. `cd web && npm run dev` → check it in the browser.
4. Move to Phase 1, then 2 … through Phase 7. One phase per session.

Three rules Claude Code must follow (they're baked into every phase prompt and into `SKILL.md`):
- **It never touches git.** You handle all version control.
- **It logs each task** in `CHANGELOG_work.md`.
- **It marks a task `✅ verified` only after it's been run and works.**

---

## Run locally

```bash
cd web
npm run dev        # http://localhost:3000
```

Build check:
```bash
npm run build && npm run start
```

---

## Placeholders (intentional — the site renders without them filled in)

- **Calendly:** a placeholder URL is used until you set `NEXT_PUBLIC_CALENDLY_URL` in `web/.env.local` (and in Vercel).
- **Images:** portfolio + hero use `placehold.co` URLs (already on-brand colors) so everything renders immediately. Later, drop real files into `web/public/work/<slug>/` and `web/public/hero.webp`, point `catalogues.ts` + the hero at the local paths, and remove the `placehold.co` entry from `next.config.mjs`.

---

## Deploy (Vercel)

1. Push `/web` to GitHub (**you** do this — Claude Code won't).
2. vercel.com → New Project → import the repo.
3. Framework: **Next.js** · Root Directory: **`web`**.
4. Add env var `NEXT_PUBLIC_CALENDLY_URL`.
5. Deploy.

Cold-email sending domains (`aibriumstudio.com`, `getaibrium.com`, …) → 301-redirect to `aibrium.com` at the domain level. **Don't touch those domains' email DNS** (MX/SPF/DKIM/DMARC).

---

## Edit content later

| Change | Where |
|---|---|
| Page copy | `web/src/components/sections/*` |
| Nav / wordmark | `web/src/components/layout/Header.tsx` |
| Footer emails/links | `web/src/components/layout/Footer.tsx` |
| Calendly link | `web/.env.local` → `NEXT_PUBLIC_CALENDLY_URL` |
| Portfolio images | `web/src/lib/catalogues.ts` + `web/public/work/<slug>/` |
| Prices | `web/src/components/sections/Pricing.tsx` |
