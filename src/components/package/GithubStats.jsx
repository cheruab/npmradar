import { formatDownloads, timeAgo } from '../../utils/formatters'
import Card from '../ui/Card'

const Stat = ({ label, value, accent }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
      {label}
    </p>
    <p style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.03em', color: accent ?? '#fff' }}>
      {value}
    </p>
  </div>
)

export default function GithubStats({ github }) {
  if (!github) {
    return (
      <Card>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
          GitHub
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>No repository linked.</p>
      </Card>
    )
  }

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          GitHub
        </p>
        
        <a  href={github.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '11px', fontFamily: 'monospace', color: '#60a5fa', textDecoration: 'none' }}
          onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
        >
          {github.full_name} ↗
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '16px' }}>
        <Stat label="Stars"  value={formatDownloads(github.stargazers_count)} accent="#facc15" />
        <Stat label="Issues" value={formatDownloads(github.open_issues_count)} />
        <Stat label="Forks"  value={formatDownloads(github.forks_count)} />
      </div>

      <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>
          last commit{' '}
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>{timeAgo(github.pushed_at)}</span>
          {github.language && (
            <span style={{ marginLeft: '16px' }}>
              lang{' '}
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>{github.language}</span>
            </span>
          )}
        </p>
      </div>
    </Card>
  )
}