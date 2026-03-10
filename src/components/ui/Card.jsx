export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#0a0a0a] border border-[#222] rounded-[6px] p-5 ${className}`}>
      {children}
    </div>
  )
}
