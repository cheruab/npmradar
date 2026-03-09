import { formatDownloads, timeAgo } from '../../utils/formatters'
import Card from '../ui/Card'

const Stat = ({ label, value }) => (
  <div>
    <p className="text-[#555] text-[11px] font-mono uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-[#ededed] text-[15px] font-medium">{value}</p>
  </div>
)

export default function GithubStats({ github }) {
  if (!github) return (
    <Card>
      <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono mb-3">
        GitHub
      </p>
      <p className="text-[#555] text-[13px]">No repository linked.</p>
    </Card>
  )

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono">
          GitHub
        </p>
        
          href={github.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#0070f3] font-mono hover:underline"
        >
          {github.full_name} ↗
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Stars"  value={formatDownloads(github.stargazers_count)} />
        <Stat label="Issues" value={formatDownloads(github.open_issues_count)} />
        <Stat label="Forks"  value={formatDownloads(github.forks_count)} />
      </div>

      <p className="mt-4 text-[#555] text-[11px] font-mono">
        last commit{' '}
        <span className="text-[#888]">{timeAgo(github.pushed_at)}</span>
      </p>
    </Card>
  )
}