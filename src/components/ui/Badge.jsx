const variants = {
  green:  'bg-[#0a2a1a] text-[#22c55e] border-[#14532d]',
  yellow: 'bg-[#2a1f0a] text-[#eab308] border-[#713f12]',
  red:    'bg-[#2a0a0a] text-[#ef4444] border-[#7f1d1d]',
  blue:   'bg-[#0a1628] text-[#0070f3] border-[#1e3a5f]',
  gray:   'bg-[#111] text-[#888] border-[#222]',
}

export default function Badge({ label, variant = 'gray', className = '' }) {
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5
      text-[11px] font-medium tracking-wide
      border rounded-[4px] font-mono
      ${variants[variant]} ${className}
    `}>
      {label}
    </span>
  )
}