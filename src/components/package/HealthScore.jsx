import Card from '../ui/Card'
import { scoreToPercent } from '../../utils/formatters'

const colorMap = {
  green:  { ring: '#22c55e', text: 'text-[#22c55e]', label: 'Healthy' },
  yellow: { ring: '#eab308', text: 'text-[#eab308]', label: 'Aging'   },
  red:    { ring: '#ef4444', text: 'text-[#ef4444]', label: 'Risky'   },
}

const ScoreRing = ({ score, color }) => {
  const r        = 28
  const circ     = 2 * Math.PI * r
  const progress = circ - (score / 100) * circ

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="4"
      />
      <circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke={colorMap[color].ring}
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={progress}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text
        x="36" y="41"
        textAnchor="middle"
        fill="#ededed"
        fontSize="14"
        fontWeight="600"
        fontFamily="inherit"
      >
        {score}
      </text>
    </svg>
  )
}

export default function HealthScore({ health, npms }) {
  const { score, flags, color } = health
  const detail = npms?.score?.detail

  return (
    <Card>
      <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono mb-4">
        Health Score
      </p>

      <div className="flex items-center gap-5 mb-4">
        <ScoreRing score={score} color={color} />
        <div>
          <p className={`text-[18px] font-semibold ${colorMap[color].text}`}>
            {colorMap[color].label}
          </p>
          <p className="text-[#555] text-[12px] font-mono mt-0.5">{score} / 100</p>
        </div>
      </div>

      {detail && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Quality',     val: detail.quality },
            { label: 'Popularity',  val: detail.popularity },
            { label: 'Maintenance', val: detail.maintenance },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-[#555] text-[10px] font-mono uppercase tracking-wide">
                  {label}
                </span>
                <span className="text-[#888] text-[10px] font-mono">
                  {scoreToPercent(val)}
                </span>
              </div>
              <div className="h-[3px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0070f3] rounded-full transition-all duration-500"
                  style={{ width: `${scoreToPercent(val)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {flags.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {flags.map((flag) => (
            <p key={flag} className="text-[#ef4444] text-[11px] font-mono">
              ⚠ {flag}
            </p>
          ))}
        </div>
      )}
    </Card>
  )
}
