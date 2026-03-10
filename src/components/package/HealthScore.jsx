import Card from '../ui/Card'
import { scoreToPercent } from '../../utils/formatters'

const colorMap = {
  green:  { stroke: '#4ade80', text: '#4ade80', glow: 'rgba(74,222,128,0.15)'  },
  yellow: { stroke: '#facc15', text: '#facc15', glow: 'rgba(250,204,21,0.15)'  },
  red:    { stroke: '#f87171', text: '#f87171', glow: 'rgba(248,113,113,0.15)' },
}

const ScoreRing = ({ score, color }) => {
  const r    = 30
  const circ = 2 * Math.PI * r
  const dash = circ - (score / 100) * circ
  const c    = colorMap[color]

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <circle
        cx="40" cy="40" r={r}
        fill="none"
        stroke={c.stroke}
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
        style={{
          transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)',
          filter: `drop-shadow(0 0 6px ${c.glow})`,
        }}
      />
      <text x="40" y="45" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700" fontFamily="inherit">
        {score}
      </text>
    </svg>
  )
}

const Bar = ({ label, val }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>
        {scoreToPercent(val)}
      </span>
    </div>
    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${scoreToPercent(val)}%`,
        background: 'linear-gradient(90deg, #0070f3, #60a5fa)',
        borderRadius: '99px',
        transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  </div>
)

export default function HealthScore({ health, npms }) {
  const { score, flags, color, label } = health
  const detail = npms?.score?.detail
  const c = colorMap[color]

  return (
    <Card>
      <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
        Health Score
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <ScoreRing score={score} color={color} />
        <div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: c.text, letterSpacing: '-0.02em' }}>{label}</p>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>
            {score} / 100
          </p>
        </div>
      </div>

      {detail && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: flags.length ? '16px' : 0 }}>
          <Bar label="Quality"     val={detail.quality} />
          <Bar label="Popularity"  val={detail.popularity} />
          <Bar label="Maintenance" val={detail.maintenance} />
        </div>
      )}

      {flags.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {flags.map((flag) => (
            <p key={flag} style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(248,113,113,0.8)' }}>
              ⚠ {flag}
            </p>
          ))}
        </div>
      )}
    </Card>
  )
}