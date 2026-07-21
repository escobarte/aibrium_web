export type Catalogue = {
  slug: string
  name: string
  category: string
  cover: string // /work/<slug>/01.webp (placeholder for now)
  images: string[] // 6–10 items (placeholders for now)
}

// Placeholder images use placehold.co with the on-brand palette hex baked in.
// Swap to local /work/<slug>/0N.webp paths when real assets arrive.
const dark = (label: string) =>
  `https://placehold.co/1000x1250/1A1A1A/F7F3EC.png?text=${encodeURIComponent(label)}`

function placeholders(name: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    dark(`${name} ${String(i + 1).padStart(2, '0')}`),
  )
}

export const catalogues: Catalogue[] = [
  {
    slug: 'solene',
    name: 'SOLÈNE',
    category: 'Elegant fashion',
    cover: dark('SOLÈNE 01'),
    images: placeholders('SOLÈNE', 8),
  },
  {
    slug: 'kaia-swim',
    name: 'KAIA SWIM',
    category: 'Swimwear',
    cover: dark('KAIA SWIM 01'),
    images: placeholders('KAIA SWIM', 8),
  },
  {
    slug: 'mova-active',
    name: 'MOVA ACTIVE',
    category: 'Activewear',
    cover: dark('MOVA ACTIVE 01'),
    images: placeholders('MOVA ACTIVE', 8),
  },
  {
    slug: 'vela-skin',
    name: 'VELA SKIN',
    category: 'Beauty',
    cover: dark('VELA SKIN 01'),
    images: placeholders('VELA SKIN', 8),
  },
]

// Hero visual placeholder (light, on-brand). Swap for /hero.webp later.
export const HERO_IMAGE =
  'https://placehold.co/1400x1000/F7F3EC/8A6D3B.png?text=Aibrium+Hero'
