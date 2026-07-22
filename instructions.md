1. Calendly — одна строчка, один файл.

Сейчас стоит плейсхолдер. Когда будет реальная ссылка, кладёшь её в web/.env.local:

NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/твой-аккаунт/15min

Всё — каждая кнопка «BOOK A CALL» и инлайн-виджет подхватят автоматически. Файл .env.local уже в .gitignore, в Vercel ту же переменную добавишь в Settings → Environment Variables.

Если хочешь проверить до реального Calendly — создай бесплатный аккаунт на calendly.com, скопируй ссылку на любой тип встречи, вставь в .env.local, перезапусти npm run dev.

2. Картинки — куда, какие, какого размера.

Что	Куда кладёшь	Формат	Размер (px)	Имя файла
Герой (главное фото)	web/public/hero.webp	WebP или JPG	~1400×1000	hero.webp
SOLÈNE (обложка + галерея)	web/public/work/solene/	WebP или JPG	~1000×1250 (портрет)	01.webp, 02.webp … 08.webp
KAIA SWIM	web/public/work/kaia-swim/	то же	то же	01.webp … 08.webp
MOVA ACTIVE	web/public/work/mova-active/	то же	то же	01.webp … 08.webp
VELA SKIN	web/public/work/vela-skin/	то же	то же	01.webp … 08.webp

Первый файл (01.webp) — обложка каталога. Остальные — галерея в лайтбоксе.

После того как положил файлы, нужно сделать одно: открыть web/src/lib/catalogues.ts и поменять URL-ы с placehold.co/... на локальные пути (/work/solene/01.webp и т.д.). И в герое поменять путь на /hero.webp. Потом из next.config.mjs можно убрать remotePatterns для placehold.co, и с <Image> убрать unoptimized.

3. «Aibrium Hero» — да, это место под главное фото.

Это та большая картинка справа в тёмном герое (сплит-раскладка: текст слева, фото справа). Сейчас там заглушка с надписью «Aibrium Hero». Когда подберёшь свой лучший визуал — женщина в одежде бренда, модель с продуктом, что-то campaign-quality — кладёшь его как web/public/hero.webp и меняешь путь в коде. Именно эта картинка и будет первым, что видит посетитель.

Все три пункта — «потом», когда будут реальные ассеты. Сейчас на сборку не влияют, сайт работает с заглушками. Идём дальше?