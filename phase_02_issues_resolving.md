Диагноз по скрину: проблема не в настройке свайпа, а в самом подходе. Сейчас это drag на Framer Motion — палец тащит картинку, а JS каждый кадр пересчитывает позицию. Отсюда и дёрганье, и «плавание» при диагональном движении: нет блокировки оси, и элемент тянется во все стороны.

Профессиональное решение — не чинить drag, а выбросить его.

Лучший вариант для мобильного — нативный скролл браузера с scroll-snap. Лента страниц скроллится по горизонтали средствами самой системы, с родной инерцией. Это физически не может дёргаться: анимацией занимается компоновщик браузера, а не JavaScript. Плюс диагональный свайп ведёт себя так, как человек и ожидает от телефона. Ноль библиотек, ноль зависимостей.

Альтернатива — Embla Carousel (5 КБ, стандарт индустрии), но она не нужна, если хватает нативного скролла. А хватает.

Про «дёшево выглядит» — ты сам назвал причину. Подложка полупрозрачная: сквозь неё видно заголовок «Judge us by the images.», логотип и карточку. Из-за этого нет ощущения отдельного пространства — просто что-то наложилось поверх страницы. Плюс картинка не на весь экран, а серая плашка со счётчиком выглядит как системный элемент, а не как часть дизайна.

Что делают в премиальных лукбуках:

подложка полностью непрозрачная, глубокий чёрный — фон исчезает, остаётся только фотография;
изображение на весь экран через 100dvh (не vh — иначе адресная строка Chrome срезает низ);
стрелки на мобильном убираются совсем — на тач-устройстве это мусор, там свайп;
счётчик — мелкий капс золотом на чёрном, без плашки;
хедер сайта перекрывается, а не просвечивает.

Промпт:

Read SKILL.md sections: "Working rules", Block 4 (Work /
portfolio), "Design system", "Animations".

The lightbox swipe I asked for earlier came out wrong.
Framer Motion drag is janky and the image drifts when the
swipe isn't perfectly horizontal. Replace the approach
entirely — do not try to tune the drag values.

A. Navigation mechanism
1. Remove all Framer Motion drag logic from
   src/components/ui/Lightbox.tsx.
2. Rebuild slide navigation as a native horizontal
   scroll-snap track: a flex row of full-width slides in an
   overflow-x container with scroll-snap-type: x mandatory
   and scroll-snap-align: center on each slide. No carousel
   library.
3. Hide the scrollbar visually but keep the element
   scrollable.
4. Set touch-action: pan-x and overscroll-behavior: contain
   on the track so vertical finger movement never drags the
   image and never scrolls the page behind.
5. Sync the active index from scroll position using
   IntersectionObserver on the slides — do not use a scroll
   event listener with manual math.
6. Arrow buttons and left/right keyboard keys must move the
   track with element.scrollTo / scrollIntoView using smooth
   behaviour. Under prefers-reduced-motion use instant
   behaviour.
7. No infinite loop: first and last slide simply stop.

B. Visual treatment
8. Backdrop must be fully opaque ink (the darkest colour in
   the SKILL.md palette), not a translucent overlay. Nothing
   from the page behind may be visible — including the site
   header. Check the z-index against the header.
9. True fullscreen: position fixed, inset 0, height 100dvh
   (with a 100vh fallback for older browsers). The image
   fills the available space with object-fit: contain and is
   vertically centred.
10. Remove the grey bar behind the counter. Render the
    counter as small letter-spaced uppercase in the accent
    gold on the dark backdrop, using existing typography
    tokens.
11. Hide the arrow buttons below the lg breakpoint — touch
    users swipe. Keep them on desktop.
12. Respect safe-area insets (env(safe-area-inset-*)) so the
    close button and counter don't collide with the Android
    gesture bar or the iOS notch.
13. Lock body scroll while the lightbox is open and restore
    the exact scroll position on close.
14. Keep Esc to close and the existing close button.

C. Constraints
15. Do not add any npm dependency.
16. Do not change the Work grid, the catalogue cards, or any
    colours outside the lightbox.
17. Priority images must not all load at once — only the
    active slide and its immediate neighbours.

Show me the plan and the files you will touch before
editing.

Rules: read only the SKILL.md sections named above. Do not
run any git command. Use only the palette / fonts / copy
from SKILL.md. When done, append an entry to
`CHANGELOG_work.md` (what you built, files changed, status
`⏳ built, untested`), then run `npm run dev`; once it
renders correctly, mark that entry `✅ verified`.

И отдельно, не по коду: на фотографиях снизу впечатан текст — «07 — CAFÉ / A STILL MORNING», «PRESENCE, UNDISTRACTED». На полном экране он станет заметнее. Если это задумка клиента — ок, но подписи полупрозрачные и обрезаются краем кадра. Уточни, должны ли они там быть, пока не поздно переэкспортировать.