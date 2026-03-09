import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/package/SearchBar'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#000] flex flex-col">

      {/* Nav */}
      <header className="h-14 border-b border-[#111] flex items-center px-6">
        <span className="text-[#ededed] text-[14px] font-semibold tracking-tight">
          npm<span className="text-[#0070f3]">radar</span>
        </span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
        <div className="w-full max-w-xl flex flex-col items-center gap-8">

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a1628] border border-[#1e3a5f] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] animate-pulse" />
              <span className="text-[#0070f3] text-[11px] font-mono tracking-wide">
                5 live data sources
              </span>
            </div>

            <h1 className="text-[32px] font-semibold text-[#ededed] tracking-tight leading-tight">
              Inspect any npm package
            </h1>
            <p className="text-[#555] text-[14px] max-w-sm leading-relaxed">
              Bundle size, download trends, health score, and GitHub stats — all in one place.
            </p>
          </div>

          <SearchBar onSearch={(name) => navigate(`/package/${name}`)} />

          <div className="flex items-center gap-6 text-[11px] text-[#444] font-mono">
            <button
              onClick={() => navigate('/package/react')}
              className="hover:text-[#888] transition-colors"
            >
              react
            </button>
            <button
              onClick={() => navigate('/package/lodash')}
              className="hover:text-[#888] transition-colors"
            >
              lodash
            </button>
            <button
              onClick={() => navigate('/package/axios')}
              className="hover:text-[#888] transition-colors"
            >
              axios
            </button>
            <button
              onClick={() => navigate('/package/next')}
              className="hover:text-[#888] transition-colors"
            >
              next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-[#111] flex items-center justify-center">
        <p className="text-[#333] text-[11px] font-mono">
          built with npm · bundlephobia · npms.io · github api
        </p>
      </footer>

    </div>
  )
}