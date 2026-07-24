Read SKILL.md sections: "Working rules", "Calendly
integration", Block 4 (Work / portfolio), Block 1 (Header),
Block 2 (Hero), "Shared components".

Three tasks.

=== TASK 1 — restore scroll position on lightbox close ===
On mobile, closing the lightbox (via Back or the X button)
returns the user to the wrong scroll position — the page
jumps instead of staying where they were.

1. Diagnose it first and tell me the cause before fixing.
   Most likely the body scroll lock uses position: fixed,
   which discards the scroll offset.
2. Fix: capture window.scrollY the moment the lightbox
   opens, and restore that exact offset when it closes,
   using instant scroll behaviour (never smooth — a visible
   scroll animation on close is worse than the jump).
3. This must work identically for all three close paths:
   Back button, X button, Esc.
4. No layout shift when the lock is applied — compensate for
   the scrollbar width on desktop so the page doesn't jump
   sideways when the lightbox opens.
5. If the mobile menu uses the same lock, fix it there too.

=== TASK 2 — BOOK A CALL does nothing on mobile ===
On mobile, tapping BOOK A CALL in the header/mobile menu
does not open the Calendly popup. It works on desktop.

6. Diagnose and report the actual cause before changing
   anything — do not guess-patch. Check whether the mobile
   menu's CTA is wired to the same handler as the desktop
   one, whether the Calendly script is loaded at that point,
   and whether the open call is being swallowed because the
   menu is still open or the element is unmounted on click.
7. Fix it so every CTA opens Calendly on every breakpoint.
   All CTAs must go through the same shared handler — no
   duplicated logic between mobile and desktop.
8. If the mobile menu is open, close it first, then open
   Calendly.
9. Then verify each CTA on mobile and desktop and list the
   result for each one: header, hero, pricing, final CTA.

=== TASK 3 — copy change: 15 min → 30 min ===
10. Change the hero CTA label from "BOOK A 15-MIN CALL" to
    "BOOK A 30-MIN CALL".
11. Search the whole codebase for any other mention of a
    15-minute call — other CTAs, FAQ answers, pricing copy,
    metadata, alt text — and update them to 30 minutes so
    nothing contradicts.
12. Update the corresponding copy in SKILL.md so later
    phases don't revert it. List every place you changed.
13. Do not change any other copy.

Show me the plan and the files you will touch before
editing.

Rules: read only the SKILL.md sections named above. Do not
run any git command. Use only the palette / fonts / copy
from SKILL.md. When done, append an entry to
`CHANGELOG_work.md` (what you built, files changed, status
`⏳ built, untested`), then run `npm run dev`; once it
renders correctly, mark that entry `✅ verified`.