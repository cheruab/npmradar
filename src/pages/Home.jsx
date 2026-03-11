import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/package/SearchBar'

const SUGGESTIONS = ['react', 'lodash', 'axios', 'next', 'typescript', 'tailwindcss']

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow — exactly like better-auth */}
      <div style={{
        position: 'fixed',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,112,243,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Nav */}
      <header style={{
        position: 'relative', zIndex: 10,
        height: '60px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(8,8,8,0.8)',
        backdropFilter: 'blur(12px)',
      }}>
        <span style={{ fontSize: '25px', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>
          npm<span style={{ color: '#0070f3' }}>radar</span>
        </span>
        
         <a href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '12px', fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.3)',
            textDecoration: 'none',
            padding: '6px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        >
          GitHub ↗
        </a>
      </header>

      {/* Hero */}
      <main style={{
        flex: 1, position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 24px 80px',
      }}>
        <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px',
            background: 'rgba(0,112,243,0.08)',
            border: '1px solid rgba(0,112,243,0.2)',
            borderRadius: '999px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0070f3', boxShadow: '0 0 6px #0070f3' }} />
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(96,165,250,0.9)', letterSpacing: '0.05em' }}>
              npm · bundlephobia · npms.io · github
            </span>
          </div>

          {/* Headline */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: '#fff',
            }}>
              Inspect any npm package
            </h1>
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
              maxWidth: '380px',
              margin: '0 auto',
            }}>
              Bundle size, download trends, health score, and GitHub stats — one URL, instant insight.
            </p>
          </div>

          {/* Search */}
          <div style={{ width: '100%' }}>
            <SearchBar onSearch={(name) => navigate(`/package/${name}`)} />
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginRight: '4px' }}>try:</span>
            {SUGGESTIONS.map((pkg) => (
              <button
                key={pkg}
                onClick={() => navigate(`/package/${pkg}`)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px', fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)' }}>
          npmradar — open source · built for developers
        </p>
      </footer>
    </div>
  )
}