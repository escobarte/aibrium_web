# BUILD_PLAN.md — Aibrium, phase by phase

Build the site in **8 small phases**. Do **one phase per Claude Code session**.
Each phase below is a **paste-ready prompt** — copy the grey block into Claude Code as-is.
You (the human) handle all git. Claude Code never runs git.

**Start here → Phase 0.** After each phase: run `npm run dev`, eyeball it, and let Claude Code mark the changelog entry `✅ verified` (or you mark it).

Every prompt already ends with this shared closing (don't remove it):
> *Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to `CHANGELOG_work.md` (what you built, files changed, status `⏳ built, untested`), then run `npm run dev`; once it renders correctly, mark that entry `✅ verified`.*

---

## Phase 0 — Scaffold & foundation
```
Read SKILL.md sections: "Working rules", "Setup — build into /web", "Design system", "Global layout", "File structure", "Portfolio data & images".

Do only this:
1. Scaffold Next.js 14 into /web (TypeScript, ESLint, Tailwind, src-dir, App Router, import alias @/*) and install: framer-motion, lucide-react, clsx, tailwind-merge.
2. Add /web/vercel.json = { "framework": "nextjs" }.
3. globals.css: CSS variables + prefers-reduced-motion block.
4. tailwind.config.ts: colors, fontFamily (display/body), maxWidth.content, boxShadow (card/float), radius btn.
5. next.config.mjs: images.remotePatterns for placehold.co.
6. Fonts in layout.tsx via next/font/google (Cormorant Garamond 500/600, Inter 400/500) with display swap.
7. src/lib/: utils.ts (cn), calendly.ts (CALENDLY_URL placeholder + openCalendlyPopup), catalogues.ts (4 catalogues, placehold.co URLs for cover+images), motion.ts (fadeInUp, stagger).
8. A minimal page.tsx: just <main> with the H1 placeholder so I can confirm fonts + colors load.

Do NOT build Header, Footer, or any section yet.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** `npm run dev` → cream page, serif + Inter loaded, no console errors.

---

## Phase 1 — Shell: Header, Footer, UI primitives
```
Read SKILL.md sections: "Working rules", "Buttons", "Cards", "Shared components", "Calendly integration", Block 1 (Header), Block 10 (Footer).

Build:
1. ui/Button.tsx (primary / secondary, onDark prop, sizes).
2. ui/SectionLabel.tsx (gold small-caps, letter-spacing via CSS — no typed spaces).
3. ui/Card.tsx (base + interactive variant).
4. ui/CalendlyButton.tsx (calls openCalendlyPopup from lib/calendly.ts).
5. layout/Header.tsx: sticky slim; transparent + cream text over the (future) dark hero; solid cream bg + ink text + subtle shadow after ~40px scroll; nav Work/Process/Pricing/FAQ anchors + BOOK A CALL; mobile hamburger.
6. layout/Footer.tsx: ink bg, cream text, 3 columns + bottom legal line, Privacy link to /privacy.
7. Wire Header + Footer into layout.tsx around {children}.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** header solidifies on scroll, BOOK A CALL opens Calendly popup (placeholder), footer + mobile menu work.

---

## Phase 2 — Hero (dark) + Problem→Fix
```
Read SKILL.md sections: "Working rules", Block 2 (Hero), Block 3 (Problem → Fix), "Design system" (texture & motion rules), "Animations".

Build:
1. sections/Hero.tsx — ink background, warm radial + gold bloom behind the hero image, split layout (text left / hero image right), the two floating info-cards (true facts only), primary BOOK A 15-MIN CALL + secondary onDark SEE THE WORK (anchor #work). On-load staggered fade-up for H1/sub/buttons. Mobile: image above text, floating cards simplified/hidden. This is the page's single <h1>.
2. sections/ProblemFix.tsx — cream section, gold label + H2 + body + three fact cards.
3. Add both to page.tsx below the H1 placeholder (remove the placeholder H1).

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** dramatic dark hero with gold bloom, floating cards, mobile stacks correctly; Problem→Fix reads well.

---

## Phase 3 — The Work (portfolio + lightbox) + Exclusive models
```
Read SKILL.md sections: "Working rules", Block 4 (The Work), Block 5 (Exclusive models), "Portfolio data & images", "Shared components" (Lightbox).

Build:
1. Confirm catalogues.ts uses placehold.co URLs (cover + 6–10 images each).
2. sections/Work.tsx (id="work") — white section, 2×2 catalogue grid, cover zoom-on-hover, caption line. Click a card → lightbox.
3. ui/Lightbox.tsx — full-screen modal, ink/90 backdrop, prev/next, Esc + click-outside + X to close, keyboard nav, focus trap, fade only. Fire plausible('Lightbox Open', { props: { catalogue }}) on open.
4. Leave a clearly COMMENTED-OUT empty section between Block 4 and Block 5 for future client logos / testimonials / case study. Do not fabricate any proof.
5. sections/ExclusiveModels.tsx — cream section, image-forward showcase (candidate "casting board" visual + text), three-step row.
6. Add Work + ExclusiveModels to page.tsx in order.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** grid renders with placeholders, lightbox opens/closes/keyboard-navigates, exclusive-models section reads well.

---

## Phase 4 — Process + Pricing + FAQ
```
Read SKILL.md sections: "Working rules", Block 6 (Process), Block 7 (Pricing), Block 8 (FAQ), "Calendly integration".

Build:
1. sections/Process.tsx (id="process") — white section, four numbered cards 01–04 (numbers gold).
2. sections/Pricing.tsx (id="pricing") — cream section, featured PILOT card (gold border, first, START WITH THE PILOT → Calendly popup) + three tiers with ENGINE highlighted "MOST POPULAR"; line under cards.
3. sections/Faq.tsx (id="faq") — white section, accordion all closed by default, AnimatePresence height transition. All 7 Q&As verbatim. Reminder: the word "AI" appears only in FAQ Q1 — nowhere else.
4. Add all three to page.tsx in order.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** numbered process, pricing highlight + pilot button opens Calendly, FAQ expand/collapse smooth.

---

## Phase 5 — Final CTA (inline Calendly) + /privacy
```
Read SKILL.md sections: "Working rules", Block 9 (Final CTA), "/privacy page", "Calendly integration".

Build:
1. ui/CalendlyInline.tsx — the inline widget div using CALENDLY_URL.
2. sections/FinalCta.tsx — calm closing section, gold label + H2 + body + inline Calendly + email line (hello@aibrium.com mailto). Add to page.tsx as the last section before the footer.
3. app/privacy/page.tsx — single <article> on cream, max-width ~760px, realistic placeholder privacy text (cookieless analytics, Calendly, email), "Last updated: 2026". Uses shared Header + Footer.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** inline widget loads (placeholder URL is fine), mailto opens mail app, /privacy renders and footer link works.

---

## Phase 6 — Motion pass (subtle)
```
Read SKILL.md sections: "Working rules", "Animations", "Design system" (texture & motion rules).

Do:
1. Apply fadeInUp on every <section> (whileInView, viewport once, margin -80px).
2. Confirm hero on-load stagger, portfolio hover zoom 1.03, header solidify transition, FAQ + lightbox transitions.
3. Ensure ALL motion is disabled under prefers-reduced-motion.
4. Remove anything that reads as a gimmick — no parallax, no auto-sliders, no animated counters.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** sections reveal gently on scroll; toggling OS "reduce motion" kills all animation.

---

## Phase 7 — SEO, analytics, performance QA
```
Read SKILL.md sections: "Working rules", "SEO", "Analytics", "Performance", "Responsive".

Do:
1. metadata (title, description, canonical, OpenGraph with /og.jpg). Confirm exactly one <h1> (hero) and everything else <h2>.
2. app/sitemap.ts + app/robots.ts (list / and /privacy). Favicon = gold "A." on ink.
3. Plausible script in layout (deferred) + custom events: Calendly Popup, Mailto Click, Lightbox Open (already), and optionally Booking on Calendly event_scheduled.
4. Responsive pass at sm/md/lg/xl; next/image on all images with width/height/alt; aim Lighthouse mobile Performance 90+ / Accessibility 95+. Report anything you couldn't hit.

Rules: read only the SKILL.md sections named above. Do not run any git command. Use only the palette / fonts / copy from SKILL.md. When done, append an entry to CHANGELOG_work.md (what you built, files changed, status ⏳ built, untested), then run npm run dev; once it renders correctly, mark that entry ✅ verified.
```
**You test:** one H1, events fire, all breakpoints clean, Lighthouse mobile in target.

---

## After the build
- Put the real Calendly URL in `/web/.env.local` → `NEXT_PUBLIC_CALENDLY_URL=...` (and in Vercel env vars).
- Drop real portfolio images into `/public/work/<slug>/` and `/public/hero.webp`; switch `catalogues.ts` + hero to local paths; remove the `placehold.co` remotePattern.
- Deploy: see `README.md` → Deploy.
