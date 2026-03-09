import { useEffect }         from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePackage }        from '../hooks/usePackage'
import SearchBar             from '../components/package/SearchBar'
import PackageHeader         from '../components/package/PackageHeader'
import DownloadChart         from '../components/package/DownloadChart'
import BundleSize            from '../components/package/BundleSize'
import GithubStats           from '../components/package/GithubStats'
import HealthScore           from '../components/package/HealthScore'
import Skeleton              from '../components/ui/Skeleton'
import ErrorMessage          from '../components/ui/ErrorMessage'

function LoadingState() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
    </div>
  )
}

export default function PackagePage() {
  const { name }             = useParams()
  const navigate             = useNavigate()
  const { data, loading, error, lookup } = usePackage()

  useEffect(() => {
    if (name) lookup(name)
  }, [name])

  return (
    <div className="min-h-screen bg-[#000] flex flex-col">

      {/* Nav */}
      <header className="h-14 border-b border-[#111] flex items-center justify-between px-6 gap-4">
        <Link to="/" className="text-[#ededed] text-[14px] font-semibold tracking-tight shrink-0">
          npm<span className="text-[#0070f3]">radar</span>
        </Link>
        <div className="w-full max-w-sm">
          <SearchBar
            onSearch={(n) => navigate(`/package/${n}`)}
            loading={loading}
          />
        </div>
        {data && (
          <Link
            to={`/compare/${name}/react`}
            className="
              shrink-0 h-8 px-3
              border border-[#222] hover:border-[#444]
              text-[#888] hover:text-[#ededed]
              text-[12px] font-mono rounded-[6px]
              transition-colors whitespace-nowrap
            "
          >
            + Compare
          </Link>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">

        {loading && <LoadingState />}
        {error   && <ErrorMessage message={error} />}

        {data && !loading && (
          <div className="flex flex-col gap-6">

            <PackageHeader npm={data.npm} />

            <div className="w-full h-px bg-[#111]" />

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <HealthScore  health={data.health} npms={data.npms} />
              <BundleSize   bundle={data.bundle} />
              <div className="md:col-span-2">
                <DownloadChart downloads={data.downloads} />
              </div>
              <div className="md:col-span-2">
                <GithubStats github={data.github} />
              </div>
            </div>

            {/* Install snippet */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-[6px]">
              <span className="text-[#555] text-[12px] font-mono">$</span>
              <code className="text-[#ededed] text-[13px] font-mono">
                npm install {data.npm.name}
              </code>
            </div>

          </div>
        )}
      </main>

    </div>
  )
}