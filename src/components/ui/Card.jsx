export default function Card({ children, className = '', glow = false }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
        transition: 'border-color 0.2s',
        ...(glow && { boxShadow: '0 0 0 1px rgba(0,112,243,0.15), 0 8px 40px rgba(0,0,0,0.4)' }),
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
      className={className}
    >
      {children}
    </div>
  )
}