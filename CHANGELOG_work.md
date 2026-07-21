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

