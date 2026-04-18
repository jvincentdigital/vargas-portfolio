import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Christian A. Vargas Valentín — Social Media Manager & Content Creator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '80px 96px',
          background:
            'linear-gradient(135deg, #F5ECD7 0%, #E8D4B0 55%, #C4A882 100%)',
          color: '#3D2B1F',
        }}
      >
        <div
          style={{
            fontSize: 26,
            textTransform: 'uppercase',
            letterSpacing: 8,
            color: '#8B6347',
            marginBottom: 40,
          }}
        >
          Social Media Manager
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            fontFamily: 'serif',
            marginBottom: 32,
          }}
        >
          <span>Christian A.</span>
          <span>Vargas Valentín</span>
        </div>

        <div
          style={{
            fontSize: 34,
            fontStyle: 'italic',
            color: '#8B6347',
            fontFamily: 'serif',
          }}
        >
          Content Strategy · Video Editing · Community Management
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 96,
            fontSize: 20,
            letterSpacing: 4,
            color: '#3D2B1F',
            opacity: 0.6,
          }}
        >
          PUERTO RICO
        </div>
      </div>
    ),
    { ...size }
  );
}
