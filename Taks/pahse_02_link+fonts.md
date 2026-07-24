Теперь шрифты. Честно: картинка от дизайнера слабая.

Это типовая инфографика из соцсетей, причём с опечатками прямо в заголовке — «Parth Montserrat», «Pontserrat», «Boyn text». Такие подборки строятся по принципу «безопасные бесплатные шрифты», а не под конкретный бренд.

Сейчас на сайте Cormorant Garamond + Inter. Это объективно более сильная пара для люксового fashion, чем всё, что обведено на картинке. Менять всё целиком было бы шагом назад.

Но одно наблюдение делает предложение дизайнера частично осмысленным. Посмотри на брендбук: сам логотип — высококонтрастный серифный, а вот мелкие подписи капсом с широким трекингом (AIBRIUM STUDIO, BRAND IDENTITY, CONCEPT) — это геометрический гротеск, очень похожий на Montserrat. Похоже, дизайнер верстал брендбук именно им. Тогда его предложение — не про красоту, а про сшивку сайта с фирменным стилем, и это уже аргумент.

Моё предложение — не менять всё, а развести три роли:

Роль	Сейчас	Предлагаю
Заголовки, названия карточек, лого	Cormorant Garamond	EB Garamond
Микро-подписи капсом, кнопки, меню	Inter	Montserrat 500/600
Основной текст, абзацы, описания	Inter	Inter (оставить)

```
Read SKILL.md sections: "Working rules", "Design system"
(typography scale), "Global layout", "Calendly integration",
"Buttons", "Shared components".

Two tasks.

=== TASK 1 — real Calendly URL, committed to the repo ===
The real booking URL is:
https://calendly.com/hello-aibrium

1. In src/lib/calendly.ts, set this as the actual default
   value of CALENDLY_URL — a literal string in the file, so
   the site works with zero configuration on any host.
2. Keep NEXT_PUBLIC_CALENDLY_URL as an OPTIONAL override:
   read the env var if present, otherwise fall back to the
   literal above. Never let a missing env var break the
   build or produce an undefined URL.
3. Do NOT create web/.env.local, do NOT modify .gitignore,
   and do NOT commit any env file. If web/.env.local already
   exists with a placeholder Calendly value, delete it.
4. Do not hardcode the URL anywhere else — every component
   must import it from src/lib/calendly.ts. Grep for stray
   calendly.com strings and remove any you find.
5. Confirm every CTA that should open Calendly actually does
   — header BOOK A CALL, hero BOOK A 15-MIN CALL, pricing,
   final CTA. List them back to me.

=== TASK 2 — typography update ===
The brand designer's identity system uses a geometric sans
for small-caps labels. Align the site with it, but change
ONLY the roles listed below.

6. Replace Cormorant Garamond with EB Garamond as the
   display face (H1, H2, card titles, wordmark). Same
   weights and same type scale — this is a face swap, not a
   redesign.
7. Add Montserrat (weights 500 and 600 only) and use it
   EXCLUSIVELY for: SectionLabel, button labels, nav items,
   the lightbox counter, and any other small uppercase
   letter-spaced micro-copy.
8. Inter stays as the body face for all paragraphs,
   descriptions and captions. Do NOT put Montserrat into
   body text.
9. Load both via next/font/google in layout.tsx with
   display: 'swap' and latin subset only. No <link> tags.
   Remove the Cormorant import if nothing uses it.
10. Update the fontFamily tokens in tailwind.config.ts so
    there is a distinct token for the label face — do not
    scatter raw font names across components.
11. Optical check: EB Garamond and Cormorant have different
    metrics. Re-check the H1 in the hero and the section
    headings at 390px, 768px and 1440px, and adjust only
    letter-spacing / line-height if something now looks
    cramped or loose. Do not change font sizes.
12. Update the typography section of SKILL.md to the new
    three-role system, and update the "Calendly integration"
    section to state that the URL now lives as a literal in
    src/lib/calendly.ts with the env var as an optional
    override — so later phases don't revert either change.

Show me the plan and the files you will touch before
editing.

Rules: read only the SKILL.md sections named above. Do not
run any git command. Use only the palette / fonts / copy
from SKILL.md. When done, append an entry to
`CHANGELOG_work.md` (what you built, files changed, status
`⏳ built, untested`), then run `npm run dev`; once it
renders correctly, mark that entry `✅ verified`.
```