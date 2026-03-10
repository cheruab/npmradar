import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePackage }  from '../hooks/usePackage'
import SearchBar       from '../components/package/SearchBar'
import PackageHeader   from '../components/package/PackageHeader'
import DownloadChart   from '../components/package/DownloadChart'
import BundleSize      from '../components/package/BundleSize'
import GithubStats     from '../components/package/GithubStats'
import HealthScore     from '../components/package/HealthScore'
import Skeleton        from '../components/ui/Skeleton'
import ErrorMessage    from '../components/ui/ErrorMessage'

function LoadingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
        <Skeleton className="h-64" style={{ gridColumn: '1 / -1' }} />
        <Skeleton className="h-36" style={{ gridColumn: '1 / -1' }} />
      </div>
    </div>
  )
}

export default function PackagePage() {
  const { name }    = useParams()
  const navigate    = useNavigate()
  const { data, loading, chartLoading, error, lookup, period, changePeriod } = usePackage()

  useEffect(() => {
    if (name) lookup(name)
  }, [name])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Ambient glow follows the page */}
      <div style={{
        position: 'fixed', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,112,243,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        height: '60px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px', gap: '16px',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(16px)',
      }}>
        <Link
          to="/"
          style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', textDecoration: 'none', flexShrink: 0 }}
        >
          npm<span style={{ color: '#0070f3' }}>radar</span>
        </Link>

        <div style={{ width: '100%', maxWidth: '340px' }}>
          <SearchBar onSearch={(n) => navigate(`/package/${n}`)} loading={loading} />
        </div>

        {data && (
          <Link
            to={`/compare/${name}/react`}
            style={{
              flexShrink: 0, height: '34px', padding: '0 14px',
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '12px', fontFamily: 'monospace',
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            + Compare
          </Link>
        )}
      </header>

      {/* Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1, width: '100%', maxWidth: '880px', margin: '0 auto', padding: '36px 24px' }}>
        {loading && <LoadingState />}
        {error   && <ErrorMessage message={error} />}

        {data && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <PackageHeader npm={data.npm} />

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <HealthScore health={data.health} npms={data.npms} />
              <BundleSize  bundle={data.bundle} />

              <div style={{ gridColumn: '1 / -1' }}>
                <DownloadChart
                  downloads={data.downloads}
                  period={period}
                  chartLoading={chartLoading}
                  onPeriodChange={changePeriod}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <GithubStats github={data.github} />
              </div>
            </div>

            {/* Install command */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontFamily: 'monospace', userSelect: 'none' }}>$</span>
              <code style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '-0.01em' }}>
                npm install {data.npm.name}
              </code>
              <button
                onClick={() => navigator.clipboard?.writeText(`npm install ${data.npm.name}`)}
                style={{
                  marginLeft: 'auto', padding: '4px 10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px', cursor: 'pointer',
                  fontSize: '10px', fontFamily: 'monospace',
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'all 0.15s',
                }}
                onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                copy
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}