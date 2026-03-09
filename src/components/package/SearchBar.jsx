import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim().toLowerCase()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-[13px] font-mono select-none">
            $
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="search package name..."
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            className="
              w-full h-10 pl-7 pr-4
              bg-[#0a0a0a] border border-[#222]
              text-[#ededed] text-[13px] font-mono
              rounded-[6px] outline-none
              placeholder:text-[#444]
              focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3]
              transition-colors duration-150
            "
          />
        </div>
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="
            h-10 px-5
            bg-[#0070f3] hover:bg-[#0060d3]
            disabled:bg-[#111] disabled:text-[#444] disabled:cursor-not-allowed
            text-white text-[13px] font-medium
            rounded-[6px]
            transition-colors duration-150
            whitespace-nowrap
          "
        >
          {loading ? 'Searching...' : 'Inspect'}
        </button>
      </div>
    </form>
  )
}