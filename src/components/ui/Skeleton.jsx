export default function Skeleton({ className = '' }) {
  return (
    <div className={`
      bg-[#111] rounded-[4px] animate-pulse
      ${className}
    `} />
  )
}