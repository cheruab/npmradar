import { useEffect }              from 'react'
import { useParams, Link }        from 'react-router-dom'
import { usePackage }             from '../hooks/usePackage'
import PackageHeader              from '../components/package/PackageHeader'
import DownloadChart              from '../components/package/DownloadChart'
import BundleSize                 from '../components/package/BundleSize'
import GithubStats                from '../components/package/GithubStats'
import HealthScore                from '../components/package/HealthScore'
import Skeleton                   from '../components/ui/Skeleton'
import ErrorMessage               from '../components/ui/ErrorMessage'

function Column({ name }) {
  const { data, loading, error, lookup } = usePackage()

  useEffect(() => {
    if (name) lookup(name)
  }, [name])

  if (loading) return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-52" />
    </div>
  )

  if (error) return <ErrorMessage message={error} />

  if (!data) return null

  return (
    <div className="flex flex-col gap-3">
      <PackageHeader npm={data.npm} />
      <div className="w-full h-px bg-[#111]" />
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
    <div className="min-h-screen bg-[#000] flex flex-col">

      {/* Nav */}
      <header className="h-14 border-b border-[#111] flex items-center px-6 gap-3">
        <Link to="/" className="text-[#ededed] text-[14px] font-semibold tracking-tight">
          npm<span className="text-[#0070f3]">radar</span>
        </Link>
        <span className="text-[#333] text-[13px] font-mono">/</span>
        <span className="text-[#888] text-[13px] font-mono">
          {name1} <span className="text-[#333]">vs</span> {name2}
        </span>
      </header>

      {/* Two-column compare layout */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-[#111]">
          <Column name={name1} />
          <div className="md:pl-6">
            <Column name={name2} />
          </div>
        </div>
      </main>

    </div>
  )
}