export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-[#1a0a0a] border border-[#3f1111] rounded-[6px]">
      <span className="text-[#ef4444] text-[13px] mt-px">✕</span>
      <p className="text-[#ef4444] text-[13px]">{message}</p>
    </div>
  )
}