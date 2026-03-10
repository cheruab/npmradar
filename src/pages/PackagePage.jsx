import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePackage }     from '../hooks/usePackage'
import SearchBar          from '../components/package/SearchBar'
import PackageHeader      from '../components/package/PackageHeader'
import DownloadChart      from '../components/package/DownloadChart'
import BundleSize         from '../components/package/BundleSize'
import GithubStats        from '../components/package/GithubStats'
import HealthScore        from '../components/package/HealthScore'
import Skeleton           from '../components/ui/Skeleton'
import ErrorMessage       from '../components/ui/ErrorMessage'

const col = {
  bg:      '#000',
  surface: '#0a0a0a',
  border:  '#1a1a1a',
  txt:     '#ededed',
  muted:   '#888',
  dim:     '#555',
  accent:  '#0070f3',
}

function LoadingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-80" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
    </div>
  )
}

export default function PackagePage() {
  const { name }    = useParams()
  const navigate    = useNavigate()
  const { data, loading, error, lookup } = usePackage()

  useEffect(() => {
    if (name) lookup(name)
  }, [name])

  return (
    <div style={{ minHeight: '100vh', background: col.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <header style={{
        height: '56px',
        borderBottom: `1px solid #111`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: '16px',
      }}>
        <Link to="/" style={{ color: col.txt, fontSize: '14px', fontWeight: 600, textDecoration: 'none', flexShrink: 0, letterSpacing: '-0.01em' }}>
          npm<span style={{ color: col.accent }}>radar</span>
        </Link>

        <div style={{ width: '100%', maxWidth: '320px' }}>
          <SearchBar onSearch={(n) => navigate(`/package/${n}`)} loading={loading} />
        </div>

        {data && (
          <Link
            to={`/compare/${name}/react`}
            style={{
              flexShrink: 0,
              height: '32px',
              padding: '0 12px',
              border: '1px solid #222',
              color: col.muted,
              fontSize: '12px',
              fontFamily: 'monospace',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            + Compare
          </Link>
        )}
      </header>

      {/* Content */}
      <main style={{ flex: 1, width: '100%', maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>

        {loading && <LoadingState />}
        {error   && <ErrorMessage message={error} />}

        {data && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <PackageHeader npm={data.npm} />

            <div style={{ width: '100%', height: '1px', background: '#111' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <HealthScore  health={data.health} npms={data.npms} />
              <BundleSize   bundle={data.bundle} />
              <div style={{ gridColumn: '1 / -1' }}>
                <DownloadChart downloads={data.downloads} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <GithubStats github={data.github} />
              </div>
            </div>

            {/* Install snippet */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: col.surface,
              border: '1px solid #1a1a1a',
              borderRadius: '6px',
            }}>
              <span style={{ color: col.dim, fontSize: '12px', fontFamily: 'monospace' }}>$</span>
              <code style={{ color: col.txt, fontSize: '13px', fontFamily: 'monospace' }}>
                npm install {data.npm.name}
              </code>
            </div>

          </div>
        )}
      </main>

    </div>
  )
}
