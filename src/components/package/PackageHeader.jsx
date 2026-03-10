import { timeAgo } from '../../utils/formatters'
import Badge from '../ui/Badge'

export default function PackageHeader({ npm }) {
  const latest  = npm['dist-tags']?.latest ?? npm.version
  const updated = npm.time?.modified ?? npm.gitHead
  const license = npm.license || 'Unknown'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <h1 style={{
          fontSize: '22px', fontWeight: 700,
          letterSpacing: '-0.03em', color: '#fff',
        }}>
          {npm.name}
        </h1>
        {latest  && <Badge label={`v${latest}`}  variant="blue" />}
        {license && <Badge label={license}        variant="gray" />}
      </div>

      <p style={{
        fontSize: '14px', color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.65, maxWidth: '640px',
      }}>
        {npm.description || 'No description provided.'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {npm.author?.name && (
          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
            by <span style={{ color: 'rgba(255,255,255,0.5)' }}>{npm.author.name}</span>
          </span>
        )}
        {updated && (
          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
            updated <span style={{ color: 'rgba(255,255,255,0.5)' }}>{timeAgo(updated)}</span>
          </span>
        )}
        {npm.homepage && (
          
           <a href={npm.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', fontFamily: 'monospace', color: '#60a5fa', textDecoration: 'none' }}
            onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
          >
            homepage ↗
          </a>
        )}
      </div>
    </div>
  )
}