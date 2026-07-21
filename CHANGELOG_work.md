# CHANGELOG — Aibrium build log

Claude Code appends one entry at the end of every task. Newest at the bottom.

**Entry format:**
```
## [Phase N] Short task name — YYYY-MM-DD
- files: path/one.tsx, path/two.ts
- notes: what was built / anything worth knowing
- status: ⏳ built, untested        ← set on completion
```
When the task has been run (`npm run dev`) and works, change the status line to:
```
- status: ✅ verified — YYYY-MM-DD
```

Status legend: `⏳ built, untested` · `✅ verified` · `⚠️ needs fix (reason)`

---

<!-- entries below this line -->

## [Phase 1] Scaffold + design system foundation — 2026-07-21
- files: web/ (create-next-app scaffold), web/vercel.json, web/next.config.mjs, web/tailwind.config.ts, web/src/app/globals.css, web/src/app/layout.tsx, web/src/app/page.tsx, web/src/lib/utils.ts, web/src/lib/calendly.ts, web/src/lib/catalogues.ts, web/src/lib/motion.ts
- notes: Scaffolded Next.js 14.2 (TS, ESLint, Tailwind, src-dir, App Router, @/* alias) into /web; installed framer-motion, lucide-react, clsx, tailwind-merge. vercel.json = nextjs framework. globals.css: palette CSS vars + prefers-reduced-motion block. tailwind.config.ts: brand colors, display/body fontFamily, maxWidth.content, card/float shadows, btn radius. next.config.mjs: placehold.co remotePattern. layout.tsx: Cormorant Garamond 500/600 + Inter 400/500 via next/font/google with display swap. lib: cn(), CALENDLY_URL + openCalendlyPopup, 4 catalogues + hero with placehold.co URLs, fadeInUp/stagger variants. Minimal page.tsx with H1 placeholder to confirm fonts + colors. No Header/Footer/sections yet (later phases).
- verify: npm run dev → GET / returns 200, H1 renders, text-gold class present, both next/font variable classes on <html>, tsc --noEmit clean.
- status: ✅ verified — 2026-07-21

## [Phase 1] Shell — Header, Footer, UI primitives — 2026-07-21
- files: web/src/components/ui/Button.tsx, web/src/components/ui/SectionLabel.tsx, web/src/components/ui/Card.tsx, web/src/components/ui/CalendlyButton.tsx, web/src/components/layout/Header.tsx, web/src/components/layout/Footer.tsx, web/src/app/layout.tsx, web/src/app/page.tsx
- notes: Button (primary/secondary, onDark, md/lg sizes, href→<a> else <button>; primary gold/ink→gold-hover, secondary outline light=ink / dark=cream per spec). SectionLabel (gold small-caps, tracking 0.22em via CSS, optional 24px gold hairline — no typed spaces). Card (base: white bg, hairline border, radius-md, shadow-card; interactive adds group + hover:border-gold for portfolio/pricing). CalendlyButton (wraps Button, onClick=openCalendlyPopup). Header (fixed slim; transparent+cream text over future dark hero, solidifies to cream bg+ink text+hairline shadow past 40px scroll, 0.3s; desktop nav Work/Process/Pricing/FAQ anchors + Book a Call; mobile hamburger slide-in menu). Footer (ink bg, cream text, 3 cols: wordmark+tagline / General+Production mailtos / nav+Book a call Calendly; bottom legal line with Privacy→/privacy). Wired Header + Footer around {children} in layout.tsx. Added id="top" to page main for wordmark anchor.
- verify: npm run dev → GET / returns 200; wordmark "Aibrium.", "Book a Call", office@aibriumstudio.com, "Privacy Policy", and legal line all render; no dev errors; tsc --noEmit clean.
- status: ✅ verified — 2026-07-21

## [Phase 2] Hero (dark) + Problem→Fix — 2026-07-21
- files: web/src/components/sections/Hero.tsx, web/src/components/sections/ProblemFix.tsx, web/src/app/page.tsx
- notes: Hero — ink bg with warm radial (#242018→#1A1A1A) + blurred gold bloom rgba(138,109,59,0.28) behind the hero image; split layout (text left / image right on md+, image above text on mobile). Single page <h1> "Your brand's own models. New visuals every week." (Cormorant 600, cream), gold SectionLabel, #B9B2A6 sub, primary CalendlyButton "Book a 15-min Call" + secondary onDark "See the Work" → #work. Two floating info-cards (shadow-float, true facts: DELIVERY / YOUR MODEL with A avatar dot) shown md+ only, hidden on mobile. On-load stagger fade-up (initial→animate) on label/H1/sub/buttons. Hero carries id="top" for the header wordmark anchor. ProblemFix — cream section, clamp vertical padding, gold "Why We Exist" label + hairline, H2 "Great visuals shouldn't require a production.", body, three fact cards (Weekly delivery / Models exclusive / 3 ad-ready formats) via Card; whileInView stagger fade-up. page.tsx now renders <Hero/> + <ProblemFix/> (removed placeholder H1).
- verify: npm run dev → GET / 200; hero H1, "Book a 15-min Call", "See the Work", both floating cards ("Finished visuals every Friday" / "never reused"), "Why We Exist", H2, all three fact cards, and placehold.co hero image all render; exactly one <h1>; tsc --noEmit clean; no dev errors.
- fix: placehold.co returns SVG by default, which the Next image optimizer rejects ("received null"). Appended .png to every placehold.co URL (catalogues.ts dark() + HERO_IMAGE) so they return raster PNGs, and added `unoptimized` (with TODO to remove once real /public images land) to the Hero <Image> as a safety net. Re-ran npm run dev: hero src is the .png URL, serves content-type image/png 200, no "received null" / image errors.
- status: ✅ verified — 2026-07-21

## [Phase 3] The Work (portfolio + lightbox) + Exclusive models — 2026-07-21
- files: web/src/components/sections/Work.tsx, web/src/components/ui/Lightbox.tsx, web/src/components/sections/ExclusiveModels.tsx, web/src/app/page.tsx
- notes: Confirmed catalogues.ts (4 catalogues, each .png cover + 8 placeholder images). Work (id="work") — white section, gold "The Work" label + hairline, H2 "Judge us by the images.", 2×2 catalogue grid (1 col mobile) of interactive Cards: cover (unoptimized <Image>) with group-hover scale-1.03 zoom + hairline→gold, name (Cormorant) + category (grey caption); each card is a <button> that opens the Lightbox; caption line "Sample collections … written permission." below the grid. Commented-out empty FUTURE PROOF SLOT between Block 4 and Block 5 (logos/testimonials/case study) — no fabricated proof. Lightbox — full-screen fixed modal, ink/90 backdrop, AnimatePresence fade only, prev/next chevrons (wraparound), close via Esc + click-outside + X (stopPropagation on image/arrows), ArrowLeft/Right keyboard nav, body-scroll lock + focus moved to close button (focus trap), fires window.plausible('Lightbox Open', { props: { catalogue }}) on open. ExclusiveModels — cream section, image-forward showcase: casting-board visual (2×2 candidate thumbnail grid, unoptimized placeholders) + text (gold "Your Models" label, H2 "Cast once. Yours forever.", body), three-step row (We cast / You choose / We lock). page.tsx renders Hero → ProblemFix → Work → ExclusiveModels.
- verify: npm run dev → GET / 200; "The Work"/H2, all 4 catalogue names (SOLÈNE/KAIA SWIM/MOVA ACTIVE/VELA SKIN), caption line, id="work", "Your Models"/H2 "Cast once. Yours forever.", three steps (We cast/You choose/We lock), and casting-board Candidate placeholders all render; exactly one <h1>; tsc --noEmit clean; no "received null"/compile errors. (FUTURE PROOF SLOT is a JSX comment → correctly absent from rendered HTML.)
- status: ✅ verified — 2026-07-21

## [Phase 4] Process + Pricing + FAQ — 2026-07-21
- files: web/src/components/sections/Process.tsx, web/src/components/sections/Pricing.tsx, web/src/components/sections/Faq.tsx, web/src/app/page.tsx
- notes: Process (id="process") — white section, gold "The Process" label, H2 "From signing to your first delivery in two weeks.", four numbered Cards 01–04 (gold Cormorant numbers): Casting & Style Lock / Submit Mondays / Delivered Fridays / Refine. Pricing (id="pricing") — cream section, gold "Pricing" label, H2 "Start with a pilot. Scale when it works."; featured PILOT card (gold border, first, prominent) "$900" + START WITH THE PILOT CalendlyButton → popup; three tier cards (CORE $3,900 / ENGINE $5,900 highlighted with gold border + raised + "Most Popular" gold tag / FULL STUDIO $8,900) with feature lists; line under cards "Quarterly prepay −8% · 3-month minimum · … 1:1, 4:5, and 9:16." Faq (id="faq") — white section, gold "FAQ" label, all 7 Q&As verbatim, accordion all closed by default (one open at a time), AnimatePresence height 0→auto transition, Plus icon rotates 45° when open. "AI" appears only in Q1. page.tsx order: Hero → ProblemFix → Work → ExclusiveModels → Process → Pricing → Faq.
- verify: npm run dev → GET / 200; id="process"/"process" heading + all 4 step titles, id="pricing" + "THE PILOT"/$900/"Start with the Pilot"/"Most Popular"/FULL STUDIO/"3-month minimum", id="faq" + Q1/Q7 questions all render; exactly one <h1>; tsc --noEmit clean; no compile errors. AI-constraint: `grep -rnoE "\bAI\b" src/` returns exactly one match — Faq.tsx line 13 (Q1 answer) — and nowhere else in source.
- status: ✅ verified — 2026-07-21

