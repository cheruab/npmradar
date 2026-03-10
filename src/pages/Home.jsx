import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/package/SearchBar'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>

      <header style={{ height: '56px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <span style={{ color: '#ededed', fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
          npm<span style={{ color: '#0070f3' }}>radar</span>
        </span>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px 96px' }}>
        <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: '999px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0070f3', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#0070f3', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                5 live data sources
              </span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#ededed', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Inspect any npm package
            </h1>
            <p style={{ color: '#555', fontSize: '14px', maxWidth: '320px', lineHeight: 1.6 }}>
              Bundle size, download trends, health score, and GitHub stats — in one place.
            </p>
          </div>

          <SearchBar onSearch={(name) => navigate(`/package/${name}`)} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['react', 'lodash', 'axios', 'next'].map((pkg) => (
              <button
                key={pkg}
                onClick={() => navigate(`/package/${pkg}`)}
                style={{ background: 'none', border: 'none', color: '#444', fontSize: '11px', fontFamily: 'monospace', cursor: 'pointer', padding: 0 }}
                onMouseOver={(e) => e.target.style.color = '#888'}
                onMouseOut={(e) => e.target.style.color = '#444'}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ height: '48px', borderTop: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#333', fontSize: '11px', fontFamily: 'monospace' }}>
          built with npm · bundlephobia · npms.io · github api
        </p>
      </footer>

    </div>
  )
}
