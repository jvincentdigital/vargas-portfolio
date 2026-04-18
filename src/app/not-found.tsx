import Link from 'next/link';

// Fallback for URLs that don't match the [locale] segment (e.g. typos outside
// /es/* or /en/*). Self-contained because the root layout returns plain
// children without html/body.
export default function RootNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: 24,
          background: '#F5ECD7',
          color: '#3D2B1F',
          fontFamily:
            '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main style={{ maxWidth: 480, textAlign: 'center' }}>
          <p
            style={{
              color: '#8B6347',
              fontSize: 64,
              lineHeight: 1,
              margin: '0 0 24px',
              fontFamily: '"DM Serif Display", Georgia, serif',
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              margin: '0 0 16px',
              fontFamily: '"DM Serif Display", Georgia, serif',
            }}
          >
            Página no encontrada · Page not found
          </h1>
          <p
            style={{
              opacity: 0.7,
              lineHeight: 1.6,
              margin: '0 0 32px',
            }}
          >
            La página que buscas no existe.
            <br />
            The page you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/es"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#8B6347',
                color: '#F5ECD7',
                borderRadius: 999,
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Inicio (ES)
            </Link>
            <Link
              href="/en"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'transparent',
                color: '#3D2B1F',
                border: '1px solid #C4A882',
                borderRadius: 999,
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Home (EN)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
