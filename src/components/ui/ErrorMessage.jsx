export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      padding: '14px 16px',
      background: 'rgba(239,68,68,0.06)',
      border: '1px solid rgba(239,68,68,0.2)',
      borderRadius: '10px',
    }}>
      <span style={{ color: '#f87171', fontSize: '13px', marginTop: '1px', flexShrink: 0 }}>✕</span>
      <p style={{ color: '#f87171', fontSize: '13px', lineHeight: 1.5 }}>{message}</p>
    </div>
  )
}