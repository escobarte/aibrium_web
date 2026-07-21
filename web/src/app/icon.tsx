import { ImageResponse } from 'next/og'

// Favicon: gold "A." on ink, per the brand mark. Generated at build time.
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1A1A',
          color: '#8A6D3B',
          fontSize: 40,
          fontWeight: 600,
          fontFamily: 'Georgia, "Times New Roman", serif',
          letterSpacing: '-0.02em',
        }}
      >
        A.
      </div>
    ),
    { ...size },
  )
}
