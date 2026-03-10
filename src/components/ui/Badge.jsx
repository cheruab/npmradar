const variants = {
  green:  { bg: 'rgba(34,197,94,0.08)',   color: '#4ade80', border: 'rgba(34,197,94,0.2)'   },
  yellow: { bg: 'rgba(234,179,8,0.08)',   color: '#facc15', border: 'rgba(234,179,8,0.2)'   },
  red:    { bg: 'rgba(239,68,68,0.08)',   color: '#f87171', border: 'rgba(239,68,68,0.2)'   },
  blue:   { bg: 'rgba(0,112,243,0.1)',    color: '#60a5fa', border: 'rgba(0,112,243,0.25)'  },
  gray:   { bg: 'rgba(255,255,255,0.04)', color: '#888',    border: 'rgba(255,255,255,0.08)' },
}

export default function Badge({ label, variant = 'gray' }) {
  const v = variants[variant] ?? variants.gray
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px',
      fontSize: '11px', fontFamily: 'monospace',
      fontWeight: 500, letterSpacing: '0.02em',
      background: v.bg, color: v.color,
      border: `1px solid ${v.border}`,
      borderRadius: '6px',
    }}>
      {label}
    </span>
  )
}