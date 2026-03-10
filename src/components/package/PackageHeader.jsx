import { timeAgo } from '../../utils/formatters'
import Badge from '../ui/Badge'

export default function PackageHeader({ npm }) {
  const latest  = npm['dist-tags']?.latest
  const updated = npm.time?.modified
  const license = npm.versions?.[latest]?.license || npm.license || 'Unknown'

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-[22px] font-semibold text-[#ededed] tracking-tight">
          {npm.name}
        </h1>
        <Badge label={`v${latest}`} variant="blue" />
        <Badge label={license}      variant="gray" />
      </div>

      <p className="text-[#888] text-[13px] leading-relaxed max-w-2xl">
        {npm.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-[12px] text-[#555] font-mono flex-wrap">
        {npm.author?.name && (
          <span>by <span className="text-[#888]">{npm.author.name}</span></span>
        )}
        {updated && (
          <span>updated <span className="text-[#888]">{timeAgo(updated)}</span></span>
        )}
        {npm.homepage && (
          <a
            href={npm.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0070f3] hover:underline"
          >
            homepage ↗
          </a>
        )}
      </div>
    </div>
  )
}
