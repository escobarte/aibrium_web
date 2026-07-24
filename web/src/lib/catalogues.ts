export type CatalogueImage = {
  src: string
  width: number
  height: number
  alt: string
}

export type Catalogue = {
  slug: string
  name: string
  category: string
  cover: CatalogueImage // /work/<slug>/01.jpg
  images: CatalogueImage[] // real client photography, /work/<slug>/NN.jpg
}

export const catalogues: Catalogue[] = [
  {
    slug: 'solene',
    name: 'SOLÈNE',
    category: 'Elegant fashion',
    cover: {
      src: '/work/solene/01.jpg',
      width: 1240,
      height: 1754,
      alt: 'SOLÈNE — elegant fashion',
    },
    images: [
      {
        src: '/work/solene/01.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 1',
      },
      {
        src: '/work/solene/02.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 2',
      },
      {
        src: '/work/solene/03.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 3',
      },
      {
        src: '/work/solene/04.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 4',
      },
      {
        src: '/work/solene/05.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 5',
      },
      {
        src: '/work/solene/06.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 6',
      },
      {
        src: '/work/solene/07.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 7',
      },
      {
        src: '/work/solene/08.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 8',
      },
      {
        src: '/work/solene/09.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 9',
      },
      {
        src: '/work/solene/10.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 10',
      },
      {
        src: '/work/solene/11.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 11',
      },
      {
        src: '/work/solene/12.jpg',
        width: 1240,
        height: 1754,
        alt: 'SOLÈNE — elegant fashion, visual 12',
      },
    ],
  },
  {
    slug: 'kaia-swim',
    name: 'KAIA SWIM',
    category: 'Swimwear',
    cover: {
      src: '/work/kaia-swim/01.jpg',
      width: 1240,
      height: 1754,
      alt: 'KAIA SWIM — swimwear',
    },
    images: [
      {
        src: '/work/kaia-swim/01.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 1',
      },
      {
        src: '/work/kaia-swim/02.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 2',
      },
      {
        src: '/work/kaia-swim/03.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 3',
      },
      {
        src: '/work/kaia-swim/04.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 4',
      },
      {
        src: '/work/kaia-swim/05.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 5',
      },
      {
        src: '/work/kaia-swim/06.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 6',
      },
      {
        src: '/work/kaia-swim/07.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 7',
      },
      {
        src: '/work/kaia-swim/08.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 8',
      },
      {
        src: '/work/kaia-swim/09.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 9',
      },
      {
        src: '/work/kaia-swim/10.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 10',
      },
      {
        src: '/work/kaia-swim/11.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 11',
      },
      {
        src: '/work/kaia-swim/12.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 12',
      },
      {
        src: '/work/kaia-swim/13.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 13',
      },
      {
        src: '/work/kaia-swim/14.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 14',
      },
      {
        src: '/work/kaia-swim/15.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 15',
      },
      {
        src: '/work/kaia-swim/16.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 16',
      },
      {
        src: '/work/kaia-swim/17.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 17',
      },
      {
        src: '/work/kaia-swim/18.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 18',
      },
      {
        src: '/work/kaia-swim/19.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 19',
      },
      {
        src: '/work/kaia-swim/20.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 20',
      },
      {
        src: '/work/kaia-swim/21.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 21',
      },
      {
        src: '/work/kaia-swim/22.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 22',
      },
      {
        src: '/work/kaia-swim/23.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 23',
      },
      {
        src: '/work/kaia-swim/24.jpg',
        width: 1240,
        height: 1754,
        alt: 'KAIA SWIM — swimwear, visual 24',
      },
    ],
  },
  {
    slug: 'mova-active',
    name: 'MOVA ACTIVE',
    category: 'Activewear',
    cover: {
      src: '/work/mova-active/01.jpg',
      width: 1240,
      height: 1754,
      alt: 'MOVA ACTIVE — activewear',
    },
    images: [
      {
        src: '/work/mova-active/01.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 1',
      },
      {
        src: '/work/mova-active/02.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 2',
      },
      {
        src: '/work/mova-active/03.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 3',
      },
      {
        src: '/work/mova-active/04.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 4',
      },
      {
        src: '/work/mova-active/05.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 5',
      },
      {
        src: '/work/mova-active/06.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 6',
      },
      {
        src: '/work/mova-active/07.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 7',
      },
      {
        src: '/work/mova-active/08.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 8',
      },
      {
        src: '/work/mova-active/09.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 9',
      },
      {
        src: '/work/mova-active/10.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 10',
      },
      {
        src: '/work/mova-active/11.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 11',
      },
      {
        src: '/work/mova-active/12.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 12',
      },
      {
        src: '/work/mova-active/13.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 13',
      },
      {
        src: '/work/mova-active/14.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 14',
      },
      {
        src: '/work/mova-active/15.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 15',
      },
      {
        src: '/work/mova-active/16.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 16',
      },
      {
        src: '/work/mova-active/17.jpg',
        width: 1240,
        height: 1754,
        alt: 'MOVA ACTIVE — activewear, visual 17',
      },
    ],
  },
  {
    slug: 'vela-skin',
    name: 'VELA SKIN',
    category: 'Beauty',
    cover: {
      src: '/work/vela-skin/01.jpg',
      width: 1240,
      height: 1754,
      alt: 'VELA SKIN — beauty',
    },
    images: [
      {
        src: '/work/vela-skin/01.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 1',
      },
      {
        src: '/work/vela-skin/02.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 2',
      },
      {
        src: '/work/vela-skin/03.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 3',
      },
      {
        src: '/work/vela-skin/04.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 4',
      },
      {
        src: '/work/vela-skin/05.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 5',
      },
      {
        src: '/work/vela-skin/06.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 6',
      },
      {
        src: '/work/vela-skin/07.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 7',
      },
      {
        src: '/work/vela-skin/08.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 8',
      },
      {
        src: '/work/vela-skin/09.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 9',
      },
      {
        src: '/work/vela-skin/10.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 10',
      },
      {
        src: '/work/vela-skin/11.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 11',
      },
      {
        src: '/work/vela-skin/12.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 12',
      },
      {
        src: '/work/vela-skin/13.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 13',
      },
      {
        src: '/work/vela-skin/14.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 14',
      },
      {
        src: '/work/vela-skin/15.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 15',
      },
      {
        src: '/work/vela-skin/16.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 16',
      },
      {
        src: '/work/vela-skin/17.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 17',
      },
      {
        src: '/work/vela-skin/18.jpg',
        width: 1240,
        height: 1754,
        alt: 'VELA SKIN — beauty, visual 18',
      },
    ],
  },
]

// Hero visual placeholder (light, on-brand). Swap for /hero.webp later.
export const HERO_IMAGE =
  'https://placehold.co/1400x1000/F7F3EC/8A6D3B.png?text=Aibrium+Hero'
