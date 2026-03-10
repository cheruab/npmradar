import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePackage }   from '../hooks/usePackage'
import PackageHeader    from '../components/package/PackageHeader'
import DownloadChart    from '../components/package/DownloadChart'
import BundleSize       from '../components/package/BundleSize'
import GithubStats      from '../components/package/GithubStats'
import HealthScore      from '../components/package/HealthScore'
import Skeleton         from '../components/ui/Skeleton'
import ErrorMessage     from '../components/ui/ErrorMessage'

function Column({ name }) {
  const { data, loading, error, lookup } = usePackage()

  useEffect(() => {
    if (name) lookup(name)
  }, [name])

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-52" />
      </div>
    )
  }

  if (error) return <ErrorMessage message={error} />
  if (!data)  return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <PackageHeader npm={data.npm} />
      <div style={{ width: '100%', height: '1px', background: '#111' }} />
      <HealthScore   health={data.health} npms={data.npms} />
      <BundleSize    bundle={data.bundle} />
      <DownloadChart downloads={data.downloads} />
      <GithubStats   github={data.github} />
    </div>
  )
}

export default function ComparePage() {
  const { name1, name2 } = useParams()

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>

      <header style={{
        height: '56px',
        borderBottom: '1px solid #111',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '12px',
      }}>
        <Link to="/" style={{ color: '#ededed', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
          npm<span style={{ color: '#0070f3' }}>radar</span>
        </Link>
        <span style={{ color: '#333', fontFamily: 'monospace' }}>/</span>
        <span style={{ color: '#888', fontSize: '13px', fontFamily: 'monospace' }}>
          {name1} <span style={{ color: '#333' }}>vs</span> {name2}
        </span>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <Column name={name1} />
          <div style={{ borderLeft: '1px solid #111', paddingLeft: '40px' }}>
            <Column name={name2} />
          </div>
        </div>
      </main>

    </div>
  )
}
