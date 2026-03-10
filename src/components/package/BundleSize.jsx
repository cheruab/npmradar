import Card from '../ui/Card'

export default function BundleSize({ bundle }) {
  if (!bundle) {
    return (
      <Card>
        <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
          Bundle Size
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>Not available for this package.</p>
      </Card>
    )
  }

  const sizeKb  = (bundle.size / 1024).toFixed(1)
  const gzipKb  = (bundle.gzip / 1024).toFixed(1)
  const warning = bundle.size > 500 * 1024
  const pct     = Math.min(100, (bundle.size / (500 * 1024)) * 100)

  return (
    <Card>
      <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
        Bundle Size
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', color: warning ? '#f87171' : '#fff', fontFamily: 'monospace' }}>
          {sizeKb}
        </span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>kB</span>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginLeft: '4px' }}>minified</span>
      </div>

      <p style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
        {gzipKb} kB <span style={{ color: 'rgba(255,255,255,0.15)' }}>gzipped</span>
      </p>

      {/* Size bar */}
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: warning
            ? 'linear-gradient(90deg, #f87171, #ef4444)'
            : 'linear-gradient(90deg, #4ade80, #22c55e)',
          borderRadius: '99px',
          transition: 'width 0.6s ease',
        }} />
      </div>
      <p style={{ marginTop: '6px', fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)' }}>
        {warning ? '⚠ exceeds 500kB threshold' : `${(100 - pct).toFixed(0)}% under 500kB limit`}
      </p>
    </Card>
  )
}