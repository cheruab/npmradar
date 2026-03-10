export default function Skeleton({ className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%)',
        backgroundSize: '200% 100%',
        borderRadius: '8px',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  )
}